/**
 * Sets a value in session storage.
 * @param {string} key - The key under which to store the value.
 * @param {Object} value - The value to store.
 */
async function setSessionStorage(key, value) {
  try {
    const serializedValue = JSON.stringify(value)
    sessionStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error('Session Storage error:', error)
  }
}

/**
 * Retrieves a value from session storage by its key.
 * @param {string} key - The key of the value to be retrieved.
 * @returns {Object|null} The parsed value from session storage or null if not found.
 */
function getFromSessionStorage(key) {
  try {
    const serializedValue = sessionStorage.getItem(key)
    if (serializedValue === null) {
      return null
    }
    return JSON.parse(serializedValue)
  } catch (error) {
    console.error('Session Storage retrieval error:', error)
    return null
  }
}
