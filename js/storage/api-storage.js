const REFRESH_API = getApiUrl(API_CONFIG.ENDPOINTS.REFRESH)

function getAuthHeader() {
  const token = localStorage.getItem('authToken')
  if (token) {
    return { Authorization: `Bearer ${token}` }
  } else {
    return {}
  }
}

function isAccessExpired() {
  const token = localStorage.getItem('authToken')
  if (!token) {
    return null
  }
  const payload = JSON.parse(atob(token.split('.')[1]))
  const currentTime = Math.floor(Date.now() / 1000)
  return payload.exp < currentTime + 60
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) {
    return null
  }
  try {
    let response = await fetch(REFRESH_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    })
    if (!response.ok) {
      throw createApiError(`HTTP error! status: ${response.status}`, response.status)
    }
    let data = await response.json()

    localStorage.setItem('authToken', data.access)
    return data.access
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

function createApiError(message, status) {
  const error = new Error(message)
  error.status = status
  return error
}

async function handleResponse(response) {
  if (!response.ok) {
    throw createApiError(`HTTP error! status: ${response.status}`, response.status)
  }
  return await response.json()
}

async function handleJwtRefresh() {
  if (isAccessExpired()) {
    try {
      await refreshAccessToken()
    } catch (error) {
      console.error('Failed to refresh access token:', error)
      logOut()
    }
  }
}

async function getAllItems(API_URL) {
  await handleJwtRefresh()
  try {
    const response = await fetch(API_URL, {
      headers: getAuthHeader(),
    })
    const data = await handleResponse(response)
    return data || []
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

async function getSingleItem(API_URL, itemId) {
  await handleJwtRefresh()
  try {
    const response = await fetch(`${API_URL}${itemId}/`, {
      headers: getAuthHeader(),
    })
    return await handleResponse(response)
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

async function createSingleItem(API_URL, data) {
  await handleJwtRefresh()
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    })
    return await handleResponse(response)
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

async function setSingleItem(API_URL, itemId, data) {
  await handleJwtRefresh()
  try {
    const response = await fetch(`${API_URL}${itemId}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    })
    return await handleResponse(response)
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

async function deleteSingleItem(API_URL, itemId) {
  await handleJwtRefresh()
  try {
    const response = await fetch(`${API_URL}${itemId}/`, {
      headers: getAuthHeader(),
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    if (response.status === 204 || response.status === 205) {
      return null // or return an empty object, or whatever is appropriate
    }
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
