import { create } from "zustand"
import { persist } from "zustand/middleware"
import { QuestionI, UpdateQuestionPayloadI } from "@/interface/question"

interface QuestionStateI {
  questions: QuestionI[]
  isAddOrEditModalOpen: boolean
  activeQuestion?: QuestionI
  openAddOrEditModal: () => void
  closeAddOrEditModal: () => void
  setAddOrEditModalOpen: (value: boolean) => void
  setActiveQuestion: (value: QuestionI) => void
  removeActiveQuestion: () => void
  addQuestion: (question: QuestionI) => void
  updateQuestion: (question: UpdateQuestionPayloadI) => void
  deleteQuestion: (id: string) => void
}

// export const useQuestionStore = create<QuestionStateI>(set => ({
//   questions: [],
//   addQuestion: question =>
//     set(state => ({
//       questions: [
//         ...state.questions,
//         {
//           id: randomId(),
//           question: question.question,
//           createdAdminId: ""
//         }
//       ]
//     })),
//   deleteQuestion: id =>
//     set(state => ({
//       questions: state.questions.filter(question => question.id !== id)
//     })),
//   updateQuestion: value =>
//     set(state => ({
//       questions: state.questions.map(question =>
//         question.id === value.id ? value : question
//       )
//     }))
// }))

export const useQuestionStore = create<QuestionStateI>()(
  persist(
    (set, get) => ({
      questions: [],
      isAddOrEditModalOpen: false,
      openAddOrEditModal: () => set({ isAddOrEditModalOpen: true }),
      closeAddOrEditModal: () => set({ isAddOrEditModalOpen: false }),
      setAddOrEditModalOpen: value => set({ isAddOrEditModalOpen: value }),
      addQuestion: question =>
        set({
          questions: [...get().questions, question]
        }),
      deleteQuestion: id =>
        set({
          questions: get().questions.filter(question => question.id !== id)
        }),
      updateQuestion: value =>
        set({
          questions: get().questions.map(question =>
            question.id === value.id ? value : question
          )
        }),
      setActiveQuestion: value =>
        set({
          activeQuestion: value
        }),
      removeActiveQuestion: () => set({ activeQuestion: undefined })
    }),
    { name: "questions" }
  )
)
