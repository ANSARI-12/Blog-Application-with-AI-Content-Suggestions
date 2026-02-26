const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "../db/blog.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log("DB Connection Error:", err.message);
  } else {
    console.log("Connected to Sqlite Db");
  }
});
db.run(`
  CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
