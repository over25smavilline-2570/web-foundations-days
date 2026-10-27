# QuickNotes App

QuickNotes is a minimalist, responsive note-taking web application designed to help users efficiently capture, categorize, search, and manage their daily notes. 

## Features
- **Categorized Notes**: Organize notes into Personal, Work, and Study categories with distinct visual indicators.
- **Form Validation**: Ensures notes cannot be empty or exceed the 200-character limit.
- **Dynamic Search**: Instantly filter notes in real time as you type.
- **Data Persistence**: Automatically saves and loads notes using the browser's `localStorage`.
- **Responsive Layout**: Clean card-based design with adaptive Flexbox styling for mobile and desktop screens.

## How to Run the Project Locally
1. Clone or download this repository to your local machine.
2. Open the project folder in a code editor like VS Code.
3. Open `index.html` directly in any modern web browser or use a Live Server extension.

## What I Learned
1. **DOM Manipulation & Security**: Building dynamic UIs securely using `createElement` and `textContent` to prevent cross-site scripting (XSS) vulnerabilities.
2. **State Management & Persistence**: Synchronizing application state arrays with browser `localStorage` using `JSON.stringify` and `JSON.parse`.
3. **Responsive Design**: Implementing mobile-first Flexbox layouts and CSS media queries to ensure cross-device usability.