import { Clock3 } from "lucide-react"

function EmptyTimeline() {
  return (
    <div className="py-20 text-center">

      <Clock3
        className="mx-auto mb-5 text-gray-400"
        size={50}
      />

      <h3 className="text-xl font-semibold">
        No Timelines Found
      </h3>

      <p className="text-gray-500 mt-2">
        Complete a lecture to generate its timeline.
      </p>

    </div>
  )
}

export default EmptyTimeline