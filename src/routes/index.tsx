import { lazy, Suspense, type ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { AppLayout } from "@/layouts/AppLayout";
import { Skeleton } from "@/components/ui/primitives";

const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const TalentSearchPage = lazy(() => import("@/pages/TalentSearchPage"));
const TeamBuilderPage = lazy(() => import("@/pages/TeamBuilderPage"));
const DirectoryPage = lazy(() => import("@/pages/DirectoryPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const InsightsPage = lazy(() => import("@/pages/InsightsPage"));
const SkillAnalyticsPage = lazy(() => import("@/pages/SkillAnalyticsPage"));
const NotificationsPage = lazy(() => import("@/pages/NotificationsPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const ChatPage = lazy(() => import("@/pages/ChatPage"));

const LazyWrap = ({ children }: { children: ReactNode }) => <Suspense fallback={<div className="grid gap-3 p-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-36" />)}</div>}>{children}</Suspense>;

export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LazyWrap><LoginPage /></LazyWrap>} />
    <Route path="/signup" element={<LazyWrap><SignupPage /></LazyWrap>} />

    <Route element={<ProtectedRoute />}>
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<LazyWrap><DashboardPage /></LazyWrap>} />
        <Route element={<ProtectedRoute roles={["admin", "project_manager"]} />}>
          <Route path="/talent-search" element={<LazyWrap><TalentSearchPage /></LazyWrap>} />
          <Route path="/team-builder" element={<LazyWrap><TeamBuilderPage /></LazyWrap>} />
        </Route>
        <Route path="/directory" element={<LazyWrap><DirectoryPage /></LazyWrap>} />
        <Route path="/employee/:id" element={<LazyWrap><ProfilePage /></LazyWrap>} />
        <Route element={<ProtectedRoute roles={["admin"]} />}>
          <Route path="/insights" element={<LazyWrap><InsightsPage /></LazyWrap>} />
          <Route path="/analytics" element={<LazyWrap><SkillAnalyticsPage /></LazyWrap>} />
        </Route>
        <Route path="/notifications" element={<LazyWrap><NotificationsPage /></LazyWrap>} />
        <Route path="/settings" element={<LazyWrap><SettingsPage /></LazyWrap>} />
        <Route path="/chat" element={<LazyWrap><ChatPage /></LazyWrap>} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);