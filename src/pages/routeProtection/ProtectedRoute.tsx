import { Navigate } from "react-router-dom";
import { useUserStore } from "../../lib/auth/useUser.ts"
import Loader from "../../components/common/loader"
import React from "react"

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useUserStore((state) => ({
    user: state.user,
    isLoading: state.isLoading,
  }));

  if (isLoading) {
    return <Loader label="Завантаження..." />
  }

  if (!user && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
