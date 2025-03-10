import { create } from "zustand";

type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
  loggout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },
  loggout: () => {
    localStorage.removeItem('token');
    set({ token: null });
  }
}));

export default useAuthStore;