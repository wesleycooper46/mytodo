const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo_project",
});

app.get("/", (req, res) => res.send("Server Running!"));

app.post("/register", async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  const sql =
    "INSERT INTO Users (first_name, last_name, username, email, password_hash) VALUES (?, ?, ?, ?, ?)";
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    sql,
    [firstname, lastname, username, email, hashedPassword],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        message: "Registered",
      });
    }
  );
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM Users WHERE username = ?";

  db.query(sql, [username], async (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0 || result[0].username !== username)
      return res.status(401).json({ message: "Invalid username or password" });

    console.log("results:", result);
    const CheckHashedPassword = await bcrypt.compare(
      String(password),
      String(result[0].password_hash)
    );
    if (!CheckHashedPassword)
      return res.status(401).json({ message: "Invalid username or password" });
    console.log("UserID: ", result[0].id);
    res.json({
      message: "Login Successful!",
      user_id: result[0].id,
    });
  });
});

app.post("/addtask", (req, res) => {
  const { tasktitle, detail, priority, duedate, userid } = req.body;
  const sql =
    "INSERT INTO tasks (user_id, title, detail, priority, due_date) VALUES (?, ?, ?, ?, ?)";
  console.log(req.body);

  db.query(sql, [userid, tasktitle, detail, priority, duedate], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({
      message: "Add Task Complete!",
    });
  });
});

app.get("/alltask", (req, res) => {
  const { userid } = req.query;
  const sql = "SELECT * FROM tasks WHERE user_id = ?";

  db.query(sql, [userid], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

app.put("/statuschange", (req, res) => {
  const { status, taskid } = req.body;
  const sql = "UPDATE tasks SET status = ? WHERE id = ?";
  console.log(status, taskid);

  db.query(sql, [status, taskid], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({
      message: "Status Changed!",
    });
  });
});

app.get("/task/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM tasks WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    console.log(result[0]);
    res.json(result[0]);
  });
});

app.put("/task/edittaskid=:id", (req, res) => {
  const { title, detail, priority, duedate } = req.body;
  const { id } = req.params;
  const sql =
    "UPDATE tasks SET title = ?, detail = ?, priority = ?, due_date = ? WHERE id = ?";

  db.query(sql, [ title, detail, priority, duedate, id], (err) => {
    if (err) return res.status(500).json({error: err.message})
    console.log("Update Done")
    res.json({
      message: "Update Task Completed!"
    })
  })
});

app.listen(PORT, () => console.log("Server Running At Port 5000"));
