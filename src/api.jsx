import { dbPromise } from './db';

const API_URL = 'http://localhost:4000';

export async function syncChanges() {
  const db = await dbPromise;
  const tx = db.transaction('syncQueue', 'readwrite');
  const queue = tx.objectStore('syncQueue');

  const all = await queue.getAll();
  for (let item of all) {
    await fetch(`${API_URL}/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
  }

  await queue.clear();
}

window.addEventListener('online', syncChanges);
