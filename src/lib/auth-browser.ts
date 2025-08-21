// Browser-compatible authentication service
// This version uses Web Crypto API instead of Node.js crypto modules

import { User, db } from './database';
import { v4 as uuidv4 } from 'uuid';

// JWT secret - in production, this should be stored securely
const JWT_SECRET = 'uniflow-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

// Email verification and password reset token expiration (24 hours)
const TOKEN_EXPIRES_IN = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export interface AuthResult {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Simple hash function using Web Crypto API
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + JWT_SECRET);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Simple JWT-like token generation
function generateToken(user: User): string {
  const payload = {
    userId: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
  };
  
  // Simple base64 encoding (not secure, just for demo)
  return btoa(JSON.stringify(payload));
}

// Simple token verification
function verifyToken(token: string): any {
  try {
    const payload = JSON.parse(atob(token));
    if (payload.exp && Date.now() > payload.exp) {
      return null; // Token expired
    }
    return payload;
  } catch {
    return null; // Invalid token
  }
}

export class AuthService {
  // Register a new user
  static async register(data: RegisterData): Promise<AuthResult> {
    try {
      // Check if user already exists
      const existingUser = await extendedDbUtils.getUserByEmail(data.email);
      if (existingUser) {
        return {
          success: false,
          error: 'User with this email already exists'
        };
      }

      // Validate password strength
      if (data.password.length < 8) {
        return {
          success: false,
          error: 'Password must be at least 8 characters long'
        };
      }

      // Hash password
      const passwordHash = await hashPassword(data.password);

      // Generate email verification token
      const emailVerificationToken = uuidv4();

      // Create user
      const user = await extendedDbUtils.createUser({
        email: data.email.toLowerCase(),
        passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        isEmailVerified: false,
        emailVerificationToken,
        twoFactorEnabled: false,
        preferences: {
          theme: 'system',
          notifications: true,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      });

      // Generate JWT token
      const token = generateToken(user);

      return {
        success: true,
        user,
        token
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: 'Registration failed. Please try again.'
      };
    }
  }

  // Login user
  static async login(data: LoginData): Promise<AuthResult> {
    try {
      // Find user by email
      const user = await extendedDbUtils.getUserByEmail(data.email.toLowerCase());
      if (!user) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      // Check if email is verified
      if (!user.isEmailVerified) {
        return {
          success: false,
          error: 'Please verify your email address before logging in'
        };
      }

      // Verify password
      const hashedPassword = await hashPassword(data.password);
      if (hashedPassword !== user.passwordHash) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      // Update last login
      await extendedDbUtils.updateUser(user.id!, { lastLoginAt: new Date() });

      // Generate JWT token
      const token = generateToken(user);

      return {
        success: true,
        user,
        token
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Login failed. Please try again.'
      };
    }
  }

  // Verify JWT token
  static async verifyToken(token: string): Promise<AuthResult> {
    try {
      const decoded = verifyToken(token);
      if (!decoded) {
        return {
          success: false,
          error: 'Invalid or expired token'
        };
      }
      
      const user = await extendedDbUtils.getUserById(decoded.userId);
      
      if (!user) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      return {
        success: true,
        user
      };
    } catch (error) {
      return {
        success: false,
        error: 'Invalid or expired token'
      };
    }
  }

  // Verify email
  static async verifyEmail(token: string): Promise<AuthResult> {
    try {
      const user = await extendedDbUtils.getUserByEmailVerificationToken(token);
      if (!user) {
        return {
          success: false,
          error: 'Invalid verification token'
        };
      }

      // Check if token is expired
      if (user.emailVerificationToken && 
          Date.now() - user.createdAt.getTime() > TOKEN_EXPIRES_IN) {
        return {
          success: false,
          error: 'Verification token has expired'
        };
      }

      // Update user
      await extendedDbUtils.updateUser(user.id!, {
        isEmailVerified: true,
        emailVerificationToken: undefined
      });

      return {
        success: true,
        user: { ...user, isEmailVerified: true }
      };
    } catch (error) {
      console.error('Email verification error:', error);
      return {
        success: false,
        error: 'Email verification failed'
      };
    }
  }

  // Request password reset
  static async requestPasswordReset(email: string): Promise<AuthResult> {
    try {
      const user = await extendedDbUtils.getUserByEmail(email.toLowerCase());
      if (!user) {
        // Don't reveal if user exists or not for security
        return {
          success: true
        };
      }

      // Generate reset token
      const resetPasswordToken = uuidv4();
      const resetPasswordExpires = new Date(Date.now() + TOKEN_EXPIRES_IN);

      // Update user
      await extendedDbUtils.updateUser(user.id!, {
        resetPasswordToken,
        resetPasswordExpires
      });

      // In a real app, send email here
      console.log('Password reset token:', resetPasswordToken);

      return {
        success: true
      };
    } catch (error) {
      console.error('Password reset request error:', error);
      return {
        success: false,
        error: 'Failed to process password reset request'
      };
    }
  }

  // Reset password
  static async resetPassword(token: string, newPassword: string): Promise<AuthResult> {
    try {
      const user = await extendedDbUtils.getUserByResetPasswordToken(token);
      if (!user) {
        return {
          success: false,
          error: 'Invalid reset token'
        };
      }

      // Check if token is expired
      if (!user.resetPasswordExpires || 
          Date.now() > user.resetPasswordExpires.getTime()) {
        return {
          success: false,
          error: 'Reset token has expired'
        };
      }

      // Validate new password
      if (newPassword.length < 8) {
        return {
          success: false,
          error: 'Password must be at least 8 characters long'
        };
      }

      // Hash new password
      const passwordHash = await hashPassword(newPassword);

      // Update user
      await extendedDbUtils.updateUser(user.id!, {
        passwordHash,
        resetPasswordToken: undefined,
        resetPasswordExpires: undefined
      });

      return {
        success: true
      };
    } catch (error) {
      console.error('Password reset error:', error);
      return {
        success: false,
        error: 'Password reset failed'
      };
    }
  }

  // Change password (for authenticated users)
  static async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<AuthResult> {
    try {
      const user = await extendedDbUtils.getUserById(userId);
      if (!user) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      // Verify current password
      const hashedCurrentPassword = await hashPassword(currentPassword);
      if (hashedCurrentPassword !== user.passwordHash) {
        return {
          success: false,
          error: 'Current password is incorrect'
        };
      }

      // Validate new password
      if (newPassword.length < 8) {
        return {
          success: false,
          error: 'Password must be at least 8 characters long'
        };
      }

      // Hash new password
      const passwordHash = await hashPassword(newPassword);

      // Update user
      await extendedDbUtils.updateUser(userId, { passwordHash });

      return {
        success: true
      };
    } catch (error) {
      console.error('Password change error:', error);
      return {
        success: false,
        error: 'Password change failed'
      };
    }
  }
}

// Extended database utilities with auth-specific methods
export const extendedDbUtils = {
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const now = new Date();
    const user: User = {
      ...userData,
      createdAt: now,
      updatedAt: now,
    };
    const id = await db.users.add(user);
    return { ...user, id: id as number };
  },

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await db.users.where('email').equals(email).first();
  },

  async getUserById(id: number): Promise<User | undefined> {
    return await db.users.get(id);
  },

  async updateUser(id: number, updates: Partial<User>): Promise<void> {
    await db.users.update(id, { ...updates, updatedAt: new Date() });
  },

  async getUserByEmailVerificationToken(token: string): Promise<User | undefined> {
    return await db.users.where('emailVerificationToken').equals(token).first();
  },

  async getUserByResetPasswordToken(token: string): Promise<User | undefined> {
    return await db.users.where('resetPasswordToken').equals(token).first();
  }
};

export default AuthService;
