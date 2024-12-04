export interface AnswerI {
  id: string
  answer: string
  questionId: string
  previousAnswers: string[]
  answeredUserId: string
}

export interface SubmitAnswerPayloadI {
  answer: string
  questionId: string
  answeredUserId: string
}