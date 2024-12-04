import { useNavigate } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import InputErrorMessage from "../input-error-message"
import { SignInPayloadI } from "@/interface/authentication"
import { useAuthenticationStore } from "@/state/authentication"
import { useEffect } from "react"

export default function SignInForm() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { signIn, authenticatedUser } = useAuthenticationStore()
  const { handleSubmit, control } = useForm<SignInPayloadI>({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const formSubmitHandler = (data: SignInPayloadI) => {
    const isLoggedIn = signIn(data)
    if (!isLoggedIn) {
      toast({
        title: "Invalid credentials",
        description: "Please enter right credentials",
        variant: "destructive"
      })
    }
  }

  useEffect(() => {
    console.log(authenticatedUser)
    if (authenticatedUser?.role === "admin") {
      navigate("/admin/questions")
    }
    if (authenticatedUser?.role === "general") {
      navigate("/questions")
    }
  }, [authenticatedUser])

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <div className="grid gap-4">
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email"
                }
              }}
              render={({ field, fieldState: { error } }) => (
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    autoComplete="email"
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    {...field}
                  />
                  <InputErrorMessage error={error} />
                </div>
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              }}
              render={({ field, fieldState: { error } }) => (
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    autoComplete="current-password"
                    id="password"
                    placeholder="********"
                    type="password"
                    {...field}
                  />
                  <InputErrorMessage error={error} />
                </div>
              )}
            />

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
