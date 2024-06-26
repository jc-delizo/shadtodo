const { default: mongoose } = require("mongoose");
const Todo = require("../models/todoModel");

// Get all todos
const getTodos = async (req, res) => {
  const todos = await Todo.find({}).sort({ createdAt: -1 });

  res.status(200).json(todos);
};

// Get a single todo
const getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Task" });
  }

  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({ error: "No such task" });
  }

  res.status(200).json(todo);
};

// Create new todo
const createTodo = async (req, res) => {
  const { title, description, status, dueDate, priority } = req.body;

  // add todo to db
  try {
    const todo = await Todo.create({
      title,
      description,
      status,
      dueDate,
      priority,
    });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Task" });
  }

  const todo = await Todo.findOneAndDelete({_id: id})

  if (!todo) {
    return res.status(404).json({ error: "No such task" });
  }

  res.status(200).json(todo)
}

// Update a todo
const updateTodo = async (req, res) => {

  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Task" });
  }

  const todo = await Todo.findOneAndUpdate({_id: id}, {
    ...req.body
  }, { new: true })

  if (!todo) {
    return res.status(404).json({ error: "No such task" });
  }

  res.status(200).json(todo)
}

module.exports = {
  createTodo,
  getTodo,
  getTodos,
  deleteTodo,
  updateTodo
};
