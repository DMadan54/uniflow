import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@/lib/database';
import AuthService, { AuthResult } from '@/lib/auth-browser';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<AuthResult>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => Promise<void>;
  verifyEmail: (token: string) => Promise<AuthResult>;
  requestPasswordReset: (email: string) => Promise<AuthResult>;
  resetPassword: (token: string, newPassword: string) => Promise<AuthResult>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('uniflow_token');
        if (storedToken) {
          const result = await AuthService.verifyToken(storedToken);
          if (result.success && result.user) {
            setUser(result.user);
            setToken(storedToken);
          } else {
            // Token is invalid, remove it
            localStorage.removeItem('uniflow_token');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('uniflow_token');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const result = await AuthService.login({ email, password });
      if (result.success && result.user && result.token) {
        setUser(result.user);
        setToken(result.token);
        localStorage.setItem('uniflow_token', result.token);
      }
      return result;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Login failed. Please try again.'
      };
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string): Promise<AuthResult> => {
    try {
      const result = await AuthService.register({ email, password, firstName, lastName });
      if (result.success && result.user && result.token) {
        setUser(result.user);
        setToken(result.token);
        localStorage.setItem('uniflow_token', result.token);
      }
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: 'Registration failed. Please try again.'
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('uniflow_token');
  };

  const updateUser = async (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
    }
  };

  const verifyEmail = async (token: string): Promise<AuthResult> => {
    try {
      const result = await AuthService.verifyEmail(token);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } catch (error) {
      console.error('Email verification error:', error);
      return {
        success: false,
        error: 'Email verification failed'
      };
    }
  };

  const requestPasswordReset = async (email: string): Promise<AuthResult> => {
    try {
      return await AuthService.requestPasswordReset(email);
    } catch (error) {
      console.error('Password reset request error:', error);
      return {
        success: false,
        error: 'Failed to process password reset request'
      };
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<AuthResult> => {
    try {
      return await AuthService.resetPassword(token, newPassword);
    } catch (error) {
      console.error('Password reset error:', error);
      return {
        success: false,
        error: 'Password reset failed'
      };
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<AuthResult> => {
    try {
      if (!user) {
        return {
          success: false,
          error: 'User not authenticated'
        };
      }
      return await AuthService.changePassword(user.id!, currentPassword, newPassword);
    } catch (error) {
      console.error('Password change error:', error);
      return {
        success: false,
        error: 'Password change failed'
      };
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    register,
    logout,
    updateUser,
    verifyEmail,
    requestPasswordReset,
    resetPassword,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
