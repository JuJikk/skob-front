import { Navigate } from "react-router-dom";
import { useUserStore } from "../../lib/auth/useUser.tsx";

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

  // Якщо користувач авторизований, перенаправляємо на головну сторінку
  if (user && !isLoading) {
    return <Navigate to="/" replace />;
  }

  // Якщо користувач не авторизований, дозволяємо доступ до сторінки
  return <>{children}</>;
}
