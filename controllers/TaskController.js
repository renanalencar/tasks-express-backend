const db = require("../models/TaskModel");

module.exports.getTask = async (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error fetching data");
    }
    // SQLite salva booleanos como 0/1. Vamos converter de volta para true/false
    const tasks = rows.map(row => ({
      ...row,
      completed: !!row.completed
    }));
    res.send(tasks);
  });
};

module.exports.saveTask = async (req, res) => {
  const { text, dueDate, completed } = req.body;
  const isCompleted = completed ? 1 : 0;

  db.run(
    `INSERT INTO tasks (text, dueDate, completed) VALUES (?, ?, ?)`,
    [text, dueDate, isCompleted],
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error saving data");
      }
      
      const data = { _id: this.lastID, text, dueDate, completed: !!isCompleted };
      console.log("Os dados foram salvos no banco de dados...");
      console.log(data);
      res.send(data);
    }
  );
};

module.exports.updateTask = async (req, res) => {
  const { _id, text, dueDate, completed } = req.body;
  const isCompleted = completed ? 1 : 0;

  db.run(
    `UPDATE tasks SET text = ?, dueDate = ?, completed = ? WHERE _id = ?`,
    [text, dueDate, isCompleted, _id],
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error updating data");
      }
      res.send("Os dados foram atualizados...");
    }
  );
};

module.exports.deleteTask = async (req, res) => {
  const { _id } = req.body;

  db.run(`DELETE FROM tasks WHERE _id = ?`, [_id], function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error deleting data");
    }
    res.send("Os dados foram deletados...");
  });
};
