import api from "../../api/axios"

export const dashboardService = {
  getStats: () => api.get("/admin_panel/dashboard/"),
}