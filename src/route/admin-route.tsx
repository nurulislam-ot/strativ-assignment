import { Navigate } from "react-router-dom"
import { useAuthenticationStore } from "@/state/authentication"

interface AdminRoutePropsI {
  children: React.ReactNode
}

export default function AdminRoute({ children }: AdminRoutePropsI) {
  const { authenticatedUser } = useAuthenticationStore()

  return authenticatedUser?.role == "admin" ? (
    children
  ) : (
    <Navigate to="/signin" />
  )
}
