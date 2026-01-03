#       Kanban Board (PWA)

A Kanban board application built with an **offline-first architecture**, designed to work seamlessly even when the user is completely offline. All changes made offline are synced once the network is restored.

This project was built as part of **Task 2 – Progressive Web App**.

---

## 🚀 Features

- 📋 Kanban board with 3 columns:
  - **To-do**
  - **In-progress**
  - **Completed**
- ➕ Add tasks to any column
- 🗑️ Delete tasks
- 🔀 Drag and drop tasks between columns
- 📡 Online / Offline status indicator
- 💾 Works without internet (offline-first)
- 🎨 Color-coded tasks based on column
- 🌙 Dark mode (optional UX enhancement)
- 📱 Progressive Web App (installable)

---

## 🧠 Offline-First Approach

This application follows the **Offline First** principle:

- The UI works even when the device is completely offline
- User actions are never blocked due to lack of internet
- Data consistency is maintained once connectivity is restored

### How it works:
1. When offline, task changes are stored locally
2. The app continues functioning normally
3. When back online, changes are synced to the server

---

## 🗃️ Local Storage Strategy

### IndexedDB
- Used to store tasks locally
- Persists data across refreshes
- Enables full offline usage

### Why IndexedDB?
- Asynchronous
- Designed for large structured data
- Supported by all modern browsers

---

## 🌐 Online / Offline Detection

The app listens to browser network events:
- `navigator.onLine`
- `online` / `offline` events

This allows:
- Real-time network status display
- Conditional sync logic
- Better UX during connectivity changes

---

## 🔄 Sync Strategy (Conceptual)

> Note: Basic sync logic implemented. Conflict resolution is a future improvement.

- Offline actions are queued locally
- When the app detects connectivity restoration:
  - Pending changes are sent to the backend
  - Local queue is cleared

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- HTML, CSS (custom design system)
- IndexedDB
- Service Worker (PWA)

### Tooling
- Git & GitHub
- npm

---

## ▶️ How to Run Locally

```bash
git clone https://github.com/your-username/kanban-offline-first.git
cd client
npm install
npm run dev
