export interface User {
  id: string;
  email: string;
  plan: 'FREE' | 'PRO' | 'TEAM';
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
