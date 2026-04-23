const API_CONFIG = {
  VERSION: 'v1',
  BASE_URL: 'http://127.0.0.1:8000/api',
  ENDPOINTS: {
    TASKS: '/tasks/',
    CONTACTS: '/contacts/',
    REFRESH: '/auth/token/refresh/',
    LOGIN: '/auth/token/',
    SIGNUP: '/auth/register/',
    GUEST: '/auth/guest/',
  },
}

function getApiUrl(endpoint) {
  return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}${endpoint}`
}

function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }
  return str.replace(/[&<>"']/g, (match) => map[match])
}
