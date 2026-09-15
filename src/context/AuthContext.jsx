import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import userService from '../services/userService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('driveease_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(true);

  // Validate session token on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('driveease_token');
      if (token) {
        try {
          const res = await authService.getMe();
          if (res.success && res.user) {
            setCurrentUser(res.user);
            localStorage.setItem('driveease_user', JSON.stringify(res.user));
          }
        } catch (err) {
          console.warn('Session verification failed, logging out:', err);
          authService.logout();
          setCurrentUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authService.login(email, password);
      if (res.success && res.user) {
        setCurrentUser(res.user);
        return { success: true, user: res.user };
      }
      return { success: false, message: res.message || 'Login failed' };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Server connection error during login'
      };
    }
  };

  const register = async (userData) => {
    try {
      const res = await authService.register(userData);
      if (res.success && res.user) {
        setCurrentUser(res.user);
        return { success: true, user: res.user };
      }
      return { success: false, message: res.message || 'Registration failed' };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Server connection error during registration'
      };
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const updateProfile = async (updatedData) => {
    try {
      const res = await userService.updateProfile(updatedData);
      if (res.success && res.data) {
        setCurrentUser(res.data);
        localStorage.setItem('driveease_user', JSON.stringify(res.data));
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to update profile'
      };
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      isAuthenticated: !!currentUser,
      isAdmin: currentUser?.role === 'admin',
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
