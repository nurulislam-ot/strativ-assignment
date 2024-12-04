import { useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import SignIn from "@/pages/signin"
import Answers from "@/pages/answers"
import Question from "@/pages/question"
import Navbar from "@/components/navbar"
import { users } from "@/constant/constant"
import AdminRoute from "@/route/admin-route"
import PublicRoute from "@/route/public-route"
import { Toaster } from "@/components/ui/toaster"
import AdminQuestion from "@/pages/admin-questions"
import AuthenticatedRoute from "@/route/authenticated-route"
import { useAuthenticationStore } from "@/state/authentication"
import AdminQuestionAnswers from "./pages/admin-question-answers"

function App() {
  const { setUsers } = useAuthenticationStore()

  useEffect(() => {
    setUsers(users)
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/signIn" />} />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/admin/questions"
          element={
            <AdminRoute>
              <AdminQuestion />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/question/answers/:questionId"
          element={
            <AdminRoute>
              <AdminQuestionAnswers />
            </AdminRoute>
          }
        />
        <Route
          path="/questions"
          element={
            <AuthenticatedRoute>
              <Question />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/question/answer/:questionId"
          element={
            <AuthenticatedRoute>
              <Answers />
            </AuthenticatedRoute>
          }
        />
      </Routes>

      <Toaster />
    </BrowserRouter>
  )
}

export default App
