# Kanban Board (PWA)

This project is an Offline-First Kanban Board built as a Progressive Web App (PWA).  
It allows users to manage tasks across three columns — To-do, In-progress, and Done — and continues to work seamlessly even when the internet connection is unavailable.

All changes made while offline are stored locally and synchronized once the user reconnects to the internet.

---

## Features

- Three-column Kanban board: To-do, In-progress, Done
- Add and delete tasks in each column
- Drag and drop tasks between columns
- Color-coded tasks based on column
- Offline-first behavior using IndexedDB
- Automatic sync when back online
- Online / Offline status indicator
- Installable as a Progressive Web App
- Responsive and minimalist UI

---

## Tech Stack

### Frontend
- React
- Vite
- CSS

### PWA & Offline Support
- Service Workers
- IndexedDB
- Cache API

### Version Control
- Git
- GitHub

---

## Offline-First Architecture

- The application shell (HTML, CSS, JS) is cached using a service worker.
- Task data is stored in IndexedDB when offline.
- User actions performed offline are queued locally.
- Once the internet connection is restored, pending changes are synced automatically.

---

## How to Run Locally

### Prerequisites
- Node.js (v18 or later)
- npm

### Steps

```bash
git clone https://github.com/souparnikavp17/kanban-board.git
cd kanban-board
npm install
npm run dev
