import QuestionsList from "@/components/questions/question-list"

export default function Question() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex item justify-between">
        <h1 className="text-2xl font-bold">Questions: </h1>
      </div>
      <QuestionsList />
    </div>
  )
}
