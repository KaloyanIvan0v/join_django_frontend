const USER_API = getApiUrl(API_CONFIG.ENDPOINTS.USERS)
const TASK_API = getApiUrl(API_CONFIG.ENDPOINTS.TASKS)
const CONTACT_API = getApiUrl(API_CONFIG.ENDPOINTS.CONTACTS)

// User functions
async function loadAllUsersApi() {
  try {
    users = await getAllItems(USER_API)
  } catch (error) {
    console.error('Failed to load users:', error)
    throw error
  }
}

async function createUserApi(user) {
  try {
    return await createSingleItem(USER_API, user)
  } catch (error) {
    console.error('Failed to create user:', error)
    throw error
  }
}

async function updateUserApi(user) {
  try {
    return await setSingleItem(USER_API, user.id, user)
  } catch (error) {
    console.error('Failed to update user:', error)
    throw error
  }
}

async function deleteUserApi(user) {
  try {
    return await deleteSingleItem(USER_API, user.id)
  } catch (error) {
    console.error('Failed to delete user:', error)
    throw error
  }
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
    return await deleteSingleItem(CONTACT_API, contact)
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
