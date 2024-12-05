import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { useAuthenticationStore } from "@/state/authentication"
import { useQuestionStore } from "@/state/questions"
import { TrashIcon, PencilIcon } from "lucide-react"
import { Link } from "react-router-dom"

export default function QuestionsList() {
  const { authenticatedUser } = useAuthenticationStore()
  const { questions, deleteQuestion, openAddOrEditModal, setActiveQuestion } =
    useQuestionStore()

  const questionDeleteHandler = (id: string) => {
    deleteQuestion(id)
    toast({
      title: "Success",
      description: "Question deleted successfully"
    })
  }

  return (
    <Table>
      <TableCaption>A list of your questions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Question</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions
          .filter(question => question.createdAdminId === authenticatedUser?.id)
          .map(question => (
            <TableRow key={question.id}>
              <TableCell className="font-medium">{question.id}</TableCell>
              <TableCell>
                <Link
                  className="underline text-blue-700"
                  to={`/admin/question/answers/${question.id}`}
                >
                  {question.question}
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => {
                      openAddOrEditModal()
                      setActiveQuestion(question)
                    }}
                    className="bg-green-500 p-1.5 rounded-full text-white"
                  >
                    <PencilIcon size={16} />
                  </button>
                  <button
                    className="bg-red-500 p-1.5 rounded-full text-white"
                    onClick={() => questionDeleteHandler(question.id)}
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
