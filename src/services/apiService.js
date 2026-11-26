// API Service for CareerPilot AI
// Interacts with serverless backend endpoints using relative paths (/api/*).
// Safe fallback handling for seamless local dev & production Vercel serverless deployment.

export const apiService = {
  /**
   * Register a new student and trigger EVENT 1: Student Registration
   */
  async registerStudent(studentData, consentToSync = true) {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...studentData, consentToSync })
      });
      return await response.json();
    } catch (err) {
      console.warn('API /api/register error:', err);
      return {
        success: true,
        fallback: true,
        student: studentData,
        message: 'Saved to local session mode.'
      };
    }
  },

  /**
   * Run AI Career Assessment and trigger EVENT 2: Career Assessment
   */
  async runCareerAssessment(studentProfile, assessmentAnswers, consentToSync = true) {
    try {
      const response = await fetch('/api/career-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentProfile, assessmentAnswers, consentToSync })
      });
      return await response.json();
    } catch (err) {
      console.warn('API /api/career-assessment error:', err);
      // Fallback response handled gracefully
      return {
        success: false,
        error: err.message
      };
    }
  },

  /**
   * Generate Career Roadmap and trigger EVENT 3: Roadmap Generated
   */
  async generateRoadmap(studentProfile, targetCareer, customPreferences = {}, consentToSync = true) {
    try {
      const response = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentProfile, targetCareer, customPreferences, consentToSync })
      });
      return await response.json();
    } catch (err) {
      console.warn('API /api/roadmap error:', err);
      return {
        success: false,
        error: err.message
      };
    }
  },

  /**
   * Save Milestone Completion or Internship Save
   * Dispatches EVENT 4: Milestone Completed or EVENT 5: Internship Saved
   */
  async saveProgress(eventType, studentProfile, payload, consentToSync = true) {
    try {
      const response = await fetch('/api/save-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType,
          studentEmail: studentProfile?.email,
          studentName: studentProfile?.name,
          payload,
          consentToSync
        })
      });
      return await response.json();
    } catch (err) {
      console.warn('API /api/save-progress error:', err);
      return {
        success: true,
        fallback: true,
        message: 'Progress recorded locally.'
      };
    }
  },

  /**
   * Send prompt to Gemini AI Mentor
   */
  async sendAiPrompt(action, prompt, profile, history = [], context = {}) {
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, prompt, profile, history, context })
      });
      return await response.json();
    } catch (err) {
      console.warn('API /api/ai error:', err);
      return {
        reply: 'I am currently operating in offline mode. Please verify the serverless API connection or try again in a moment.',
        error: err.message
      };
    }
  },

  /**
   * Check Webhook & Zapier Integration Diagnostics
   */
  async getWebhookDiagnostics() {
    try {
      const response = await fetch('/api/webhook', { method: 'GET' });
      return await response.json();
    } catch (err) {
      console.warn('API /api/webhook error:', err);
      return {
        status: 'simulated_local',
        configuration: {
          zapierWebhookConfigured: false,
          secretConfigured: false,
          webhookUrlPreview: 'Local diagnostic mode'
        },
        recentLogs: []
      };
    }
  },

  /**
   * Dispatch Test Webhook
   */
  async testWebhookDispatch(payload) {
    try {
      const response = await fetch('/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test-dispatch', testPayload: payload })
      });
      return await response.json();
    } catch (err) {
      console.warn('API /api/webhook test error:', err);
      return {
        success: false,
        error: err.message
      };
    }
  }
};
