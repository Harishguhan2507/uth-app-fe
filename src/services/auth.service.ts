import { MOCK_USERS, STORAGE_KEYS } from "@/constants";
import { sleep } from "@/utils";
import type { AppUser } from "@/types";

export interface AuthSession {
  id: string;
  name: string;
  email: string;
  role: AppUser["role"];
}

const toSession = (user: AppUser): AuthSession => ({ id: user.id, name: user.name, email: user.email, role: user.role });

export const authService = {
  async login(email: string, password: string): Promise<AuthSession> {
    await sleep(600);
    const user = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const session = toSession(user);
    localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify(session));
    return session;
  },
  logout() {
    localStorage.removeItem(STORAGE_KEYS.auth);
  },
  getSession(): AuthSession | null {
    const raw = localStorage.getItem(STORAGE_KEYS.auth);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  },
};