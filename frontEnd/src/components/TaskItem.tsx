import { useState } from "react"
import type { Task } from "../types/task"
import "./TaskItem.css"

interface TaskItemProps {
  task: Task
  onToggleComplete: (id: string, completed: boolean) => Promise<void>
  onDeleteTask: (id: string) => Promise<void>
}

export default function TaskItem({
  task,
  onToggleComplete,
  onDeleteTask
}: TaskItemProps) {
  const [loading, setLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [error, setError] = useState("")

  const handleToggleComplete = async () => {
    setLoading(true)
    setError("")
    try {
      await onToggleComplete(task._id, task.completed)
    } catch (err) {
      setError("Failed to update task")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteConfirm = async () => {
    setLoading(true)
    setError("")
    try {
      await onDeleteTask(task._id)
    } catch (err) {
      setError("Failed to delete task")
      console.error(err)
      setShowDeleteConfirm(false)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {error && <div className="task-error">{error}</div>}

      <div className="task-header">
        <div className="task-title-section">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            disabled={loading}
            aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
            className="task-checkbox"
          />
          <div className="task-title-content">
            <h3 className="task-title">{task.title}</h3>
            {task.description && <p className="task-description">{task.description}</p>}
            <p className="task-date">Created: {formatDate(task.createdAt)}</p>
          </div>
        </div>

        <div className="task-status">
          {task.completed ? (
            <span className="status-badge completed">✓ Completed</span>
          ) : (
            <span className="status-badge pending">⏳ Pending</span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          onClick={handleToggleComplete}
          disabled={loading}
          className="action-btn toggle-btn"
          title={task.completed ? "Mark as pending" : "Mark as complete"}
        >
          {task.completed ? "✓ Mark Pending" : "☐ Complete"}
        </button>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          disabled={loading || showDeleteConfirm}
          className="action-btn delete-btn"
          title="Delete task"
        >
          🗑️ Delete
        </button>
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this task?</p>
          <div className="confirm-actions">
            <button
              onClick={handleDeleteConfirm}
              disabled={loading}
              className="confirm-delete-btn"
            >
              {loading ? "Deleting..." : "Yes, Delete"}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              disabled={loading}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}