import api from "../../api/axios"

export const analyticsService = {
  getOverview: (days = 30) => api.get("/admin_panel/analytics/", { params: { days } }),
}