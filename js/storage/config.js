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

const TASK_STATUS = {
  TODO: 'toDo',
  IN_PROGRESS: 'inProgress',
  AWAIT_FEEDBACK: 'awaitFeedback',
  DONE: 'done',
}

const APP_CONFIG = {
  MIN_INPUT_LENGTH: 3,
  MAX_CONTACT_PREVIEW: 3,
  COLOR_COUNT: 14,
}

function getApiUrl(endpoint) {
  return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}${endpoint}`
}

function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }
  return str.replace(/[&<>"']/g, (match) => map[match])
}
