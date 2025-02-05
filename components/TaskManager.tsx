"use client"

import { useEffect, useState } from "react"
import { useSessionContext } from "@/components/ContextProvider"
import TaskList from "./TaskList"
import TaskForm from "./TaskForm"
import type { Task } from "@/type/task"


export default function TaskManager() {
  const session = useSessionContext()
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all")
  const [sortBy, setSortBy] = useState<"dueDate" | "title">("dueDate")
  const [isLoading, setIsLoading] = useState(true)
  const [editingTask, setEditingTask] = useState<Task | null>(null) // New state for editing

  // Fetch tasks when session changes
  useEffect(() => {
    if (session) {
      fetchTasks()
    }
  }, [session])

  // Fetch tasks function
  const fetchTasks = async () => {
    if (session) {
      setIsLoading(true)
      try {
        const result = await session.query("get_all_tasks", { account_id: session.account.id })
        if (result) {
          setTasks(result as unknown as Task[])
        } else {
          setTasks([])
        }
      } catch (error) {
        console.error("Error fetching tasks:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Add a new task
  const addTask = async (newTask: Omit<Task, "id" | "completed" | "timestamp">) => {
    if (!session) return

    try {
      setIsLoading(true)
      await session.call({
        name: "create_task",
        args: [newTask.title, newTask.description, newTask.due_date, newTask.color]
      })
      playSound("/sounds/add.mp3")
      fetchTasks() // Refresh the task list
    } finally {
      setIsLoading(false) 
    }
  }

  // Update a task
  const updateTask = async (taskId: string, updatedTask: Partial<Task>) => {
    if (session) {
      try {
        await session.call({
          name: "update_task",
          args: [
            updatedTask.title || "",
            updatedTask.description || "",
            updatedTask.completed || false,
            updatedTask.due_date || "",
            updatedTask.color || "",
            taskId
          ]
        })
        if (updatedTask.completed) {
          playSound("/sounds/complete-task.mp3")
        }
        fetchTasks() // Refresh the task list
        setEditingTask(null) // Exit edit mode after updating
      } catch (error) {
        console.error("Error updating task:", error)
      }
    }
  }

  // Toggle task status
  const toggleTaskStatus = async (taskId: string) => {
    if (session) {
      try {
        await session.call({ name: "status_task", args: [taskId] })
        playSound("/sounds/completed.mp3")
        fetchTasks() 
      } catch (error) {
        console.error("Error toggling task status:", error)
      }
    }
  }

  // Delete a task
  const deleteTask = async (taskId: string) => {
    if (session) {
      try {
        await session.call({ name: "delete_task", args: [taskId] })
        fetchTasks()
        playSound("/sounds/delete.mp3")
      } catch (error) {
        console.error("Error deleting task:", error)
      }
    }
  }

  // Play sound
  const playSound = (soundUrl: string) => {
    const audio = new Audio(soundUrl)
    audio.play()
  }

  // Edit a task (set it in the editing state)
  const editTask = (task: Task) => {
    setEditingTask(task)
  }

  // Cancel editing mode
  const cancelEdit = () => {
    setEditingTask(null)
  }

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "completed") return task.completed
    if (filter === "incomplete") return !task.completed
    return true
  })

  // Sort tasks based on the selected sort option
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "dueDate") {
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
    } else {
      return a.title.localeCompare(b.title)
    }
  })

  return (
    <div className="max-w-4xl mx-auto p-4 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
      <TaskForm
        onAddTask={addTask}
        onUpdateTask={updateTask}
        editingTask={editingTask}
        onCancelEdit={cancelEdit}
      />
      <div className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <label className="mr-2">Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as "all" | "completed" | "incomplete")}
              className="border p-1 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
          <div>
            <label className="mr-2">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "dueDate" | "title")}
              className="border p-1 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="dueDate">Due Date</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
        {isLoading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading tasks...</p>
        ) : sortedTasks.length > 0 ? (
          <TaskList
            tasks={sortedTasks}
            onEditTask={editTask}  // Allow editing
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            onToggleStatus={toggleTaskStatus}
          />
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No tasks found. Add a new task to get started!</p>
        )}
      </div>
    </div>
  )
}
