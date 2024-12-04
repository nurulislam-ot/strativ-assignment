import { create } from "zustand"
import { persist } from "zustand/middleware"

import { randomId } from "@/service/random-id"
import { AnswerI, SubmitAnswerPayloadI } from "@/interface/answer"

interface AnswerStateI {
  answers: AnswerI[]
  submitAnswer: (answer: SubmitAnswerPayloadI) => void
  updateAnswer: (answer: SubmitAnswerPayloadI) => void
}

export const useAnswerStore = create<AnswerStateI>()(
  persist(
    (set, get) => ({
      answers: [],
      submitAnswer: answer => {
        const previousAnswers =
          get().answers.find(question => question.id === answer.questionId)
            ?.previousAnswers || []

        return set({
          answers: [
            ...get().answers,
            {
              id: randomId(),
              previousAnswers,
              ...answer
            }
          ]
        })
      },
      updateAnswer: answer => {
        const previousAnswers =
          get().answers.find(question => question.id === answer.questionId)
            ?.previousAnswers || []
        previousAnswers.push(answer.answer)

        return set({
          answers: [
            ...get().answers,
            {
              id: randomId(),
              previousAnswers,
              ...answer
            }
          ]
        })
      }
    }),
    {
      name: "answers"
    }
  )
)
