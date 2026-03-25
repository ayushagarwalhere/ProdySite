"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { login as apiLogin, logout as apiLogout } from "@/lib/api/auth";
import { getProfile } from "@/lib/api/user";

type User = {
  id: string;
  name?: string;
  username?: string;
  email: string;
  role: string;
  avatarUrl?: string;
  verified: boolean;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]         = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current user — succeeds if cookie is valid, 401 if not
  const refreshUser = useCallback(async () => {
    try {
      const res = await getProfile();
      setUser(res.data);
    } catch {
      setUser(null);
    }
  }, []);

  // Check on mount
  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false));
  }, [refreshUser]);

  const login = useCallback(async (username: string, password: string) => {
    await apiLogin(username, password); // sets auth cookie
    await refreshUser();               // fetch user data
  }, [refreshUser]);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } finally {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      isLoading,
      login,
      logout,
      refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}