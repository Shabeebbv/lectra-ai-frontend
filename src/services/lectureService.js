import api from "./api"


export const getLectureVideoUrl = async (lectureId) => {

  const response = await api.get(
    `/lectures/${lectureId}/video-url/`
  )

  return response.data.data.video_url
}