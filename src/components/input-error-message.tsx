import { FieldError } from "react-hook-form"

interface InputErrorMessagePropsI {
  error?: FieldError
}

export default function InputErrorMessage({ error }: InputErrorMessagePropsI) {
  return error ? (
    <p className="text-red-500 text-xs italic">{error.message}</p>
  ) : null
}
