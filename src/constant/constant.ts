import { UserI } from "@/interface/authentication"
import { randomId } from "@/service/random-id"

export const users: UserI[] = [
  {
    email: "john.doe@gmail.com",
    id: randomId(),
    password: "123456",
    role: "general"
  },
  {
    email: "admin@gmail.com",
    id: randomId(),
    password: "password",
    role: "admin"
  },
  {
    email: "user@gmail.com",
    id: randomId(),
    password: "123456",
    role: "general"
  },
  {
    email: "bangladesh@gmail.com",
    id: randomId(),
    password: "password",
    role: "admin"
  }
]
