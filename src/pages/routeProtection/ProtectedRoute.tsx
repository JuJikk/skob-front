import { Navigate } from "react-router-dom";
import { useUserStore } from "../../lib/auth/useUser.tsx"

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

  // Redirect to login if not authenticated
  if (!user && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  // Allow access to protected route if authenticated
  return <>{children}</>;
}
