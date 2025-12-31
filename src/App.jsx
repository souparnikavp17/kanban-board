import { useEffect, useState } from "react";
import { saveBoard, loadBoard } from "./db";
import "./index.css";

const checkInternet = async () => {
  try {
    await fetch("https://www.google.com/favicon.ico", {
      method: "HEAD",
      mode: "no-cors",
      cache: "no-store",
    });
    return true;
  } catch {
    return false;
  }
};

const emptyBoard = {
  todo: [],
  progress: [],
  done: [],
};

export default function App() {
  const [board, setBoard] = useState(emptyBoard);
  const [dragged, setDragged] = useState(null);
  const [online, setOnline] = useState(navigator.onLine);

  

useEffect(() => {
  const updateStatus = async () => {
    const realStatus = await checkInternet();
    setOnline(realStatus);
  };

  updateStatus();

  const interval = setInterval(updateStatus, 5000);

  window.addEventListener("online", updateStatus);
  window.addEventListener("offline", () => setOnline(false));

  return () => {
    clearInterval(interval);
    window.removeEventListener("online", updateStatus);
    window.removeEventListener("offline", updateStatus);
  };
}, []);



  useEffect(() => {
    loadBoard().then((data) => data && setBoard(data));
  }, []);

  useEffect(() => {
    saveBoard(board);
  }, [board]);



  const addTask = (column) => {
    const title = prompt("Task name?");
    if (!title) return;

    setBoard({
      ...board,
      [column]: [
        ...board[column],
        { id: Date.now(), title },
      ],
    });
  };

  const deleteTask = (column, id) => {
    setBoard({
      ...board,
      [column]: board[column].filter((t) => t.id !== id),
    });
  };

  const onDragStart = (task, from) => {
    setDragged({ task, from });
  };

  const onDrop = (to) => {
    if (!dragged) return;

    setBoard((prev) => ({
      ...prev,
      [dragged.from]: prev[dragged.from].filter(
        (t) => t.id !== dragged.task.id
      ),
      [to]: [...prev[to], dragged.task],
    }));

    setDragged(null);
  };

  return (
    <div className="app">
      <h1>Kanban Board</h1>
      <p className="subtitle">Works offline too!</p>

      <div className={`status ${online ? "online" : "offline"}`}>
        {online ? "🟢 Online" : "🔴 Offline"}
      </div>

      <div className="board">
        {[
          { key: "todo", label: "TO-DO" },
          { key: "progress", label: "IN-PROGRESS" },
          { key: "done", label: "DONE" },
        ].map(({ key, label }) => (
          <div
            key={key}
            className={`column ${key}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(key)}
          >
            <h2>{label}</h2>

            {board[key].map((task) => (
              <div
                key={task.id}
                className={`task ${key}`}
                draggable
                onDragStart={() => onDragStart(task, key)}
              >
                <span>{task.title}</span>
                <button
                  className="delete"
                  onClick={() => deleteTask(key, task.id)}
                >
                  ✕
                </button>
              </div>
            ))}

            <button onClick={() => addTask(key)}>
              ＋ Add Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
