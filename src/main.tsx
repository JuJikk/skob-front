import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { Providers } from "./components/providers"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.tsx"
import ErrorPage from "./pages/ErrorPage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import { ProtectedRoute } from "./pages/routeProtection/ProtectedRoute.tsx"
import { PublicRoute } from "./pages/routeProtection/publicRoutes.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "signup",
    element: (
      <PublicRoute>
        <SignUpPage />
      </PublicRoute>
    ),
  },
]);


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
)
