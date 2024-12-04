import { useParams, Navigate } from "react-router-dom"

import { useQuestionStore } from "@/state/questions"
import MyAnswer from "@/components/answers/my-answer"
import AnswerForm from "@/components/answers/answer-form"
import BackButtonWithHeading from "@/components/back-button-with-heading"

export default function Answers() {
  const { questions } = useQuestionStore()
  const { questionId } = useParams<{ questionId: string }>()

  const question = questions.find(q => q.id === questionId)

  if (!questionId || !question) return <Navigate to="/questions" />

  return (
    <div className="container mx-auto py-10 h-[calc(100vh-64px)]">
      <BackButtonWithHeading heading={question.question} />
      <MyAnswer questionId={questionId} />
      <AnswerForm questionId={questionId} />
    </div>
  )
}
