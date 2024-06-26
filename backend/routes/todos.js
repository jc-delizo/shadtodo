const express = require("express");
const {
  createTodo,
  getTodos,
  getTodo,
  deleteTodo,
  updateTodo
} = require("../controllers/todoController");
const router = express.Router();

// Get all To Dos
router.get("/", getTodos);

// Get a single To Do
router.get("/:id", getTodo);

// Post a To Do
router.post("/", createTodo);

// Delete a To Do
router.delete("/:id", deleteTodo);

router.patch("/:id", updateTodo);

module.exports = router;
