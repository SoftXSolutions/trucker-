import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUserWithGoogle = useCallback(async () => {
    // Placeholder for Google Sign-In integration
    // In real impl, invoke Google OAuth and set user with profile
    const mockUser = { id: 'u1', name: 'Google User', role: 'user', provider: 'google' };
    setUser(mockUser);
    return mockUser;
  }, []);

  const loginMover = useCallback(async (email) => {
    const mockMover = { id: 'm1', name: email || 'Mover', role: 'mover' };
    setUser(mockMover);
    return mockMover;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, isAuthenticated: !!user, loginUserWithGoogle, loginMover, logout }), [user, loginUserWithGoogle, loginMover, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
