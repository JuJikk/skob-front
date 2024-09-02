import { Navigate } from "react-router-dom";
import { useUserStore } from "../../lib/auth/useUser.ts";

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { user, isLoading } = useUserStore((state) => ({
    user: state.user,
    isLoading: state.isLoading,
  }));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user && !isLoading) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
