let whitList = ['login', 'register', 'legalNotice', 'privacyPolicy', 'index', 'request', 'help']

document.addEventListener('DOMContentLoaded', function () {
  routerGuard()
})

function routerGuard() {
  const currentPath = window.location.pathname.split('/').pop().split('.').shift()
  if (whitList.includes(currentPath)) {
    document.body.classList.remove('router-hidden')
    return
  } else {
    const REFRESH_API = getApiUrl(API_CONFIG.ENDPOINTS.REFRESH)
    const refreshToken = localStorage.getItem('refreshToken')
    fetch(REFRESH_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Token refresh failed')
        }
        return response.json()
      })
      .then((data) => {
        localStorage.setItem('authToken', data.access)
        document.body.classList.remove('router-hidden')
      })
      .catch(() => {
        window.location.href = '/html/login.html'
      })
  }
}
