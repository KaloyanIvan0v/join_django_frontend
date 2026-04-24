/**
 * Loads the HTML task template with specific variables into the document body.
 */
function loadHtmlTaskTemplate() {
  let body = document.getElementById('body')
  let createTask = 'createTask'
  let leftButtonFunction = 'resetInputFields'
  let leftButtonText = 'Clear'

  body.innerHTML += returnHtmlTaskTemplate(createTask, leftButtonFunction, leftButtonText)
}

function addedToBoardPopUp() {
  let bgDialog = document.getElementById('bgDialog')

  bgDialog.classList.remove('vs-hidden')
  bgDialog.classList.add('align-center')
}

function toggleDropDownArrowInputField(idImage) {
  let arrow = document.getElementById(idImage)
  if (taskFormUIState.arrowToggleCheck == false) {
    arrow.src = '../img/arrow_drop_down_up.png'
    taskFormUIState.arrowToggleCheck = true
  } else {
    arrow.src = '../img/arrow_drop_down.png'
    taskFormUIState.arrowToggleCheck = false
  }
}

/**
 * Resets input fields and other variables to their default state.
 */
function resetInputFields() {
  clearAssignedSection()
  taskFormState = createCleanTaskFormState()
  taskFormUIState = createCleanUIFormState()
  taskFormUIState.checkChangeIcons = true
  renderSubTasks('none')
  currentDate()
  changePrio(1)
  changeIconsSubtask()
  clearContactsChecked()
  clearInnerHtmlInputFields()
}

/**
 * Clears the assigned section.
 *
 * @param {Event|null} event - The event object or null if called programmatically
 */
function clearAssignedSection(event) {
  if (event) {
    event.preventDefault()
  }
  let contactBox = document.getElementById('contactsField')
  if (contactBox.classList.contains('contacts-initialen')) {
    showOrHideContacts(event)
  }
  for (let index = 0; index < contacts.length; index++) {
    if (contacts[index].checkbox == true) {
      let id = contacts[index].id
      selectedUser(event, id)
    }
  }
  showOrHideContacts(event)
  taskFormUIState.arrowToggleCheck = true
}

/**
 * Clears the inner HTML content of input fields.
 */
function clearInnerHtmlInputFields() {
  let subTasks = document.getElementById('subTasks')
  let subTasksArea = document.getElementById('newSubTaskField')
  let contactsField = document.getElementById('contactsField')
  let assignedBtn = document.getElementById('inputToSearchContact')
  let categoryField = document.getElementById('categoryDropdown')

  title.value = ''
  description.value = ''
  contactsField.innerHTML = ''
  subTasks.value = ''
  subTasksArea.innerHTML = ''
  assignedBtn.innerHTML = ''
  categoryField.innerHTML = ''
  categoryField.innerHTML = 'Select task category'
}

/**
 * Sets the current date as the value of the specified date input field.
 */
function currentDate() {
  let inputDateField = document.getElementById('dueDate')
  let todayDate = new Date()
  let year = todayDate.getFullYear()
  let month = todayDate.getMonth() + 1
  let day = todayDate.getDate()

  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  let currentDate = year + '-' + month + '-' + day
  inputDateField.setAttribute('min', currentDate)
  inputDateField.value = currentDate
}

/**
 * Changes the priority of a task and updates the priority selection options.
 *
 * @param {number} i - The index of the priority to change.
 */
function changePrio(i) {
  taskFormState.currentPrio = priorities[i]['text']
  priorities[i]['isPriority'] = true
  selectPriority()
}

/**
 * Updates the priority selection options based on the priority data.
 */
function selectPriority() {
  let prioSelection = document.getElementById('prioSelection')
  prioSelection.innerHTML = ''

  for (let i = 0; i < priorities.length; i++) {
    let priority = priorities[i]
    checkBooleanForPriority(priority)
  }
}

/**
 * Checks the boolean value for priority and updates the priority selection options.
 *
 * @param {Object} priority - The priority object to check.
 * @param {HTMLElement} prioSelection - The HTML element to update with the priority options.
 */
function checkBooleanForPriority(priority) {
  if (priority['isPriority'] == false) {
    prioSelection.innerHTML += prioNormal(priority)
  } else {
    prioSelection.innerHTML += prioActive(priority)
    priority['isPriority'] = false
  }
}

/**
 * Shows or hides the task categories dropdown menu.
 *
 * @param {string} category - The selected category.
 * @param {Event} event - The click event.
 */
function showOrHideCategoriesField(event) {
  if (event) {
    event.stopPropagation()
  }
  if (taskFormUIState.openContacts) {
    closeContactsField(event)
    taskFormUIState.openContacts = false
  }
  let categoriesField = document.getElementById('categories')

  categoriesField.innerHTML = ''

  if (taskFormUIState.categoryBoolean == false) {
    taskFormUIState.openCategories = true
    for (let i = 0; i < categories.length; i++) {
      let category = categories[i]
      categoriesField.innerHTML += returnHtmlShowCategories(category)
    }
    taskFormUIState.categoryBoolean = true
    taskFormUIState.arrowToggleCheck = false
  } else {
    taskFormUIState.categoryBoolean = false
  }
  toggleDropDownArrowInputField('dropDownArrowCategory')
}

/**
 * Changes the selected category and closes the dropdown menu.
 *
 * @param {string} category - The selected category to be set.
 * @returns {void}
 */
function changeCategoryAndCloseDropdown(category) {
  let showSelectedCatageory = document.getElementById('categoryDropdown')
  let containerCategory = document.getElementById('containerCategory')
  showSelectedCatageory.innerHTML = ''
  showSelectedCatageory.innerHTML = category
  containerCategory.classList.remove('error-border')

  taskFormState.selectedCategory = category
  taskFormUIState.arrowToggleCheck = true
  showOrHideCategoriesField()
}

/**
 * Clears the checked state of all contacts.
 */
function clearContactsChecked() {
  for (let i = 0; i < contacts.length; i++) {
    contacts[i]['checkbox'] = false
  }
}

function closeContactsOrCategories(event) {
  if (taskFormUIState.openContacts) {
    closeContactsField(event)
    taskFormUIState.openContacts = false
  } else if (taskFormUIState.openCategories) {
    showOrHideCategoriesField(event)
    taskFormUIState.openCategories = false
    taskFormUIState.arrowToggleCheck = false
  }
}

/**
 * Closes the popup div and resets contacts if the arrow toggle is active.
 *
 * @param {Event} event - The click event.
 */
function closeContactsField(event) {
  if (taskFormUIState.arrowToggleCheck == true) {
    showOrHideContacts(event)
  }
}

/**
 * Shows or hides the required field indicator based on the input value.
 *
 * @param {string} idParent - The ID of the parent input field.
 * @param {string} idToggle - The ID of the element to toggle.
 */
function showOrHideRequiredField(idParent, idToggle) {
  let input = document.getElementById(idParent)
  let inputValue = input.value
  let element = document.getElementById(idToggle)

  if (inputValue.length == 0) {
    element.classList.remove('vs-hidden')
    input.classList.add('error-border')
  } else if (inputValue.length > 0) {
    element.classList.add('vs-hidden')
    input.classList.remove('error-border')
  }
}

/**
 * Shows or hides the contacts dropdown.
 *
 * @param {Event|null} event - The event object or null if called programmatically
 */
function showOrHideContacts(event) {
  if (event) {
    event.stopPropagation()
  }

  if (taskFormUIState.openCategories) {
    showOrHideCategoriesField(event)
    taskFormUIState.openCategories = false
    taskFormUIState.arrowToggleCheck = false
  }
  toggleDropDownArrowInputField('dropDownArrow')

  let contactsField = document.getElementById('contactsField')
  let inputField = document.getElementById('inputToSearchContact')

  if (taskFormUIState.arrowToggleCheck == true) {
    taskFormUIState.openContacts = true
    contactsField.classList.add('contacts-assigned')
    contactsField.classList.remove('contacts-initialen')
    renderContactsToSelect(contactsField, contacts)
  } else {
    showContactsInitial(contactsField)
    inputField.blur()
    inputField.value = ''
  }
}

/**
 * Renders contacts to the select dropdown field.
 *
 * @param {HTMLElement} contactsField - The HTML element to render contacts into.
 * @param {Array} arrayToRender - The array of contacts to render.
 */
function renderContactsToSelect(contactsField, arrayToRender) {
  contactsField.innerHTML = ''

  for (let i = 0; i < arrayToRender.length; i++) {
    let contact = arrayToRender[i]
    let contactId = arrayToRender[i]['id']
    contactsField.innerHTML += returnHtmlSingleContact(contact)
    backgroundColorInitialsById(i, contactId, 'showInitial')
    checkIfContactChecked(contactId)
  }
}

/**
 * Sets the background color of the initials area based on the specified area.
 *
 * @param {number} i - The index of the contact.
 * @param {string} whichArea - The area to set the background color for.
 */
function backgroundColorInitialsById(i, contactId, whichArea) {
  let indexOfId = contacts.findIndex((item) => item.id === contactId)

  let currentColor = contacts[indexOfId]['color']
  let bgColorCheckedUser = contactColor[currentColor]

  if (whichArea == 'showInitial') {
    let bgInitials = document.getElementById(`bgInitials${i}`)
    bgInitials.style.backgroundColor = bgColorCheckedUser
  } else {
    let bgInitials = document.getElementById(`initialArea${i}`)
    bgInitials.style.backgroundColor = bgColorCheckedUser
  }
}

/**
 * Shows the initial contacts in the contacts dropdown.
 *
 * @param {HTMLElement} contactsField - The HTML element to render initial contacts into.
 */
function showContactsInitial(contactsField) {
  contactsField.innerHTML = ''

  for (let i = 0; i < taskFormState.checkedUsers.length; i++) {
    let contact = taskFormState.checkedUsers[i]
    let contactId = taskFormState.checkedUsers[i]['id']
    let checkBoxStatus = taskFormState.checkedUsers[i]['checkbox']

    if (checkBoxStatus == true) {
      contactsField.classList.remove('contacts-assigned')
      contactsField.classList.add('contacts-initialen')
      contactsField.innerHTML += loadInitial(i, contact)
      backgroundColorInitialsById(i, contactId, 'initialArea')
    }
  }
}

/**
 * Searches for contacts based on the input value and updates the contacts dropdown accordingly.
 */
function searchContact() {
  const inputSearchContact = document.getElementById('inputToSearchContact').value.toLowerCase()
  const contactsField = document.getElementById('contactsField')

  taskFormState.findContactsAtSearch.splice(0, taskFormState.findContactsAtSearch.length)
  if (inputSearchContact.length >= APP_CONFIG.MIN_INPUT_LENGTH) {
    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i]
      filterContacts(contact, inputSearchContact)
    }
    renderContactsToSelect(contactsField, taskFormState.findContactsAtSearch)
  } else {
    renderContactsToSelect(contactsField, contacts)
  }
}

/**
 * Filters contacts based on the input search value.
 *
 * @param {Object} contact - The contact object.
 * @param {string} inputSearchContact - The search value.
 */
function filterContacts(contact, inputSearchContact) {
  if (contact.name.toLowerCase().includes(inputSearchContact)) {
    taskFormState.findContactsAtSearch.push(contact)
  }
}

/**
 * Handles user selection.
 *
 * @param {Event|null} event - The event object or null if called programmatically
 * @param {string} contactId - The ID of the selected contact
 */
function selectedUser(event, contactId) {
  if (event) {
    event.stopPropagation()
  }
  taskFormState.checkedContactsId.push(contactId)
  let indexOfId = contacts.findIndex((item) => item.id === contactId)

  let singleUser = contacts[indexOfId]
  let currentIndex = taskFormState.checkedUsers.indexOf(singleUser)
  let inputField = document.getElementById('inputToSearchContact')

  if (!taskFormState.checkedUsers.includes(singleUser, 0)) {
    taskFormState.checkedUsers.push(singleUser)
  } else {
    let indexInChecked = taskFormState.checkedContactsId.indexOf(contactId)
    taskFormState.checkedContactsId.splice(indexInChecked, 1)
    taskFormState.checkedUsers.splice(currentIndex, 1)
  }
  toggleBackgroundForCheckedUser(contactId)
  toggleCheckboxStatus(contactId)
  toggleCheckbox(contactId)
  inputField.focus()
}

/**
 * Toggles the background color for the checked user.
 *
 * @param {number} i - The index of the contact.
 */
function toggleBackgroundForCheckedUser(id) {
  let userField = document.getElementById(`userField${id}`)
  let paddingForChecked = document.getElementById(`paddingForChecked${id}`)
  userField.classList.toggle('hover-user-field')
  paddingForChecked.classList.toggle('pd-right-16')
}

/**
 * Toggles the checkbox status of the contact.
 *
 * @param {number} i - The index of the contact.
 */
function toggleCheckbox(id) {
  let checkBox = document.getElementById(`checkBox${id}`)
  let checkBoxStatus = contacts[getIndexOfElementById(id, contacts)]['checkbox']
  if (checkBoxStatus == false) {
    checkBox.src = '/img/box-unchecked.png'
  } else {
    checkBox.src = '/img/Check-button.png'
  }
}

function toggleCheckboxStatus(id) {
  let index = getIndexOfElementById(id, contacts)
  contacts[index]['checkbox'] = !contacts[index]['checkbox']
}

/**
 * Checks if the contact is checked and updates the UI accordingly.
 *
 * @param {number} i - The index of the contact.
 */
function checkIfContactChecked(id) {
  let currentContactId = id

  for (let j = 0; j < taskFormState.checkedContactsId.length; j++) {
    let checkedContact = taskFormState.checkedContactsId[j]
    if (checkedContact === currentContactId) {
      toggleBackgroundForCheckedUser(currentContactId)
      toggleCheckbox(currentContactId)
    }
  }
}
