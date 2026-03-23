import { useEffect } from "react"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import { useTasks } from "./hooks/useTasks"
import "./App.css"

function App() {
  const { tasks, loading, error, fetchTasks, addTask, deleteTask, toggleComplete, clearError } = useTasks()

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📋 Task Manager</h1>
        <p className="subtitle">Stay organized and productive</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-alert">
            <p>{error}</p>
            <button onClick={clearError} className="close-btn">✕</button>
          </div>
        )}

        <TaskForm onAddTask={addTask} />

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading tasks...</p>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onToggleComplete={toggleComplete}
            onDeleteTask={deleteTask}
          />
        )}
      </main>
    </div>
  )
}

export default App