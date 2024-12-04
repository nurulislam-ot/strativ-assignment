import { create } from "zustand"
import { persist } from "zustand/middleware"

import { UserI, SignInPayloadI } from "@/interface/authentication"

interface AuthenticationStateI {
  users: UserI[]
  authenticatedUser?: UserI
  signIn: (data: SignInPayloadI) => boolean
  signOut: () => void
  setUsers: (users: UserI[]) => void
}

export const useAuthenticationStore = create<AuthenticationStateI>()(
  persist(
    (set, get) => ({
      users: [],
      signIn: data => {
        const user = get().users.find(
          user => user.email === data.email && user.password === data.password
        )

        if (user) {
          set({ authenticatedUser: user })
          return true
        }

        return false
      },
      signOut: () => set({ authenticatedUser: undefined }),
      setUsers: users => set({ users })
    }),
    {
      name: "users"
    }
  )
)
