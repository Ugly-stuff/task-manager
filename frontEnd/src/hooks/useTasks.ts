import { useState, useCallback } from "react"
import type { Task } from "../types/task"
import { API } from "../services/api"

interface UseTasksReturn {
  tasks: Task[]
  loading: boolean
  error: string | null
  fetchTasks: () => Promise<void>
  addTask: (title: string, description: string) => Promise<void>
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  toggleComplete: (id: string, completed: boolean) => Promise<void>
  clearError: () => void
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => setError(null), [])

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await API.get("/tasks")
      setTasks(response.data)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch tasks"
      setError(message)
      console.error("Error fetching tasks:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const addTask = useCallback(async (title: string, description: string) => {
    setError(null)
    try {
      const response = await API.post("/tasks", { title, description })
      setTasks(prev => [response.data, ...prev])
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add task"
      setError(message)
      console.error("Error adding task:", err)
      throw err
    }
  }, [])

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    setError(null)
    try {
      const response = await API.put(`/tasks/${id}`, updates)
      setTasks(prev =>
        prev.map(task => (task._id === id ? response.data : task))
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update task"
      setError(message)
      console.error("Error updating task:", err)
      throw err
    }
  }, [])

  const toggleComplete = useCallback(async (id: string, completed: boolean) => {
    await updateTask(id, { completed: !completed })
  }, [updateTask])

  const deleteTask = useCallback(async (id: string) => {
    setError(null)
    try {
      await API.delete(`/tasks/${id}`)
      setTasks(prev => prev.filter(task => task._id !== id))
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete task"
      setError(message)
      console.error("Error deleting task:", err)
      throw err
    }
  }, [])

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    clearError
  }
}
