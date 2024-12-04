import { Link } from "react-router-dom"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { useQuestionStore } from "@/state/questions"

export default function QuestionList() {
  const { questions } = useQuestionStore()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Question</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions.map(question => (
          <TableRow key={question.id}>
            <TableCell className="font-medium">{question.id}</TableCell>
            <TableCell>
              <Link
                to={`/question/answer/${question.id}`}
                className="underline text-blue-700"
              >
                {question.question}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
