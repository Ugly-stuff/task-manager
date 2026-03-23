import type { Task } from "../types/task"
import TaskItem from "./TaskItem"
import "./TaskList.css"

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (id: string, completed: boolean) => Promise<void>
  onDeleteTask: (id: string) => Promise<void>
}

export default function TaskList({
  tasks,
  onToggleComplete,
  onDeleteTask
}: TaskListProps) {
  const completedCount = tasks.filter(t => t.completed).length
  const pendingCount = tasks.filter(t => !t.completed).length

  if (tasks.length === 0) {
    return (
      <div className="task-list-container">
        <div className="empty-state">
          <p className="empty-icon">📝</p>
          <h2>No tasks yet</h2>
          <p>Create your first task to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="task-list-container">
      <div className="task-stats">
        <div className="stat">
          <span className="stat-number">{tasks.length}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat">
          <span className="stat-number pending">{pendingCount}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat">
          <span className="stat-number completed">{completedCount}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </div>
  )
}