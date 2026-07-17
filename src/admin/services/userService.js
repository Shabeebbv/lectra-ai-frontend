import api from "../../api/axios"

const BASE = "/admin_panel/users"

export const userService = {
  list: (params) => api.get(`${BASE}/`, { params }),

  detail: (id) => api.get(`${BASE}/${id}/`),

  update: (id, data) => api.patch(`${BASE}/${id}/`, data),

  updateRole: (id, role) => api.patch(`${BASE}/${id}/role/`, { role }),

  toggleBlock: (id) => api.patch(`${BASE}/${id}/block/`),

  delete: (id) => api.delete(`${BASE}/${id}/`),

  restore: (id) => api.patch(`${BASE}/${id}/restore/`),

  listDeleted: (params) => api.get(`${BASE}/deleted/`, { params }),
}