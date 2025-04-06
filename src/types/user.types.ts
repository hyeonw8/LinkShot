export type User = {
  id: string;
  email?: string;
  user_metadata?: any;
  // 필요한 다른 필드들
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  initialized: boolean;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
};
