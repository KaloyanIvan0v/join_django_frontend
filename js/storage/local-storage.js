/**
 * Saves a value to local storage with the specified key.
 * @param {string} key - The key under which the value should be saved.
 * @param {Object} value - The value to be saved.
 */
function saveToLocalStorage(key, value) {
  value = JSON.stringify(value)
  localStorage.setItem(key, value)
}

/**
 * Retrieves a value from local storage with the specified key.
 * @param {string} key - The key of the value to be retrieved.
 * @returns {Object|null} The parsed value from storage or null if not found.
 */
function getFromLocalStorage(key) {
  try {
    const value = localStorage.getItem(key)
    if (value === null) return null
    const valueAsJSON = JSON.parse(value)
    return valueAsJSON || null
  } catch (error) {
    console.error('Error parsing JSON from localStorage:', error)
    return null
  }
}
