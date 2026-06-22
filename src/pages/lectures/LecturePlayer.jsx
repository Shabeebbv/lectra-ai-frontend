function LecturePlayer({ videoUrl }) {
  return (
    <div className="relative aspect-video bg-[#d8e3fb] rounded-xl overflow-hidden shadow-sm">
      {videoUrl ? (
        <video
          src={videoUrl}
          controls
          className="w-full h-full bg-black"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[#424754] text-sm">
          Video not available yet.
        </div>
      )}
    </div>
  )
}

export default LecturePlayer