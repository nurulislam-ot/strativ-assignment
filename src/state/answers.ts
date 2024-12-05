import { create } from "zustand"
import { persist } from "zustand/middleware"

import { randomId } from "@/service/random-id"
import { AnswerI, SubmitAnswerPayloadI } from "@/interface/answer"

interface AnswerStateI {
  answers: AnswerI[]
  submitAnswer: (payload: SubmitAnswerPayloadI) => void
  updateAnswer: (payload: SubmitAnswerPayloadI) => void
}

export const useAnswerStore = create<AnswerStateI>()(
  persist(
    (set, get) => ({
      answers: [],
      submitAnswer: payload => {
        const previousAnswers =
          get().answers.find(question => question.id === payload.questionId)
            ?.previousAnswers || []

        return set({
          answers: [
            ...get().answers,
            {
              id: randomId(),
              previousAnswers,
              ...payload
            }
          ]
        })
      },
      updateAnswer: payload => {
        const previousAnswers =
          get().answers.find(answer => answer.questionId === payload.questionId)
            ?.previousAnswers || []

        const updatedAnswers = get().answers.map(answer => {
          if (answer.questionId === payload.questionId) {
            return {
              ...answer,
              answer: payload.answer,
              previousAnswers: [...previousAnswers, answer.answer]
            }
          }

          return answer
        })

        return set({
          answers: updatedAnswers
        })
      }
    }),
    {
      name: "answers"
    }
  )
)
