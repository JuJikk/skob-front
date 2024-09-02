import { Navigate } from "react-router-dom";
import { useUserStore } from "../../lib/auth/useUser.ts"

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useUserStore((state) => ({
    user: state.user,
    isLoading: state.isLoading,
  }));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
