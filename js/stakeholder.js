function initWelcomeStakeholderPage() {
  setStartScreenImgAndBackgroundColor()
  setPwdInputEventListeners()
  setTimeout(() => {
    startScreen()
  }, 375)
}

/**
 * Starts the screen animation by adding the 'move' class to the moving image
 * and hiding the opacity layer.
 */
function startScreen() {
  document.querySelector('.moving-img').classList.add('move')
  document.querySelector('.opacity-layer').classList.add('hidden')
}

/**
 * Configures the start screen image and background color depending on the
 * window's width.
 */
function setStartScreenImgAndBackgroundColor() {
  if (window.innerWidth <= 860) {
    document.getElementById('id-logo-img').src = '../img/logo-light.svg'
    document.getElementById('id-opacity-layer').style.backgroundColor = `var(--primary-color)`
    setTimeout(() => {
      document.getElementById('id-logo-img').src = '../img/logo-dark.svg'
    }, 1200)
  }
}

/**
 * Sets up event listeners for password input interactions.
 */
function setPwdInputEventListeners() {
  document.addEventListener('click', function (event) {
    inputClicked(event.target.id)
  })
}

function navigateToStakeholder() {
  window.location.href = '../html/summery.html'
}

function navigateToLogin() {
  window.location.href = '../html/login.html'
}
