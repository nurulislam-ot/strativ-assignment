import { Controller, useForm } from "react-hook-form"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAnswerStore } from "@/state/answers"
import { Textarea } from "@/components/ui/textarea"
import { SubmitAnswerPayloadI } from "@/interface/answer"
import { useAuthenticationStore } from "@/state/authentication"
import InputErrorMessage from "@/components/input-error-message"
import useGetMyAnswerByQuestionId from "@/hooks/use-get-my-answer-by-quid"
import { toast } from "@/hooks/use-toast"

interface AnswerFormPropsI {
  questionId: string
  setIsAnswerUpdating: (isAnswerUpdating: boolean) => void
}

export default function AnswerUpdateForm({
  questionId,
  setIsAnswerUpdating
}: AnswerFormPropsI) {
  const { updateAnswer } = useAnswerStore()
  const { authenticatedUser } = useAuthenticationStore()
  const myAnswer = useGetMyAnswerByQuestionId(questionId)
  const { control, handleSubmit } = useForm<SubmitAnswerPayloadI>({
    defaultValues: {
      answer: myAnswer?.answer || "",
      questionId,
      answeredUserId: authenticatedUser?.id
    }
  })

  const submitAnswerHandler = (data: SubmitAnswerPayloadI) => {
    updateAnswer(data)
    toast({
      title: "Answer submitted",
      description: "Your answer has been submitted successfully"
    })

    setIsAnswerUpdating(false)
  }

  return (
    <form
      className="w-[600px] mt-auto"
      onSubmit={handleSubmit(submitAnswerHandler)}
    >
      <div className="flex flex-col">
        <Controller
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
      <div className="flex gap-2">
        <Button type="submit">Update</Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setIsAnswerUpdating(false)
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
