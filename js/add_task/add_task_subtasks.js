let currentPrio = 'Medium'
let idNumber = []
let categories = ['Technical Task', 'User Story']
let selectedCategory = []
let subTasks = []
let subTaskStatus = []
let checkedUsers = []
let findContactsAtSearch = []
let finishedSubTasks = []
let checkedContactsId = []
let openContacts = false
let openCategories = false
let checkChangeIcons = false
let checkBoxContact = false
let arrowToggleCheck = false
let categoryBoolean = false

async function init_add_task() {
  checkIfLoggedInRouter()
  await includeHTML()
  loadHtmlTaskTemplate()
  loadAllTasksApi()
  loadAllContactsApi()
  loadAllUsersApi()
  setTimeout(selectPriority, 200)
  setTimeout(currentDate, 200)
  handleExitImg()
}

/**
 * Creates a new task, adds it to the board, and redirects to the board page after a delay.
 */
async function createTask() {
  let containerCategory = document.getElementById('containerCategory')

  try {
    if (selectedCategory.length == 0) {
      containerCategory.classList.add('error-border')
      return
    }
    const success = await addTask()
    if (success) {
      addedToBoardPopUp()
      setTimeout(function () {
        window.location.href = 'board.html'
      }, 900)
    }
  } catch (error) {
    console.error('Error in createTask:', error)
  }
}

/**
 * Adds a new task with the provided details to the task list.
 *
 * @returns {Promise} A promise that resolves after the task is added.
 */
async function addTask(statement = 'undefined') {
  try {
    const task = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      assignedTo: checkedUsers.length === 0 ? [] : checkedUsers, // Changed -1 to empty array
      dueDate: document.getElementById('dueDate').value,
      prio: currentPrio,
      category: selectedCategory,
      subTasks: subTasks.length === 0 ? [] : subTasks, // Changed -1 to empty array
      state: statement == 'undefined' ? 'toDo' : statement,
    }

    // Validate task
    if (!validateTask(task)) {
      throw new Error('Invalid task data')
    }

    tasks.push(task)
    await createTaskApi(task)
    await loadAllTasksApi()
    return true
  } catch (error) {
    console.error('Error adding task:', error)
    return false
  }
}

function validateTask(task) {
  return (
    task.title && task.dueDate && Array.isArray(task.assignedTo) && Array.isArray(task.subTasks)
  )
}

/**
 * Changes the icons for adding or clearing subtasks and renders the subtasks accordingly.
 */
function changeIconsSubtask() {
  let addIconSubtasks = document.getElementById('addIconSubtasks')
  let subTask = document.getElementById('inputFieldSubtasks')

  addIconSubtasks.innerHTML = ''

  if (checkChangeIcons == false) {
    addIconSubtasks.innerHTML = returnHtmlCheckAndClear()
    checkChangeIcons = false
    renderSubTasks()
  } else {
    addIconSubtasks.innerHTML = returnHtmlAdd()
    checkChangeIcons = false
  }
  renderSubTasks()
}

/**
 * Adds a new subtask to the list of subtasks.
 */
function addNewSubTask() {
  let singleNewTask = document.getElementById('subTasks')
  let singleNewTaskValue = singleNewTask.value

  if (singleNewTaskValue.length >= 3) {
    subTasks.push({
      description: singleNewTaskValue,
      state: false,
    })
  }
  singleNewTask.blur()
  renderSubTasks('newSubtask')
}

/**
 * Deletes a subtask from the list of subtasks.
 *
 * @param {number} i - The index of the subtask.
 */
async function deleteSubtask(event, i) {
  event.stopPropagation()
  subTasks.splice(i, 1)
  id = getFromSessionStorage('openEditTaskId')
  task = tasks[getIndexOfElementById(id, tasks)]
  await updateTaskApi(task)
  renderSubTasks()
}

/**
 * Changes the content of a subtask.
 *
 * @param {number} i - The index of the subtask.
 */
async function changeSubtask(i) {
  let changedSubTask = document.getElementById(`inputField${i}`).value
  subTasks[i]['description'] = changedSubTask
  id = getFromSessionStorage('openEditTaskId')
  task = tasks[getIndexOfElementById(id, tasks)]
  await updateTaskApi(task)
  renderSubTasks()
}

/**
 * Renders the list of subtasks.
 *
 * @param {string} operator - The operation to perform.
 */
function renderSubTasks(operator) {
  let newTaskField = document.getElementById('newSubTaskField')
  let singleNewTask = document.getElementById('subTasks')
  singleNewTask.value = ''
  newTaskField.innerHTML = ''

  for (i = 0; i < subTasks.length; i++) {
    let newSubTask = subTasks[i]['description']
    newTaskField.innerHTML += returnHtmlNewSubtasks(newSubTask)
  }
  checkIfNewSubTask(operator)
}

/**
 * Resets the input field for adding a new subtask.
 */
function resetAddNewSubtask() {
  let subTasks = document.getElementById('subTasks')
  subTasks.value = ''
  checkChangeIcons = true
  changeIconsSubtask()
}

/**
 * Checks if a new subtask has been added.
 *
 * @param {string} operator - The operation to perform.
 */
async function checkIfNewSubTask(operator) {
  if (operator == 'newSubtask') {
    checkChangeIcons = true
    changeIconsSubtask()
  }
}

/**
 * Edits a subtask.
 *
 * @param {number} i - The index of the subtask.
 */
function editSubtask(i) {
  let subTaskField = document.getElementById(`subTaskElement${i}`)
  let subTask = subTasks[i]['description']

  subTaskField.classList.add('list-element-subtasks')
  subTaskField.classList.remove('hover-subtask')
  subTaskField.innerHTML = editSubtaskHtml(i, subTask)
  inputFocus(i)
}

/**
 * Focuses on the input field for editing a subtask.
 *
 * @param {number} i - The index of the subtask.
 */
function inputFocus(i) {
  let inputField = document.getElementById(`inputField${i}`)
  inputField.focus()
  inputField.setSelectionRange(inputField.value.length, inputField.value.length)
}
