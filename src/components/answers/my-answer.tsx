import { PencilIcon } from "lucide-react"
import MyPreviousAnswers from "./my-previous-answers"
import useGetMyAnswersByQuestionId from "@/hooks/use-get-my-answer-by-quid"

interface YourAnswersPropsI {
  questionId: string
  setIsAnswerUpdating: (isAnswerUpdating: boolean) => void
}

export default function MyAnswer({
  questionId,
  setIsAnswerUpdating
}: YourAnswersPropsI) {
  const myAnswer = useGetMyAnswersByQuestionId(questionId)

  return (
    <div className="mb-20">
      {myAnswer ? (
        <div>
          <p className="relative text-gray-700 italic mb-3">
            <span className="font-bold">Answer: </span>
            {myAnswer.answer}
            <button
              className="absolute p-1.5 bg-green-800 rounded-full text-white right-10"
              onClick={() => setIsAnswerUpdating(true)}
            >
              <PencilIcon size={16} />
            </button>
          </p>

          <MyPreviousAnswers questionId={questionId} />
        </div>
      ) : (
        <p className="text-red-600 italic">
          You have not submitted your answer
        </p>
      )}
    </div>
  )
}
