const TASK_API = getApiUrl(API_CONFIG.ENDPOINTS.TASKS)
const CONTACT_API = getApiUrl(API_CONFIG.ENDPOINTS.CONTACTS)
const SIGNUP_API = getApiUrl(API_CONFIG.ENDPOINTS.SIGNUP)

async function registerUserApi(userData) {
  let response = await fetch(SIGNUP_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
  return handleResponse(response)
}

// Contact functions
async function loadAllContactsApi() {
  try {
    contacts = await getAllItems(CONTACT_API)
  } catch (error) {
    console.error('Failed to load contacts:', error)
    throw error
  }
}

async function createContactApi(contact) {
  try {
    return await createSingleItem(CONTACT_API, contact)
  } catch (error) {
    console.error('Failed to create contact:', error)
    throw error
  }
}

async function updateContactApi(contact) {
  try {
    return await setSingleItem(CONTACT_API, contact.id, contact)
  } catch (error) {
    console.error('Failed to update contact:', error)
    throw error
  }
}

async function deleteContactApi(contactId) {
  try {
    return await deleteSingleItem(CONTACT_API, contactId)
  } catch (error) {
    console.error('Failed to delete contact:', error)
    throw error
  }
}

// Task functions
async function loadAllTasksApi() {
  try {
    tasks = await getAllItems(TASK_API)
  } catch (error) {
    console.error('Failed to load tasks:', error)
    throw error
  }
}

async function createTaskApi(task) {
  try {
    return await createSingleItem(TASK_API, task)
  } catch (error) {
    console.error('Failed to create task:', error)
    throw error
  }
}

async function updateTaskApi(task) {
  try {
    return await setSingleItem(TASK_API, task.id, task)
  } catch (error) {
    console.error('Failed to update task:', error)
    throw error
  }
}

async function deleteTaskApi(task) {
  try {
    return await deleteSingleItem(TASK_API, task.id)
  } catch (error) {
    console.error('Failed to delete task:', error)
    throw error
  }
}
