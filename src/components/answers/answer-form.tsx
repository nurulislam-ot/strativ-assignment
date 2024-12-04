import { Controller, useForm } from "react-hook-form"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAnswerStore } from "@/state/answers"
import { Textarea } from "@/components/ui/textarea"
import { SubmitAnswerPayloadI } from "@/interface/answer"
import { useAuthenticationStore } from "@/state/authentication"
import InputErrorMessage from "@/components/input-error-message"
import useGetMyAnswersByQuestionId from "@/hooks/use-get-my-answers-by-quid"

interface AnswerFormPropsI {
  questionId: string
}

export default function AnswerForm({ questionId }: AnswerFormPropsI) {
  const { submitAnswer } = useAnswerStore()
  const { authenticatedUser } = useAuthenticationStore()
  const myAnswer = useGetMyAnswersByQuestionId(questionId)
  const { control, handleSubmit } = useForm<SubmitAnswerPayloadI>({
    defaultValues: {
      answer: "",
      questionId,
      answeredUserId: authenticatedUser?.id
    }
  })

  const submitAnswerHandler = (data: SubmitAnswerPayloadI) => {
    submitAnswer(data)
  }

  return (
    <form
      className="w-[600px] mt-auto"
      onSubmit={handleSubmit(submitAnswerHandler)}
    >
      <div className="flex flex-col">
        <Controller
          disabled={!!myAnswer}
          control={control}
          name="answer"
          rules={{ required: "Answer is required" }}
          render={({ field, fieldState: { error } }) => (
            <div className="grid w-full gap-1.5 mb-3">
              <Label htmlFor="answer">Your Answer</Label>
              <Textarea
                placeholder="Bangladesh is located in Asia"
                id="answer"
                rows={4}
                {...field}
              />
              <InputErrorMessage error={error} />
            </div>
          )}
        />
      </div>
      <Button disabled={!!myAnswer} type="submit">
        Submit
      </Button>
    </form>
  )
}
