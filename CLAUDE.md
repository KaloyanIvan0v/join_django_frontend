# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Join** is a vanilla JavaScript task management web app (kanban board + contact management) with a stakeholder request system. It connects to a Django REST API backend running at `http://127.0.0.1:8000/api`.

## Commands

This is a plain HTML/CSS/JS project — no build tools, no npm. Serve the frontend with any static file server:

```bash
# VS Code Live Server extension (recommended)
# Or Python:
python3 -m http.server 8080

# Backend (separate repo):
python manage.py runserver
```

**Linting:**
- HTML: HTMLHint (configured via `.hintrc`)
- HTML formatting: djlint (configured in `.vscode/settings.json`)

## Architecture

### Storage Layer (js/storage/)

The most critical module — everything depends on it. Three-tier pattern:

```
api-storage.js       → fetch wrappers for Django REST API (GET/POST/PUT/DELETE)
application-storage.js → global in-memory state: tasks[], contacts[], users[]
local-storage.js     → localStorage helpers ("Remember me" feature)
session-storage.js   → sessionStorage helpers (auth state, current user)
config.js            → BASE_URL and ENDPOINTS constants
```

Script load order matters: `config.js` → `api-storage.js` → `application-storage.js` → feature JS.

### Page Initialization Pattern

Every page uses `onload="initXxx()"` which follows this sequence:
1. Load data from API (`loadAllTasksApi()`, `loadAllContactsApi()`)
2. Check auth (`checkIfLoggedInRouter()` — redirects if not logged in)
3. Include shared HTML templates (`includeHTML()`)
4. Render page content

### HTML Composition (W3.js includes)

Shared components injected at runtime via `w3-include-html` attribute (see `js/w3include.js`):
- `templates/header.html` — top nav
- `templates/sidebar.html` — left nav menu
- `templates/task-detail-view.html` — task popup
- `templates/add-contact.html`, `templates/edit-contact.html` — modals

### Session & Auth

Session keys in `sessionStorage`:
- `LoggedIn` — `'true'`/`'false'`
- `loggedInUser` — JSON user object
- `activeSite` — current page tracking

`localStorage` stores user for "Remember me" across sessions.

### HTML Rendering

All dynamic UI is generated via JavaScript string concatenation (no framework). Functions like `returnHtmlShowToDos()`, `setLoginFeedbackMsgHtml()` return HTML strings passed to `innerHTML`.

### Kanban Board (js/board/)

Four status columns: `statementToDo`, `statementInProgress`, `statementAwaitFeedback`, `statementDone`. Drag-and-drop handled in `drag-and-drop-functionality.js`; task status persisted via API on drop.

### CSS Organization

- `style.css` — global theme variables, buttons, utility classes
- `css/<feature>.css` — page-specific styles
- `css/board/`, `css/add_task/`, `css/contacts/` — modular per-feature
- Responsive styles in separate `*-responsive.css` / `media_query.css` files

Theme variables: `--primary-color`, `--secondary-color`, `--accent-color` (blue-gray palette).

### Key Global Variables (script.js)

```javascript
const contactColor = { /* 1–14: predefined RGB strings for avatars */ }
let tasks = []
let contacts = []
let users = []
let geLoggedInUser = null   // Note: typo in variable name (ge prefix)
```

### API Endpoints (config.js)

```javascript
BASE_URL = 'http://127.0.0.1:8000/api'
ENDPOINTS.USERS    = '/auth/users/'
ENDPOINTS.TASKS    = '/tasks/'
ENDPOINTS.CONTACTS = '/contacts/'
```
