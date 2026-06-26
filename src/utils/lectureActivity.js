// True if at least one lecture hasn't reached a final state yet.
// Used to decide whether it's still worth polling for updates.
export function hasActiveLecture(lectures) {
  return lectures.some(
    (lecture) => lecture.status === "pending" || lecture.status === "processing"
  )
}