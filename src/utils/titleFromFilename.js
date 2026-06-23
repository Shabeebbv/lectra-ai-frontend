// "neural-networks-lec-14.mp4" -> "neural networks lec 14"
export function titleFromFilename(filename) {
  if (!filename) return ""

  const withoutExtension = filename.replace(/\.[^/.]+$/, "")
  return withoutExtension.replace(/[_-]+/g, " ").trim()
}