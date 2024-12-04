export type ROLE_TYPE = "admin" | "general"

export interface UserI {
  id: string
  email: string
  password: string
  role: ROLE_TYPE
}

export interface SignInPayloadI {
  email: string
  password: string
}
