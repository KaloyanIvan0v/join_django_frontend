let logInApi = getApiUrl(API_CONFIG.ENDPOINTS.LOGIN)

let checkBoxState = false
let pswVisibility = false
/**
 * Initializes the login process by setting the start screen image, loading user data,
 * and configuring various event listeners. It also starts a timeout to initiate the start screen
 * animation and sets session storage data.
 */
async function initLogin() {
  sessionStorage.setItem('activeSite', 'summery')
  setStatusNotLogInToSessionstorage()
  loadLoginFromLocalStorage()
  handleInputOnFocusChangeParentElementBorderColor()
  includeHTML()
}

/**
 * Handles the login process by checking if the user exists and the provided password
 * is correct. If the login is successful, redirects to the summary page. Otherwise,
 * displays appropriate feedback messages.
 */
async function login() {
  try {
    const response = await getLoginRequest()
    if (response) {
      setStorageValues(response)
      resetForm()
      window.location.href = '../html/summery.html'
    } else {
      SetLoginFeedbackMsg('An error occurred during login. Please try again later.', 3000)
    }
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

async function getLoginRequest() {
  const data = {
    email: document.getElementById('email').value,
    password: document.getElementById('password0').value,
  }
  const response = await fetch(logInApi, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    return null
  }
  return response.json()
}

function setStorageValues(response) {
  localStorage.setItem('authToken', response.access)
  localStorage.setItem('refreshToken', response.refresh)
  localStorage.setItem('userName', response.username)
  localStorage.setItem('userEmail', response.email)
  sessionStorage.setItem('LoggedIn', 'true')
}

/**
 * Displays a feedback message for a specified duration.
 *
 * @param {string} errMsg - The feedback message to display.
 * @param {number} duration - The duration in milliseconds to display the message.
 */
function SetLoginFeedbackMsg(errMsg, duration) {
  const feedbackField = document.getElementById('id-input-feedback')
  feedbackField.innerHTML = errMsg

  setTimeout(() => {
    removeFeedbackMsg(feedbackField)
  }, duration)
}

/**
 * Clears the feedback message from the given element.
 *
 * @param {HTMLElement} divId - The HTML element to clear.
 */
function removeFeedbackMsg(divId) {
  divId.innerHTML = ''
}

/**
 * Logs in as a guest user and redirects to the summary page.
 */
function guestLogIn() {
  const guestUser = {
    name: 'Guest',
    email: 'guest@info.com',
    password: 'guest',
  }
  setSessionStorage('loggedInUser', guestUser)
  sessionStorage.setItem('LoggedIn', 'true')
  window.location.href = '../html/summery.html'
}

/**
 * Resets the login form inputs and disables the login button.
 */
function resetForm() {
  const loginBtn = document.getElementById('loginBtn')
  email.value = ''
  password0.value = ''
  loginBtn.disabled = true
}

/**
 * Toggles the state of a checkbox and updates its visual representation.
 */
function toggleCheckbox() {
  const checkBox = document.getElementById('id-checkbox-log-in')
  if (checkBoxState === false) {
    checkBoxState = true
    checkBox.src = '../img/box-checked.png'
  } else {
    checkBoxState = false
    checkBox.src = '../img/box-unchecked.png'
  }
}

/**
 * Handles input click events to configure password visibility.
 *
 * @param {string} id - The ID of the clicked element.
 */
function inputClicked(id) {
  configPwdVisibility(id)
}

/**
 * Configures password visibility based on the clicked element ID.
 *
 * @param {string} id - The ID of the clicked element.
 */
function configPwdVisibility(id) {
  if (id !== 'password0-img') {
    if (id === 'password0') {
      if (pswVisibility === false) {
        document.getElementById(id + '-img').src = '../img/visibility_off.png'
      } else {
        document.getElementById(id + '-img').src = '../img/visibility.png'
      }
    } else {
      hidePasswordInput()
    }
  }
}

/**
 * Hides the password input and changes its visual representation.
 */
function hidePasswordInput() {
  document.getElementById('password0-img').src = '../img/lock.svg'
  document.getElementById('password0').type = 'password'
  pswVisibility = false
}

/**
 * Toggles the visibility of the password field.
 *
 * @param {string} id - The ID of the image element representing password visibility.
 */
function togglePswVisibility(id) {
  const img = document.getElementById(id)
  if (pswVisibility === false) {
    img.src = '../img/visibility.png'
    pswVisibility = true
    document.getElementById('password0').type = 'text'
  } else {
    img.src = '../img/visibility_off.png'
    pswVisibility = false
    document.getElementById('password0').type = 'password'
  }
}

function loadLoginFromLocalStorage() {
  let email = localStorage.getItem('userEmail')
  if (email) {
    toggleCheckbox()
    document.getElementById('email').value = email
  }
}

function setStatusNotLogInToSessionstorage() {
  sessionStorage.setItem('LoggedIn', 'false')
}
