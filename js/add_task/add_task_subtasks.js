//static
let categories = ['Technical Task', 'User Story']

let taskFormState = createCleanTaskFormState()
let taskFormUIState = createCleanUIFormState()

function createCleanUIFormState() {
  return {
    openContacts: false,
    openCategories: false,
    checkChangeIcons: false,
    checkBoxContact: false,
    arrowToggleCheck: false,
    categoryBoolean: false,
  }
}

function createCleanTaskFormState() {
  return {
    checkedContactsId: [],
    currentPrio: 'Medium',
    selectedCategory: [],
    subTasks: [],
    subTaskStatus: [],
    checkedUsers: [],
    findContactsAtSearch: [],
    finishedSubTasks: [],
    addTaskMode: true,
  }
}

async function initAddTask() {
  taskFormState.addTaskMode = true
  await includeHTML()
  loadHtmlTaskTemplate()
  await loadAllTasksApi()
  await loadAllContactsApi()
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
    if (taskFormState.selectedCategory.length == 0) {
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
async function addTask(statement) {
  try {
    const task = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      assignedTo: taskFormState.checkedUsers.length === 0 ? [] : taskFormState.checkedUsers,
      dueDate: document.getElementById('dueDate').value,
      prio: taskFormState.currentPrio,
      category: taskFormState.selectedCategory,
      subTasks: taskFormState.subTasks.length === 0 ? [] : taskFormState.subTasks,
      state: statement ?? TASK_STATUS.TODO,
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
  let addIconSubtasks = document.getElementById('addIconSubtasksWrapper')
  let subTask = document.getElementById('inputFieldSubtasks')

  addIconSubtasks.innerHTML = ''

  if (taskFormUIState.checkChangeIcons == false) {
    addIconSubtasks.innerHTML = returnHtmlCheckAndClear()
    taskFormUIState.checkChangeIcons = false
    renderSubTasks()
  } else {
    addIconSubtasks.innerHTML = returnHtmlAdd()
    taskFormUIState.checkChangeIcons = false
  }
  renderSubTasks()
}

/**
 * Adds a new subtask to the list of subtasks.
 */
function addNewSubTask() {
  let singleNewTask = document.getElementById('subTasks')
  let singleNewTaskValue = singleNewTask.value

  if (singleNewTaskValue.length >= APP_CONFIG.MIN_INPUT_LENGTH) {
    taskFormState.subTasks.push({
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
  taskFormState.subTasks.splice(i, 1)
  const id = getFromSessionStorage('openEditTaskId')
  const task = tasks[getIndexOfElementById(id, tasks)]
  if (!taskFormState.addTaskMode) await updateTaskApi(task)
  renderSubTasks()
}

/**
 * Changes the content of a subtask.
 *
 * @param {number} i - The index of the subtask.
 */
async function changeSubtask(i) {
  let changedSubTask = document.getElementById(`inputField${i}`).value
  taskFormState.subTasks[i]['description'] = changedSubTask
  const id = getFromSessionStorage('openEditTaskId')
  const task = tasks[getIndexOfElementById(id, tasks)]
  if (!taskFormState.addTaskMode) await updateTaskApi(task)
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

  for (let i = 0; i < taskFormState.subTasks.length; i++) {
    let newSubTask = taskFormState.subTasks[i]['description']
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
  taskFormUIState.checkChangeIcons = true
  changeIconsSubtask()
}

/**
 * Checks if a new subtask has been added.
 *
 * @param {string} operator - The operation to perform.
 */
async function checkIfNewSubTask(operator) {
  if (operator == 'newSubtask') {
    taskFormUIState.checkChangeIcons = true
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
  let subTask = taskFormState.subTasks[i]['description']

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
