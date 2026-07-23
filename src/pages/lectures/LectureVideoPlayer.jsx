import { forwardRef } from "react"


const LectureVideoPlayer = forwardRef(
  function LectureVideoPlayer(
    {
      videoUrl,
      isLoading,
      error,
    },
    ref
  ) {

    if (isLoading) {
      return (
        <div className="w-full aspect-video bg-black/5 rounded-2xl flex items-center justify-center">
          <p className="text-gray-500">
            Loading video...
          </p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="w-full aspect-video bg-red-50 rounded-2xl flex items-center justify-center">
          <p className="text-red-600">
            {error}
          </p>
        </div>
      )
    }

    if (!videoUrl) {
      return (
        <div className="w-full aspect-video bg-black/5 rounded-2xl flex items-center justify-center">
          <p className="text-gray-500">
            Video unavailable
          </p>
        </div>
      )
    }

    return (
      <div className="w-full overflow-hidden rounded-2xl bg-black">

        <video
          ref={ref}
          src={videoUrl}
          controls
          preload="metadata"
          className="w-full aspect-video"
        >
          Your browser does not support video playback.
        </video>

      </div>
    )
  }
)

export default LectureVideoPlayer