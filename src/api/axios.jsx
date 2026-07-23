import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const access = localStorage.getItem("access")
  if (access) {
    config.headers.Authorization = `Bearer ${access}`
  }
  return config
})


let isRefreshing = false
let pendingQueue = []

function resolveQueue(newAccessToken) {
  pendingQueue.forEach(({ resolve }) => resolve(newAccessToken))
  pendingQueue = []
}

function rejectQueue(error) {
  pendingQueue.forEach(({ reject }) => reject(error))
  pendingQueue = []
}

function redirectToLogin() {
  localStorage.removeItem("access")
  localStorage.removeItem("refresh")
  window.location.href = "/"
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config: originalRequest } = error

    const isUnauthorized = response?.status === 401
    const isRefreshCall = originalRequest?.url?.includes("/users/token/refresh/")
    const alreadyRetried = originalRequest?._retry

    // Only attempt a refresh-and-retry once per request, and never for the
    // refresh call itself (that would loop forever if the refresh token is bad).
    if (!isUnauthorized || isRefreshCall || alreadyRetried) {
      return Promise.reject(error)
    }

    const refreshToken = localStorage.getItem("refresh")
    if (!refreshToken) {
      redirectToLogin()
      return Promise.reject(error)
    }

    originalRequest._retry = true

    if (isRefreshing) {
      // A refresh is already in flight — wait for it instead of firing another.
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject })
      }).then((newAccessToken) => {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      })
    }

    isRefreshing = true

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/token/refresh/`,
        { refresh: refreshToken }
      )

      localStorage.setItem("access", data.access)
      // No ROTATE_REFRESH_TOKENS on the backend, so the refresh token itself
      // doesn't change — only re-store it if the backend ever starts sending one.
      if (data.refresh) {
        localStorage.setItem("refresh", data.refresh)
      }

      resolveQueue(data.access)
      originalRequest.headers.Authorization = `Bearer ${data.access}`
      return api(originalRequest)
    } catch (refreshError) {
      rejectQueue(refreshError)
      redirectToLogin()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)

export default api