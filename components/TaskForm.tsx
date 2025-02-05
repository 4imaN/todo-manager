import { useState, useEffect } from "react"
import type { Task } from "@/type/task"

interface TaskFormProps {
  onAddTask: (newTask: Omit<Task, "id" | "completed" | "timestamp">) => void;
  onUpdateTask?: (taskId: string, updatedTask: Partial<Task>) => void;
  editingTask?: Task | null;
  onCancelEdit?: () => void;
}

export default function TaskForm({ onAddTask, onUpdateTask, editingTask, onCancelEdit }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [due_date, setDueDate] = useState("")
  const [color, setColor] = useState("#6366f1")

  // Populate fields when editingTask changes
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description)
      setDueDate(editingTask.due_date)
      setColor(editingTask.color)
    } else {
      setTitle("")
      setDescription("")
      setDueDate("")
      setColor("#6366f1")
    }
  }, [editingTask])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingTask && onUpdateTask) {
      // Update the existing task
      onUpdateTask(editingTask.id, { title, description, due_date, color })
    } else {
      // Add a new task
      onAddTask({ title, description, due_date, color })
    }

    // Clear form
    setTitle("")
    setDescription("")
    setDueDate("")
    setColor("#6366f1")

    if (onCancelEdit) onCancelEdit() // Exit edit mode
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow">
      <div>
        <label htmlFor="title" className="block mb-1 font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div>
        <label htmlFor="description" className="block mb-1 font-medium">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
          rows={3}
        ></textarea>
      </div>
      <div>
        <label htmlFor="due_date" className="block mb-1 font-medium">
          Due Date
        </label>
        <input
          type="date"
          id="due_date"
          value={due_date}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div>
        <label htmlFor="color" className="block mb-1 font-medium">
          Color Tag
        </label>
        <input
          type="color"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-1/2 h-10 border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <button
        type="submit"
        className="w-full items-center bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
      >
        {editingTask ? "Update Task" : "Add Task"}
      </button>
      {editingTask && (
        <button
          type="button"
          onClick={onCancelEdit}
          className="w-full bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors mt-2"
        >
          Cancel
        </button>
      )}
    </form>
  )
}
