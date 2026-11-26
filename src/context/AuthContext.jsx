// Authentication Context for CareerPilot AI
// Lightweight prototype authentication with client-side SHA-256 password hashing.
// NO plaintext passwords are ever stored in browser storage or sent to Google Sheets.
// Features a clearly labelled demo mode and demo student credentials.

import React, { createContext, useContext, useState, useEffect } from 'react';
import { hashPassword, validatePassword, DEMO_USER } from '../utils/crypto';
import { apiService } from '../services/apiService';

const AuthContext = createContext(null);

const STORAGE_SESSION_KEY = 'careerpilot_session_v1';
const STORAGE_ACCOUNTS_KEY = 'careerpilot_accounts_v1';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'register'
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [authNotice, setAuthNotice] = useState('Prototype Demo Auth: Passwords hashed via SHA-256 client-side. Zero external DB.');

  // Initialize session on mount
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(STORAGE_SESSION_KEY);
      if (savedSession) {
        setUser(JSON.parse(savedSession));
      } else {
        // Pre-fill demo student user for instant exploration
        setUser(DEMO_USER);
        localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(DEMO_USER));
      }
    } catch (e) {
      console.warn('Session retrieval error, using demo user:', e);
      setUser(DEMO_USER);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Log in existing user
   */
  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if it's the default demo user
    if (cleanEmail === DEMO_USER.email.toLowerCase()) {
      setUser(DEMO_USER);
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(DEMO_USER));
      return DEMO_USER;
    }

    // Look up in stored accounts
    const accounts = JSON.parse(localStorage.getItem(STORAGE_ACCOUNTS_KEY) || '[]');
    const account = accounts.find(a => a.email.toLowerCase() === cleanEmail);

    if (!account) {
      throw new Error('No account found with this email. Try the demo student or register a new account.');
    }

    const inputHash = await hashPassword(password);
    if (inputHash !== account.passwordHash) {
      throw new Error('Incorrect password. Please verify your credentials.');
    }

    const sessionUser = { ...account.profile, isDemoAccount: false };
    setUser(sessionUser);
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  };

  /**
   * Register a new user
   */
  const register = async (studentData, password) => {
    const { name, email } = studentData;

    if (!name || !email) {
      throw new Error('Name and email are required.');
    }

    const validation = validatePassword(password);
    if (!validation.valid) {
      throw new Error(validation.message);
    }

    const cleanEmail = email.trim().toLowerCase();
    const accounts = JSON.parse(localStorage.getItem(STORAGE_ACCOUNTS_KEY) || '[]');

    if (accounts.some(a => a.email.toLowerCase() === cleanEmail)) {
      throw new Error('An account with this email already exists. Please log in.');
    }

    // Hash password client-side
    const passwordHash = await hashPassword(password);

    // Call serverless API to dispatch EVENT 1: Student Registration to Zapier -> Google Sheets
    const registrationResult = await apiService.registerStudent(studentData, studentData.consentToSync ?? true);

    const newProfile = {
      id: registrationResult.student?.userId || `stu_${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      role: 'student',
      education: studentData.education || 'Undergraduate',
      course: studentData.course || 'Computer Science',
      year: studentData.year || '3rd Year',
      interests: studentData.interests || ['Artificial Intelligence', 'Software Systems'],
      skills: studentData.skills || ['Python', 'Git'],
      preferredDomain: studentData.preferredDomain || 'AI & Machine Learning',
      selectedCareer: studentData.preferredDomain || 'AI & Machine Learning Engineer',
      goals: studentData.goals || 'Secure summer internship',
      weeklyHours: studentData.weeklyHours || 15,
      consentToSync: studentData.consentToSync ?? true,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanEmail}`,
      isDemoAccount: false,
      createdAt: new Date().toISOString()
    };

    // Save account (with hash only, NEVER plaintext password)
    accounts.push({
      email: cleanEmail,
      passwordHash,
      profile: newProfile
    });
    localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(accounts));

    // Set active session
    setUser(newProfile);
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(newProfile));

    return newProfile;
  };

  /**
   * Log out active user
   */
  const logout = () => {
    localStorage.removeItem(STORAGE_SESSION_KEY);
    setUser(null);
  };

  /**
   * Load Demo Student Profile
   */
  const loadDemoUser = () => {
    setUser(DEMO_USER);
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(DEMO_USER));
  };

  /**
   * Update current user profile
   */
  const updateProfile = (updates) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(updatedUser));

    // Update in accounts store if not demo
    if (!user.isDemoAccount) {
      try {
        const accounts = JSON.parse(localStorage.getItem(STORAGE_ACCOUNTS_KEY) || '[]');
        const idx = accounts.findIndex(a => a.email.toLowerCase() === user.email.toLowerCase());
        if (idx !== -1) {
          accounts[idx].profile = updatedUser;
          localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(accounts));
        }
      } catch (e) {
        console.warn('Failed to update accounts store:', e);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        loadDemoUser,
        updateProfile,
        authModalOpen,
        setAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        onboardingOpen,
        setOnboardingOpen,
        authNotice
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
