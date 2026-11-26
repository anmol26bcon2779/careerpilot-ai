import crypto from 'crypto';
import { dispatchZapierEvent } from './webhook.js';

// In-memory demo store for registered demo users in the current server instance
const demoUsers = new Map();

// Helper to hash password with salt (Never plaintext)
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

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

  const { action, email, password, fullName, consentToStore, customWebhookUrl } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Handle Login
  if (action === 'login') {
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const existingUser = demoUsers.get(normalizedEmail);
    if (!existingUser) {
      // In demo mode, if user doesn't exist, allow seamless prototype access with clear label
      const demoSalt = 'cp_salt_demo';
      const demoHashed = hashPassword(password, demoSalt);
      const newUser = {
        id: `usr_${Date.now()}`,
        email: normalizedEmail,
        fullName: fullName || normalizedEmail.split('@')[0],
        hashedPassword: demoHashed,
        salt: demoSalt,
        createdAt: new Date().toISOString(),
        isDemoAccount: true,
        consentToStore: Boolean(consentToStore)
      };
      demoUsers.set(normalizedEmail, newUser);

      return res.status(200).json({
        success: true,
        message: 'Signed in with demo prototype account',
        token: `demo_jwt_${Buffer.from(normalizedEmail).toString('base64')}_${Date.now()}`,
        user: {
          id: newUser.id,
          email: newUser.email,
          fullName: newUser.fullName,
          createdAt: newUser.createdAt,
          isDemoAccount: true,
          consentToStore: newUser.consentToStore
        }
      });
    }

    const computedHash = hashPassword(password, existingUser.salt);
    if (computedHash !== existingUser.hashedPassword) {
      return res.status(401).json({ error: 'Invalid password. Please check your credentials.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Signed in successfully',
      token: `demo_jwt_${Buffer.from(normalizedEmail).toString('base64')}_${Date.now()}`,
      user: {
        id: existingUser.id,
        email: existingUser.email,
        fullName: existingUser.fullName,
        createdAt: existingUser.createdAt,
        isDemoAccount: true,
        consentToStore: existingUser.consentToStore
      }
    });
  }

  // Handle Registration
  if (action === 'register') {
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = hashPassword(password, salt);

    const newUser = {
      id: `usr_${Date.now()}`,
      email: normalizedEmail,
      fullName: fullName || normalizedEmail.split('@')[0],
      hashedPassword,
      salt,
      createdAt: new Date().toISOString(),
      isDemoAccount: true,
      consentToStore: Boolean(consentToStore)
    };

    demoUsers.set(normalizedEmail, newUser);

    // EVENT 1: Student Registration
    // Only send permitted profile info (no passwords, no hashes)
    let webhookResult = null;
    if (consentToStore !== false) {
      webhookResult = await dispatchZapierEvent('Student Registration', {
        userId: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        registrationDate: newUser.createdAt,
        accountType: 'Demo Prototype (Educational)'
      }, { customWebhookUrl });
    }

    return res.status(201).json({
      success: true,
      message: 'Registered successfully. Note: Demo authentication mode active for prototype.',
      token: `demo_jwt_${Buffer.from(normalizedEmail).toString('base64')}_${Date.now()}`,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        createdAt: newUser.createdAt,
        isDemoAccount: true,
        consentToStore: newUser.consentToStore
      },
      webhook: webhookResult
    });
  }

  return res.status(400).json({ error: 'Invalid action. Supported: login, register' });
}
