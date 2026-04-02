const { Router } = require("express");
const { getTask, saveTask, updateTask, deleteTask } = require("../controllers/TaskController");

const router = Router();

router.get("/", getTask);
router.post("/save", saveTask);
router.post("/update", updateTask);
router.post("/delete", deleteTask);

module.exports = router;
