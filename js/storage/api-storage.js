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

async function getAllItems(API_URL) {
  try {
    const response = await fetch(API_URL)
    const data = await handleResponse(response)
    return data || []
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

async function getSingleItem(API_URL, itemId) {
  try {
    const response = await fetch(`${API_URL}${itemId}/`)
    return await handleResponse(response)
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

async function createSingleItem(API_URL, data) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return await handleResponse(response)
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

async function setSingleItem(API_URL, itemId, data) {
  try {
    const response = await fetch(`${API_URL}${itemId}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return await handleResponse(response)
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

async function deleteSingleItem(API_URL, itemId) {
  try {
    const response = await fetch(`${API_URL}${itemId}/`, {
      method: 'DELETE',
    })
    if (response.status === 204 || response.status === 205) {
      return null // or return an empty object, or whatever is appropriate
    }
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
