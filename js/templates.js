let x = true

/**
 * This function is used to open and close the Popup at the header.
 *
 */
function addDNone() {
  //Open Popup (Head).
  if (x == true) {
    document.getElementById('popup').classList.replace('dNone', 'popup')
    x = false
  } else {
    document.getElementById('popup').classList.replace('popup', 'dNone')
    x = true
  }
}

/**
 * This function load the name of the loggedin user, executes the function setAbbreviationToUserIcon() and render the fullname
 * to greetingssection on summery.html.
 *
 */
function loadFirstLettersFromSessionStorage() {
  let loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))
  let activeSite = sessionStorage.getItem('activeSite')

  if (loggedInUser) {
    let nameOfUser = loggedInUser.name
    let firstAndLastName = nameOfUser.split(' ')
    let firstName = firstAndLastName[0]
    let lastName = firstAndLastName.length > 1 ? firstAndLastName[1] : '' // Fallback wenn kein Nachname

    setAbbreviationToUserIcon(firstName, lastName)

    if (window.innerWidth > 1440) {
      if (activeSite == 'summery') {
        document.getElementById('name').innerHTML = lastName
          ? `${firstName} ${lastName}`
          : firstName
      }
    }
  } else {
    document.getElementById('abbreviation').innerHTML = 'G'
  }
}

/**
 * This function render the initials to Header Popupbutton.
 *
 * @param {sting} firstName - Firstname of function loadFirstLettersFromSessionStorage().
 * @param {sting} lastName - Lastname of function loadFirstLettersFromSessionStorage().
 */
function setAbbreviationToUserIcon(firstName, lastName) {
  try {
    const abbreviation = document.getElementById('abbreviation')
    if (abbreviation) {
      const firstInitial = firstName ? firstName[0].toUpperCase() : ''
      const lastInitial = lastName ? lastName[0].toUpperCase() : ''
      abbreviation.innerHTML = lastInitial ? `${firstInitial}${lastInitial}` : firstInitial
    }
  } catch (error) {
    console.error('Error setting abbreviation:', error)
    document.getElementById('abbreviation').innerHTML = firstName[0].toUpperCase()
  }
}

/**
 * This function clears the sessionstorage at logout.
 *
 */
function storageClear() {
  sessionStorage.clear()
}

/**
 * This function set the actual site to sessionstorage and executes function goToNextSite().
 *
 * @param {string} siteName - The name of site in sessionstorage.
 */
function setActiveSite(siteName) {
  sessionStorage.setItem('activeSite', siteName)
  goToNextSite(siteName)
}

/**
 * This function passes to active site.
 *
 * @param {string} sitename - The name of site in sessionstorage.
 */
function goToNextSite(sitename) {
  window.location.assign(`/html/${sitename}.html`)
}

/**
 * This function hightlight the active site on sidebar.
 */
function changeBackgroundColorOfLink() {
  let activeSite = sessionStorage.getItem('activeSite')
  if (!activeSite) {
    console.warn('No active site found in session storage')
    return
  }

  const element = document.getElementById(`${activeSite}`)
  if (!element) {
    console.warn(`Element with ID "${activeSite}" not found`)
    return
  }

  if (activeSite === 'privacyPolicy' || activeSite === 'legalNotice') {
    element.classList.add('textColor')
  } else {
    element.classList.add('background')
  }
}
