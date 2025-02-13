/**
 * Initializes the summary page
 */
async function init() {
  try {
    await loadAllTasksApi()
    await includeHTML()
    initializeSummary()
  } catch (error) {
    console.error('Error initializing summary:', error)
  }
}

/**
 * Initializes all summary components
 */
function initializeSummary() {
  getTime()
  updateTaskMetrics()
  upCommingDeadline()
}

/**
 * Updates all task-related metrics
 */
function updateTaskMetrics() {
  writeNumberOfAllTasks()
  filterHighestPrio()
  updateTaskStateCounts()
}

/**
 * Updates the counts for all task states
 */
function updateTaskStateCounts() {
  const states = ['toDo', 'done', 'inProgress', 'awaitFeedback']
  states.forEach((state) => countStatements(state))
}

/**
 * Counts and displays tasks for a specific state
 * @param {string} state - The state to count ('toDo', 'done', etc.)
 */
function countStatements(state) {
  try {
    const count = tasks.filter((task) => task.state === state).length
    document.getElementById(`count${state}`).innerHTML = count
  } catch (error) {
    console.error(`Error counting ${state} tasks:`, error)
  }
}

/**
 * Displays the total number of tasks
 */
function writeNumberOfAllTasks() {
  document.getElementById('numberOfTasksInBoard').innerHTML = tasks?.length || 0
}

/**
 * Counts and displays tasks with urgent priority
 */
function filterHighestPrio() {
  const urgentCount = tasks.filter((task) => task.prio === 'Urgent').length
  document.getElementById('highestPrio').innerHTML = urgentCount
}

/**
 * Finds and displays the upcoming deadline
 */
function upCommingDeadline() {
  if (!tasks.length) {
    document.getElementById('deadlineH3').innerHTML = 'No tasks'
    return
  }

  const sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
  const nextDeadline = sortedTasks[0]

  const options = { month: 'long', day: 'numeric', year: 'numeric' }
  const deadlineDate = new Date(nextDeadline.dueDate)
  const formattedDate = deadlineDate.toLocaleString('en-US', options)

  document.getElementById('deadlineH3').innerHTML = formattedDate
}

/**
 * Updates greeting based on current time
 */
function getTime() {
  const hours = new Date().getHours()
  const greetings = {
    morning: { range: [2, 11], text: 'Good morning:' },
    day: { range: [11, 17], text: 'Good day:' },
    evening: { range: [17, 2], text: 'Good evening:' },
  }

  const greeting =
    Object.values(greetings).find(({ range }) => hours >= range[0] && hours < range[1]) ||
    greetings.evening

  document.getElementById('greetingsH4').innerHTML = greeting.text
}

/**
 * Changes image source on hover
 * @param {string} elementId - ID of the element
 * @param {string} newImage - Path to the new image
 */
function changeImage(elementId, newImage) {
  document.getElementById(elementId)?.setAttribute('src', newImage)
}

/**
 * Navigates to board page
 */
function loadBoardHTML() {
  setActiveSite('board')
  window.location.assign('/html/board.html')
}
