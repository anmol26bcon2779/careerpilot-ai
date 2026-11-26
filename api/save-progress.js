import { dispatchZapierEvent } from './webhook.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).send('OK');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, payload, customWebhookUrl } = req.body || {};

  if (!action || !payload) {
    return res.status(400).json({ error: 'Missing action or payload' });
  }

  try {
    // EVENT 4: Milestone Completed
    if (action === 'milestone_completed') {
      const { milestoneId, milestoneTitle, targetCareer, completedAt, studentEmail, studentName, totalMilestones, completedCount } = payload;
      
      const actualProgressPercentage = totalMilestones > 0 
        ? Math.round((completedCount / totalMilestones) * 100) 
        : 0;

      const webhookResult = await dispatchZapierEvent('Milestone Completed', {
        email: studentEmail || 'student@example.com',
        studentName: studentName || 'Student',
        targetCareer: targetCareer || 'AI Engineer',
        milestoneId,
        milestoneTitle,
        completionDate: completedAt || new Date().toISOString(),
        progressPercentage: actualProgressPercentage,
        completedCount,
        totalMilestones
      }, { customWebhookUrl });

      return res.status(200).json({
        success: true,
        message: `Milestone "${milestoneTitle}" logged successfully`,
        progressPercentage: actualProgressPercentage,
        webhook: webhookResult
      });
    }

    // EVENT 5: Internship Saved
    if (action === 'internship_saved') {
      const { internshipId, jobTitle, company, location, employmentType, studentEmail, studentName } = payload;

      const webhookResult = await dispatchZapierEvent('Internship Saved', {
        email: studentEmail || 'student@example.com',
        studentName: studentName || 'Student',
        internshipId,
        jobTitle,
        company,
        location,
        employmentType,
        savedDate: new Date().toISOString()
      }, { customWebhookUrl });

      return res.status(200).json({
        success: true,
        message: `Internship at ${company} saved successfully`,
        webhook: webhookResult
      });
    }

    // Save Selected Career
    if (action === 'career_selected') {
      const { targetCareer, studentEmail, studentName } = payload;

      const webhookResult = await dispatchZapierEvent('Career Selected', {
        email: studentEmail || 'student@example.com',
        studentName: studentName || 'Student',
        selectedCareer: targetCareer,
        selectedDate: new Date().toISOString()
      }, { customWebhookUrl });

      return res.status(200).json({
        success: true,
        message: `Target career set to ${targetCareer}`,
        webhook: webhookResult
      });
    }

    return res.status(400).json({ error: `Unrecognized action: ${action}` });
  } catch (error) {
    console.error('Save progress error:', error);
    return res.status(500).json({
      error: 'Failed to record progress',
      details: error.message
    });
  }
}
