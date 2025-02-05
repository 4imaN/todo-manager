import type { Task } from "@/type/task"

interface TaskListProps {
  tasks: Task[]
  onEditTask: (task: Task) => void  // Added edit function
  onUpdateTask: (taskId: string, updatedTask: Partial<Task>) => void
  onDeleteTask: (taskId: string) => void
  onToggleStatus: (taskId: string) => void
}

export default function TaskList({ tasks, onEditTask, onUpdateTask, onDeleteTask, onToggleStatus }: TaskListProps) {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="border p-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md dark:bg-gray-800 dark:border-gray-700"
          style={{ borderLeftColor: task.color, borderLeftWidth: "4px" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className={`text-xl font-semibold ${task.completed ? "line-through text-gray-500 dark:text-gray-400" : "dark:text-white"}`}>
                {task.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">{task.description}</p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                <span className="mr-4">Due: {new Date(task.due_date).toLocaleDateString()}</span>
                <span>Created: {new Date(task.timestamp).toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onToggleStatus(task.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  task.completed
                    ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {task.completed ? "Completed" : "Mark Complete"}
              </button>
              <button
                onClick={() => onEditTask(task)}  // New edit button
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium hover:bg-red-200 transition-colors dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
