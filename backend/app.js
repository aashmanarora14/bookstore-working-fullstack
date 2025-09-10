const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

let db;

function connectWithRetry() {
  db = mysql.createConnection({
    host: process.env.DB_HOST || "db",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "bookstore"
  });

  db.connect(err => {
    if (err) {
      console.error("❌ Database not ready, retrying in 5s...", err.message);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("✅ Connected to MySQL");
    }
  });
}

connectWithRetry();

// Routes
app.get("/api/books", (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
    if (err) {
      console.error("❌ Query failed:", err.message);
      res.status(500).json({ error: "DB query failed" });
      return;
    }
    res.json(results);
  });
});

app.post("/api/books", (req, res) => {
  const { title, author } = req.body;
  db.query("INSERT INTO books (title, author) VALUES (?, ?)", [title, author], (err, result) => {
    if (err) {
      console.error("❌ Insert failed:", err.message);
      res.status(500).json({ error: "Insert failed" });
      return;
    }
    res.json({ id: result.insertId, title, author });
  });
});

app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});
