/**
 * State indicating whether the checkbox is checked.
 */
let checkBoxState = false

/**
 * State indicating whether the passwords are visible (true) or hidden (false).
 * This is for multiple password fields.
 */
let pswVisibility = [false, false]
/**
 * Initializes the registration process by loading users and setting up password input event listeners.
 */
async function initRegister() {
  setPwdInputEventListeners()
  handleInputOnFocusChangeParentElementBorderColor()
  includeHTML()
}

/**
 * Validates an email address format.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email format is valid, false otherwise.
 */
function isValidEmail(email) {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // List of forbidden patterns
  const forbiddenPatterns = ['asdf@', 'qwer@', 'uiop@']

  // Check if email matches basic format
  if (!emailRegex.test(email)) {
    return false
  }

  // Check if email contains any forbidden patterns
  for (let pattern of forbiddenPatterns) {
    if (email.toLowerCase().includes(pattern.toLowerCase())) {
      setLoginFeedbackMsg('This email pattern is not allowed.', 3000)
      return false
    }
  }

  return true
}

/**
 * Registers a new user if all validation checks pass.
 */
async function register() {
  const inputEmail = email.value

  if (!isValidEmail(inputEmail)) {
    setLoginFeedbackMsg('Please enter a valid email address.', 3000)
    return
  }

  if (passwordMatch() && checkBoxState) {
    const success = await registerNewUser()
    if (success) {
      handleMsgBox()
      window.location.href = '/html/login.html?msg=You Signed Up successfully'
    }
  } else {
    handleLoginFeedbackMsg()
  }
}

/**
 * Displays feedback messages based on the registration validation.
 */
function handleLoginFeedbackMsg() {
  if (!passwordMatch()) {
    setLoginFeedbackMsg("Oops! Your passwords don't match.", 3000)
  } else if (!checkBoxState) {
    setLoginFeedbackMsg('Please accept the policy.', 3000)
  }
}

/**
 * Sets a feedback message with a specified duration in a designated field.
 *
 * @param {string} errMsg - The feedback message to display.
 * @param {number} duration - The time in milliseconds to display the message.
 */
function setLoginFeedbackMsg(errMsg, duration) {
  const feedbackField = document.getElementById('id-input-feedback')
  feedbackField.innerHTML = setLoginFeedbackMsgHtml(errMsg)

  setTimeout(() => {
    removeFeddbackMsg(feedbackField)
  }, duration)
}

/**
 * Returns the HTML content for the login feedback message.
 *
 * @param {string} errMsg - The feedback message.
 * @returns {string} The HTML content for the feedback message.
 */
function setLoginFeedbackMsgHtml(errMsg) {
  return `${errMsg}`
}

/**
 * Clears the feedback message from the specified field.
 *
 * @param {HTMLElement} divId - The field from which the feedback message will be removed.
 */
function removeFeddbackMsg(divId) {
  divId.innerHTML = ''
}

/**
 * Registers a new user, adds them to the user list, and redirects to the main page.
 */
async function registerNewUser() {
  const registerBtn = document.getElementById('registerBtn')
  registerBtn.disabled = true
  registerBtn.style.backgroundColor = 'lightgrey'
  let name = document.getElementById('names').value
  let email = document.getElementById('email').value
  let password = document.getElementById('password0').value
  let newUser = { name, email, password }
  try {
    await registerUserApi(newUser)
    resetForm()
    return true
  } catch (error) {
    if (error.status === 400) {
      setLoginFeedbackMsg('This email is already registered. Please use a different email.', 3000)
      resetRegisterButton()
      email.value = ''
      return false
    } else {
      console.error('Failed to create user:', error)
      setLoginFeedbackMsg('An error occurred while registering. Please try again.', 3000)
      resetRegisterButton()
      return false
    }
  }
}

function resetRegisterButton() {
  const registerBtn = document.getElementById('registerBtn')
  registerBtn.disabled = false
  registerBtn.style.backgroundColor = '#007bff'
}

/**
 * Resets the form fields used for user registration.
 */
function resetForm() {
  names.value = ''
  email.value = ''
  password0.value = ''
  password1.value = ''
}

/**
 * Checks if the entered passwords match.
 *
 * @returns {boolean} True if the passwords match, false otherwise.
 */
function passwordMatch() {
  const password = document.getElementById('password0').value
  const passwordConfirm = document.getElementById('password1').value
  return password === passwordConfirm
}

/**
 * Toggles the checkbox state and updates the checkbox image accordingly.
 */
function toggleCheckbox() {
  const checkBox = document.getElementById('id-checkbox-sign-up')
  if (checkBoxState === false) {
    checkBoxState = true
    checkBox.src = '/img/box-checked.png'
  } else {
    checkBoxState = false
    checkBox.src = '/img/box-unchecked.png'
  }
}

/**
 * Sets up event listeners for password input to handle clicks for visibility toggles.
 */
function setPwdInputEventListeners() {
  document.addEventListener('click', function (event) {
    inputClicked(event.target.id)
  })
}

/**
 * Handles clicks to toggle password visibility or hide the password input.
 *
 * @param {string} id - The ID of the clicked element.
 */
function inputClicked(id) {
  if (id !== 'password0-img' && id !== 'password1-img') {
    if (id === 'password0' || id === 'password1') {
      const index = id === 'password0' ? 0 : 1
      const visibilityState = pswVisibility[index]
      document.getElementById(id + '-img').src = visibilityState
        ? '/img/visibility.png'
        : '/img/visibility_off.png'
    } else {
      hidePasswordInput()
    }
  }
}

/**
 * Hides the password input by changing the type to 'password' and updating the
 * corresponding images.
 */
function hidePasswordInput() {
  document.getElementById('password0-img').src = '/img/lock.svg'
  document.getElementById('password1-img').src = '/img/lock.svg'
  document.getElementById('password0').type = 'password'
  document.getElementById('password1').type = 'password'
  pswVisibility = [false, false]
}

/**
 * Toggles the visibility of a password field.
 *
 * @param {string} id - The ID of the image representing password visibility.
 */
function togglePswVisibility(id) {
  const img = document.getElementById(id)
  const index = id === 'password0-img' ? 0 : 1
  const visibilityState = pswVisibility[index]

  img.src = visibilityState ? '/img/visibility_off.png' : '/img/visibility.png'
  document.getElementById('password' + index).type = visibilityState ? 'password' : 'text'

  pswVisibility[index] = !visibilityState
}

/**
 * Shows a message box with a shadow layer, usually indicating successful registration.
 */
function handleMsgBox() {
  const shadowLayer = document.getElementById('id-shadow-layer')
  shadowLayer.classList.remove('visibility-hidden')
  handleMsgBoxMovement()
}

/**
 * Adds the 'show' class to the message box to animate it.
 */
function handleMsgBoxMovement() {
  const msgBox = document.getElementById('id-msg-box')
  msgBox.classList.add('show')
}
