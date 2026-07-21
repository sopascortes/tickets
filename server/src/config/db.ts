import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export let db: Database;

export async function initDB() {
  db = await open({
    filename: process.env.NODE_ENV === 'test' ? ':memory:' : './dataDB/database.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      customerName TEXT NOT NULL,
      customerEmail TEXT NOT NULL,
      status TEXT CHECK(status IN ('open', 'in_progress', 'resolved')) DEFAULT 'open',
      priority TEXT CHECK(priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
      createdAt TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    )
  `);

  const count = await db.get('SELECT COUNT(*) as total FROM tickets');
  if (count.total === 0) {
    await db.run(`
      INSERT INTO tickets (title, description, customerName, customerEmail, status, priority, createdAt)
      VALUES 
      ('Unable to save payment record', 'The customer receives an error after submitting the payment form.', 'Charles Eric', 'charles.eric@example.com', 'open', 'high', '2026-06-18T10:30:00Z'),
      ('App crashes on loading screen', 'When opening the app, the application drops with an unhandled exception.', 'James Smith', 'james.smith@example.com', 'in_progress', 'high', '2026-07-01T14:20:00Z'),
      ('Typo in settings menu', 'The text reads "Prefrences" instead of "Preferences".', 'Alice Vance', 'alice@example.com', 'resolved', 'low', '2026-07-15T09:15:00Z')
    `);
  }

}
