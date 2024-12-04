import { useParams } from "react-router-dom"

import { useAnswerStore } from "@/state/answers"
import { useQuestionStore } from "@/state/questions"
import BackButtonWithHeading from "@/components/back-button-with-heading"

export default function AdminQuestionAnswers() {
  const { questionId } = useParams<{ questionId: string }>()

  const { answers } = useAnswerStore()
  const { questions } = useQuestionStore()

  const question = questions.find(question => question.id === questionId)

  const questionAnswers = answers.filter(
    answer => answer.questionId === questionId
  )

  return (
    <div className="container mx-auto py-10">
      <div className="flex item justify-between">
        <BackButtonWithHeading heading={question?.question} />
      </div>

      <div>
        <h2 className="text-lg font-medium">Answers</h2>
        <ul>
          {questionAnswers.map(answer => (
            <li key={answer.id}>{answer.answer}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
