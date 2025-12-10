const API_CONFIG = {
  VERSION: 'v1',
  BASE_URL: 'http://127.0.0.1:8000/api',
  ENDPOINTS: {
    USERS: '/auth/users/',
    TASKS: '/tasks/',
    CONTACTS: '/contacts/',
  },
}

function getApiUrl(endpoint) {
  return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}${endpoint}`
}
