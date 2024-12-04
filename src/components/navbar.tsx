import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuthenticationStore } from "@/state/authentication"

export default function Navbar() {
  const { signOut, authenticatedUser } = useAuthenticationStore()
  return (
    <nav className="border-b bg-white h-16">
      <div className="container mx-auto flex items-center justify-between h-full">
        <div className="text-orange-500 text-2xl font-semibold">Strativ AB</div>
        <div>
          {authenticatedUser ? (
            <div className="flex items-center gap-4">
              <Link to="/questions" className=" underline">
                Questions
              </Link>
              <Button variant="destructive" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <Link to="/signin" className="text-blue-700 underline">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
