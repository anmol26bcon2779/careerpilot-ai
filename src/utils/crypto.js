// Secure Client-Side Hashing & Session Utilities
// Implements SHA-256 password hashing via Web Crypto API.
// IMPORTANT: Ensures zero plaintext passwords are ever stored in localStorage or transmitted to Google Sheets.
// Clearly flagged as lightweight client-side demo authentication mode for prototypes.

/**
 * Computes SHA-256 hash of a string with a fixed salt
 */
export async function hashPassword(password, salt = 'careerpilot-salt-v1') {
  if (!password) return '';
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (err) {
    // Fallback simple hash for older environments without crypto.subtle
    let hash = 0;
    const str = password + salt;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return `fallback_${Math.abs(hash)}`;
  }
}

/**
 * Validate password requirements
 * Minimum 8 characters, at least 1 number or special symbol
 */
export function validatePassword(password) {
  if (!password || password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long.' };
  }
  const hasDigitOrSpecial = /[\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  if (!hasDigitOrSpecial) {
    return { valid: false, message: 'Password must include at least one number or symbol.' };
  }
  return { valid: true, message: 'Password meets security requirements.' };
}

/**
 * Demo default student credentials for quick testing
 */
export const DEMO_USER = {
  id: 'stu_demo_001',
  name: 'Alex Chen',
  email: 'alex.chen@university.edu',
  role: 'student',
  education: 'Bachelor of Technology (B.Tech)',
  course: 'Computer Science & Engineering',
  year: '3rd Year',
  interests: ['Machine Learning', 'Cloud Architecture', 'Distributed Systems', 'Web Development'],
  skills: ['Python', 'JavaScript', 'React', 'Git', 'SQL', 'Docker Basics'],
  preferredDomain: 'AI & Machine Learning',
  selectedCareer: 'AI & Machine Learning Engineer',
  goals: 'Secure high-impact Summer AI Internship at top tier tech lab',
  weeklyHours: 15,
  consentToSync: true,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  isDemoAccount: true,
  createdAt: '2026-11-01T10:00:00.000Z'
};
