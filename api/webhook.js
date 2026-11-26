// Serverless Function: /api/webhook
// Manages Zapier Webhook status, diagnostic pinging, and integration event logs

import { getIntegrationLogs, dispatchZapierEvent } from './utils.js';

export { dispatchZapierEvent };

export default async function handler(req, res) {
  // CORS headers for integration flexibility
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-CareerPilot-Secret');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Health check & retrieve integration event stream
  if (req.method === 'GET') {
    const isWebhookConfigured = Boolean(process.env.ZAPIER_WEBHOOK_URL && process.env.ZAPIER_WEBHOOK_URL.trim().length > 0);
    const isSecretConfigured = Boolean(process.env.ZAPIER_WEBHOOK_SECRET && process.env.ZAPIER_WEBHOOK_SECRET.trim().length > 0);
    const logs = getIntegrationLogs();

    return res.status(200).json({
      status: 'active',
      timestamp: new Date().toISOString(),
      configuration: {
        zapierWebhookConfigured: isWebhookConfigured,
        secretConfigured: isSecretConfigured,
        webhookUrlPreview: isWebhookConfigured
          ? `${process.env.ZAPIER_WEBHOOK_URL.substring(0, 28)}...`
          : 'Not configured (using local test mode)',
        supportedSheetsTabs: [
          'Students',
          'Career Assessments',
          'Career Recommendations',
          'Roadmaps',
          'Milestone Progress',
          'Saved Internships',
          'Resume Records',
          'Integration Logs'
        ],
        eventsSupported: [
          'STUDENT_REGISTRATION',
          'CAREER_ASSESSMENT',
          'ROADMAP_GENERATED',
          'MILESTONE_COMPLETED',
          'INTERNSHIP_SAVED',
          'RESUME_SAVED',
          'TEST_PING'
        ]
      },
      recentLogs: logs
    });
  }

  // POST: Send test payload or handle webhook verification
  if (req.method === 'POST') {
    const { action, testPayload, secret } = req.body || {};
    const configuredSecret = process.env.ZAPIER_WEBHOOK_SECRET;

    // Optional secret verification if secret is set
    if (configuredSecret && secret && secret !== configuredSecret) {
      return res.status(401).json({ error: 'Unauthorized: Invalid integration secret.' });
    }

    if (action === 'test-dispatch') {
      const payload = testPayload || {
        testId: `test_${Date.now()}`,
        message: 'CareerPilot AI Integration Diagnostics Ping',
        sentAt: new Date().toISOString()
      };

      const result = await dispatchZapierEvent('TEST_PING', payload, true);
      return res.status(200).json({
        success: true,
        message: 'Test event dispatched successfully.',
        details: result
      });
    }

    return res.status(200).json({
      received: true,
      timestamp: new Date().toISOString(),
      message: 'CareerPilot AI webhook listener active.'
    });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
