import { Navigate } from "react-router-dom"
import { useAuthenticationStore } from "@/state/authentication"

interface AuthenticatedRoutePropsI {
  children: React.ReactNode
}

export default function AuthenticatedRoute({
  children
}: AuthenticatedRoutePropsI) {
  const { authenticatedUser } = useAuthenticationStore()

  return authenticatedUser ? children : <Navigate to="/signin" />
}
