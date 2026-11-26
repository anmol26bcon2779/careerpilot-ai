// Serverless Helper Utilities for CareerPilot AI
// Handles Zapier Webhook dispatch, duplicate prevention, retry handling, and event logging.

// In-memory ring buffer for recent integration logs (shared across warm serverless invocations)
const eventLogs = [];
const processedEventIds = new Set();
const MAX_LOGS = 50;

/**
 * Clean string / hash generator for idempotency
 */
function generateEventId(eventType, payload) {
  const content = `${eventType}-${payload.userId || payload.email || 'anon'}-${JSON.stringify(payload)}`;
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return `${eventType}_${Math.abs(hash)}_${Math.floor(Date.now() / 10000)}`; // 10s deduplication window
}

/**
 * Log an integration event
 */
export function logIntegrationEvent(event) {
  eventLogs.unshift({
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    ...event
  });
  if (eventLogs.length > MAX_LOGS) {
    eventLogs.pop();
  }
}

/**
 * Get recent integration logs
 */
export function getIntegrationLogs() {
  return [...eventLogs];
}

/**
 * Dispatches an event to Zapier Webhook with retries, deduplication, and error handling.
 * Maps to Google Sheets tabs:
 * - EVENT 1: Student Registration -> Students tab
 * - EVENT 2: Career Assessment -> Career Assessments & Career Recommendations tabs
 * - EVENT 3: Roadmap Generated -> Roadmaps tab
 * - EVENT 4: Milestone Completed -> Milestone Progress tab
 * - EVENT 5: Internship Saved -> Saved Internships tab
 */
export async function dispatchZapierEvent(eventType, payload, userConsent = true) {
  const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;
  const webhookSecret = process.env.ZAPIER_WEBHOOK_SECRET;

  // Verify user consent
  if (!userConsent) {
    const logEntry = {
      eventType,
      status: 'SKIPPED',
      details: 'User has opted out of external Google Sheets syncing via Zapier.',
      payloadSummary: { eventType, user: payload.email || payload.userId || 'Student' }
    };
    logIntegrationEvent(logEntry);
    return { success: false, skipped: true, message: 'User consent required for external sync.' };
  }

  // Deduplication check
  const eventId = generateEventId(eventType, payload);
  if (processedEventIds.has(eventId)) {
    return { success: true, deduplicated: true, message: 'Duplicate event ignored within rate window.' };
  }
  processedEventIds.add(eventId);
  // Cleanup set periodically
  if (processedEventIds.size > 200) {
    processedEventIds.clear();
  }

  const enrichedPayload = {
    eventId,
    eventType,
    timestamp: new Date().toISOString(),
    app: 'CareerPilot AI',
    data: payload
  };

  // If no Zapier Webhook URL is configured yet, record a simulated success with guidance
  if (!webhookUrl) {
    const logEntry = {
      eventType,
      status: 'MOCK_DELIVERED',
      details: 'ZAPIER_WEBHOOK_URL not set in environment. Mock payload recorded locally.',
      payloadSummary: enrichedPayload
    };
    logIntegrationEvent(logEntry);
    return {
      success: true,
      simulated: true,
      message: 'Event logged in mock mode. Add ZAPIER_WEBHOOK_URL in .env to stream to live Google Sheets.',
      event: enrichedPayload
    };
  }

  // Retry logic (up to 3 attempts with exponential backoff)
  let attempts = 0;
  const maxAttempts = 3;
  let lastError = null;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'CareerPilot-AI-Vercel/1.0'
      };

      if (webhookSecret) {
        headers['X-CareerPilot-Secret'] = webhookSecret;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(enrichedPayload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const responseText = await response.text();
        const logEntry = {
          eventType,
          status: 'SUCCESS',
          attempts,
          httpStatus: response.status,
          details: 'Event delivered to Zapier Webhook successfully.',
          payloadSummary: enrichedPayload
        };
        logIntegrationEvent(logEntry);
        return { success: true, attempts, response: responseText };
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      lastError = err;
      if (attempts < maxAttempts) {
        // Wait exponential backoff: 300ms, 600ms
        await new Promise((resolve) => setTimeout(resolve, attempts * 300));
      }
    }
  }

  // If failed after retries
  const failEntry = {
    eventType,
    status: 'FAILED',
    attempts,
    details: `Failed after ${attempts} attempts: ${lastError.message}`,
    payloadSummary: enrichedPayload
  };
  logIntegrationEvent(failEntry);

  return {
    success: false,
    error: lastError.message,
    attempts,
    message: 'Failed to deliver event to Zapier after retries.'
  };
}
