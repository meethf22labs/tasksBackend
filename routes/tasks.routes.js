const express = require("express");
const router = express.Router();
const {getAllTasks, getTaskById, createTask, updateTask, deleteTaskById} = require("../controllers/tasks.controllers");

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask)
router.delete("/:id", deleteTaskById)

module.exports = router;