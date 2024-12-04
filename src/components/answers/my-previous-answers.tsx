import { useAnswerStore } from "@/state/answers"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { useAuthenticationStore } from "@/state/authentication"

interface YourPreviousAnswersPropsI {
  questionId: string
}

export default function MyPreviousAnswers({
  questionId
}: YourPreviousAnswersPropsI) {
  const { authenticatedUser } = useAuthenticationStore()
  const { answers } = useAnswerStore()

  const yourPreviousAnswer = answers.find(
    answer =>
      answer.answeredUserId === authenticatedUser?.id &&
      answer.questionId === questionId
  )?.previousAnswers

  if (!yourPreviousAnswer) {
    return <></>
  }

  return (
    <Dialog>
      {yourPreviousAnswer.length > 0 && (
        <DialogTrigger className="text-green-900">
          Check Your Previous Answers
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Previous Answers</DialogTitle>
          <DialogDescription>
            Your previous answers for this question
          </DialogDescription>
        </DialogHeader>
        <ul>
          {yourPreviousAnswer.map((answer, index) => (
            <li key={index}>{answer}</li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
