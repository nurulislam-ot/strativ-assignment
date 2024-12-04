import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

import { SubmitAnswerPayloadI } from "@/interface/answer"
import { useAnswerStore } from "@/state/answers"
import { PencilIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import InputErrorMessage from "../input-error-message"

export default function UpdateAnswer() {
  const { updateAnswer } = useAnswerStore()
  const { control, handleSubmit } = useForm<SubmitAnswerPayloadI>({
    defaultValues: {
      answer: ""
    }
  })

  const handleUpdateAnswer = (data: SubmitAnswerPayloadI) => {
    updateAnswer(data)
  }

  return (
    <Dialog>
      <DialogTrigger className="absolute p-1.5 bg-green-800 rounded-full text-white right-10">
        <PencilIcon size={16} />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Your Answer</DialogTitle>
          <DialogDescription>You can update your answer</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleUpdateAnswer)}>
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
                  {...field}
                />
                <InputErrorMessage error={error} />
              </div>
            )}
          />

          <Button onClick={() => {}}>Update Answer</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
