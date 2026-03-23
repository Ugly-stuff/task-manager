import { useState } from "react"
import "./TaskForm.css"

interface TaskFormProps {
  onAddTask: (title: string, description: string) => Promise<void>
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Validation
    if (!title.trim()) {
      setError("Task title is required")
      return
    }

    if (title.trim().length < 3) {
      setError("Task title must be at least 3 characters long")
      return
    }

    if (title.trim().length > 100) {
      setError("Task title cannot exceed 100 characters")
      return
    }

    if (description.trim().length > 500) {
      setError("Description cannot exceed 500 characters")
      return
    }

    setLoading(true)
    try {
      await onAddTask(title.trim(), description.trim())
      setTitle("")
      setDescription("")
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(
        err instanceof Error && err.message ? err.message : "Failed to add task"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>

      {error && <div className="form-error">{error}</div>}
      {success && <div className="form-success">Task added successfully! ✓</div>}

      <div className="form-group">
        <label htmlFor="title">Task Title *</label>
        <input
          id="title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          maxLength={100}
          autoFocus
        />
        <span className="char-count">{title.length}/100</span>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter task description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          maxLength={500}
          rows={3}
        />
        <span className="char-count">{description.length}/500</span>
      </div>

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  )
}