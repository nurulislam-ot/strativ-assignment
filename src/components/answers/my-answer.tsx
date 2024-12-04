import UpdateAnswer from "./update-answer"
import MyPreviousAnswers from "./my-previous-answers"
import useGetMyAnswersByQuestionId from "@/hooks/use-get-my-answers-by-quid"

interface YourAnswersPropsI {
  questionId: string
}

export default function MyAnswer({ questionId }: YourAnswersPropsI) {
  const myAnswer = useGetMyAnswersByQuestionId(questionId)

  return (
    <div className="mb-20">
      {myAnswer ? (
        <div>
          <p className="relative text-gray-700 italic mb-3">
            <span className="font-bold">Answer: </span>
            {myAnswer.answer}
            <UpdateAnswer />
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
