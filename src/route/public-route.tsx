import { Navigate } from "react-router-dom"
import { useAuthenticationStore } from "@/state/authentication"

interface PublicRoutePropsI {
  children: React.ReactNode
}

export default function PublicRoute({ children }: PublicRoutePropsI) {
  const { authenticatedUser } = useAuthenticationStore()

  if (authenticatedUser) {
    if (authenticatedUser.role === "admin")
      return <Navigate to="/admin/questions" />
    return <Navigate to="/questions" />
  } else {
    return children
  }
}
