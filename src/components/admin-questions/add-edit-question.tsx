import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"

import {
  AddQuestionPayloadI,
  UpdateQuestionPayloadI
} from "@/interface/question"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

import { toast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { randomId } from "@/service/random-id"
import { Button } from "@/components/ui/button"
import { useQuestionStore } from "@/state/questions"
import InputErrorMessage from "@/components/input-error-message"

export default function AddOrEditQuestion() {
  const {
    addQuestion,
    isAddOrEditModalOpen,
    closeAddOrEditModal,
    setAddOrEditModalOpen,
    activeQuestion,
    removeActiveQuestion,
    updateQuestion
  } = useQuestionStore()

  const { handleSubmit, control, setValue } = useForm<
    AddQuestionPayloadI | UpdateQuestionPayloadI
  >({
    defaultValues: { question: "", createdAdminId: "" }
  })

  const addOrEditQuestionHandler = (
    data: AddQuestionPayloadI | UpdateQuestionPayloadI
  ) => {
    if (activeQuestion) {
      updateQuestion({
        ...activeQuestion,
        ...data
      })
    } else {
      addQuestion({
        id: randomId(),
        ...data
      })
    }

    toast({
      title: "Success",
      description: `Question ${
        activeQuestion ? "added" : "updated"
      } successfully`
    })
    closeAddOrEditModal()
  }

  useEffect(() => {
    // if the modal is open and activeQuestion is available
    if (isAddOrEditModalOpen) {
      if (activeQuestion) {
        setValue("question", activeQuestion.question)
        setValue("createdAdminId", activeQuestion.createdAdminId)
      }
    }
    // reset the form when the modal is closed
    else {
      setValue("question", "")
      setValue("createdAdminId", "")
      removeActiveQuestion()
    }
  }, [isAddOrEditModalOpen])

  return (
    <Dialog open={isAddOrEditModalOpen} onOpenChange={setAddOrEditModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {activeQuestion ? "Update" : "Create"} Question
          </DialogTitle>
          <DialogDescription>Enter your question below</DialogDescription>
        </DialogHeader>

        <form
          className="pt-3"
          onSubmit={handleSubmit(addOrEditQuestionHandler)}
        >
          <Controller
            control={control}
            name="question"
            rules={{
              required: "Question is required",
              minLength: {
                value: 10,
                message: "Question should be at least 10 characters"
              }
            }}
            render={({ fieldState: { error }, field }) => (
              <div className="grid gap-2 mb-3">
                <Label htmlFor="question">Enter your question</Label>
                <Input
                  id="question"
                  type="text"
                  placeholder="Where is Dhaka?"
                  {...field}
                />
                <InputErrorMessage error={error} />
              </div>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
