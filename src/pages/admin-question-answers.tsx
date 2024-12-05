import { Navigate, useParams } from "react-router-dom"

import { useQuestionStore } from "@/state/questions"
import BackButtonWithHeading from "@/components/back-button-with-heading"
import AnswerList from "@/components/admin-question-answers/answer-list"

export default function AdminQuestionAnswers() {
  const { questions } = useQuestionStore()
  const { questionId } = useParams<{ questionId: string }>()

  const question = questions.find(question => question.id === questionId)

  if (!question) return <Navigate to="/admin/questions" />

  return (
    <div className="container mx-auto py-10">
      <div className="flex item justify-between">
        <BackButtonWithHeading heading={question?.question} />
      </div>

      <AnswerList questionId={question.id} />
    </div>
  )
}
