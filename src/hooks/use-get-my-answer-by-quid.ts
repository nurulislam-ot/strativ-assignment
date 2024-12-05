import { useAnswerStore } from "@/state/answers"
import { useAuthenticationStore } from "@/state/authentication"

export default function useGetMyAnswerByQuestionId(questionId: string) {
  const { answers } = useAnswerStore()
  const { authenticatedUser } = useAuthenticationStore()
  const yourAnswer = answers.find(
    answer =>
      answer.answeredUserId === authenticatedUser?.id &&
      answer.questionId === questionId
  )

  return yourAnswer
}
