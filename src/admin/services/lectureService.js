import api from "../../api/axios"

const BASE = "/admin_panel/lectures"

export const lectureService = {
  list: (params) => api.get(`${BASE}/`, { params }),

  detail: (id) => api.get(`${BASE}/${id}/`),

  delete: (id) => api.delete(`${BASE}/${id}/`),

  retry: (id) => api.patch(`${BASE}/${id}/retry/`),
}