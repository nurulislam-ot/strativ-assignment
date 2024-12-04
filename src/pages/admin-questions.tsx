import { Button } from "@/components/ui/button"
import { useQuestionStore } from "@/state/questions"
import QuestionsList from "@/components/admin-questions/question-list"
import AddOrEditQuestion from "@/components/admin-questions/add-edit-question"

export default function AdminQuestion() {
  const { openAddOrEditModal } = useQuestionStore()
  return (
    <div className="container mx-auto py-10">
      <div className="flex item justify-between">
        <h1 className="text-2xl font-bold">Questions: </h1>
        <Button onClick={openAddOrEditModal}>Add Question</Button>
      </div>
      <QuestionsList />
      <AddOrEditQuestion />
    </div>
  )
}
