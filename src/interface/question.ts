export interface QuestionI {
  id: string
  question: string
  createdAdminId: string
}

export interface AddQuestionPayloadI {
  question: string
  createdAdminId: string
}

export interface UpdateQuestionPayloadI {
  id: string
  question: string
  createdAdminId: string
}

export interface QuestionIdParams {
  readonly questionId: string
}
