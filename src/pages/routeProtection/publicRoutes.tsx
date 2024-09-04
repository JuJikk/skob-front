import { Navigate } from "react-router-dom";
import { useUserStore } from "../../lib/auth/useUser.ts";
import Loader from "../../components/common/loader"
import React from "react"

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { user, isLoading } = useUserStore((state) => ({
    user: state.user,
    isLoading: state.isLoading,
  }));

  if (isLoading) {
    return <Loader label="Завантаження..." />;
  }

  if (user && !isLoading) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
