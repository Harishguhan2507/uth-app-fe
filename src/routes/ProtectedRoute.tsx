import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import type { UserRole } from "@/types";

export const ProtectedRoute = ({ roles }: { roles?: UserRole[] }) => {
  const session = useAuthStore((s) => s.session);
  if (!session) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(session.role)) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};