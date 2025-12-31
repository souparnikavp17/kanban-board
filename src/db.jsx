import { openDB } from "idb";

export const dbPromise = openDB("kanban-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("board")) {
      db.createObjectStore("board");
    }
  },
});


export async function saveBoard(board) {
  const db = await dbPromise;
  await db.put("board", board, "kanban");
}


export async function loadBoard() {
  const db = await dbPromise;
  return (await db.get("board", "kanban")) || null;
}
