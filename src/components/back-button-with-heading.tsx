import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface BackButtonWithHeadingPropsI {
  heading?: string
  backTo?: string
}

export default function BackButtonWithHeading({
  heading,
  backTo
}: BackButtonWithHeadingPropsI) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (backTo) {
      navigate(backTo)
    } else {
      navigate(-1)
    }
  }

  return (
    <div className="flex items-center gap-2 relative">
      <button
        onClick={handleBack}
        className="p-2 rounded-full hover:bg-gray-200 absolute -left-10 transition"
      >
        <ChevronLeft size={20} />
      </button>
      <h1 className="text-2xl font-bold">{heading}</h1>
    </div>
  )
}
