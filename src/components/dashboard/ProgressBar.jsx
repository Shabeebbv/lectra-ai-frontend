function ProgressBar({ percent }) {
  return (
    <div className="w-full h-2 bg-[#e7eeff] rounded-full overflow-hidden">
      <div
        className="h-full bg-[#0058be] transition-all duration-200"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}

export default ProgressBar