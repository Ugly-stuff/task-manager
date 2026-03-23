import express from "express"
import Task from "../models/Task.js"

const router = express.Router()

// Getting all tasks
router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 })
    res.status(200).json(tasks)
  } catch (error) {
    next(error)
  }
})

// Creating taskss
router.post("/", async (req, res, next) => {
  try {
    const { title, description } = req.body

    // Validation
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Task title is required" })
    }

    const task = new Task({
      title: title.trim(),
      description: description?.trim() || ""
    })

    await task.save()
    res.status(201).json(task)
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: Object.values(error.errors).map(e => e.message).join(", ")
      })
    }
    next(error)
  }
})

// Get single task
router.get("/:id", async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }
    res.status(200).json(task)
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid task ID" })
    }
    next(error)
  }
})

// Update task
router.put("/:id", async (req, res, next) => {
  try {
    const { title, description, completed } = req.body

    // Validation
    if (title !== undefined && (title === null || title.trim() === "")) {
      return res.status(400).json({ error: "Task title cannot be empty" })
    }

    const updateData = {}
    if (title !== undefined) updateData.title = title.trim()
    if (description !== undefined) updateData.description = description.trim()
    if (completed !== undefined) updateData.completed = completed

    const task = await Task.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    })

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.status(200).json(task)
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid task ID" })
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: Object.values(error.errors).map(e => e.message).join(", ")
      })
    }
    next(error)
  }
})

// Delete task
router.delete("/:id", async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.status(200).json({ message: "Task deleted successfully" })
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid task ID" })
    }
    next(error)
  }
})

export default router