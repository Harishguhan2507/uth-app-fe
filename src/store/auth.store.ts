import { create } from "zustand";
import { authService, type AuthSession } from "@/services/auth.service";

interface AuthState {
  session: AuthSession | null;
  isAuthed: boolean;
  setSession: (session: AuthSession | null) => void;
  bootstrap: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isAuthed: false,
  setSession: (session) => set({ session, isAuthed: Boolean(session) }),
  bootstrap: () => {
    const session = authService.getSession();
    set({ session, isAuthed: Boolean(session) });
  },
  logout: () => {
    authService.logout();
    set({ session: null, isAuthed: false });
  },
}));