import { useAnswerStore } from "@/state/answers"

interface AdminQuestionAnswersPropsI {
  questionId: string
}

export default function AnswerList({ questionId }: AdminQuestionAnswersPropsI) {
  const { answers } = useAnswerStore()

  const questionAnswers = answers.filter(
    answer => answer.questionId === questionId
  )

  return (
    <div>
      <h2 className="text-lg font-medium">Answers</h2>
      <ul>
        {questionAnswers.map(answer => (
          <li className="py-1" key={answer.id}>
            <span className="font-medium">Answer:</span>&nbsp;
            {answer.answer}
          </li>
        ))}
      </ul>
    </div>
  )
}
