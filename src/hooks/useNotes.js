import { useLectures } from "./useLectures"

// "Notes" aren't a separate backend resource — a note exists exactly when
// its lecture has completed processing. This derives that list from the
// same /lectures/list/ data useLectures already fetches (with polling),
// so My Notes stays in sync automatically as lectures finish.
//
// Note: LectureSerializer (used by /lectures/list/) doesn't include the
// actual notes content — only LectureDetailSerializer does. So this hook
// gives you which lectures have notes ready; NoteDetail fetches the full
// content per-lecture via useLectureDetail when you open one.
export function useNotes() {
  const { lectures, isLoading, error, refetch } = useLectures()

  const notedLectures = lectures.filter((lecture) => lecture.status === "completed")

  return { notedLectures, isLoading, error, refetch }
}