import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { AppRoutes } from "@/routes";
import { useAuthStore } from "@/store/auth.store";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const queryClient = new QueryClient();

export const AppProviders = () => {
  const bootstrap = useAuthStore((s) => s.bootstrap);
  useEffect(() => bootstrap(), [bootstrap]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </QueryClientProvider>
  );
};
