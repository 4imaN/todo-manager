import type { Task } from "@/type/task"
import { Card } from "./ui/card"
import { CheckCircle, Clock, List, AlertCircle } from "lucide-react"

interface TaskStatsProps {
  tasks: Task[]
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = totalTasks - completedTasks
  const overdueTasks = tasks.filter((task) => {
    const dueDate = new Date(task.due_date)
    return !task.completed && dueDate < new Date()
  }).length

  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 border-[0px]">
      <StatCard label="Total Tasks" value={totalTasks} icon={List} className="bg-primary text-primary-foreground" />
      <StatCard label="Completed" value={completedTasks} icon={CheckCircle} className="bg-green-500 text-white" />
      <StatCard label="Pending" value={pendingTasks} icon={Clock} className="bg-yellow-500 text-white" />
      <StatCard label="Overdue" value={overdueTasks} icon={AlertCircle} className="bg-red-500 text-white" />
    </div>
  )
}

function StatCard({
  label,
  value,
  icon: Icon,
  className,
}: {
  label: string
  value: number
  icon: any
  className?: string
}) {
  return (
    <Card className={`${className} shadow-none`}>
      <div className="flex items-center gap-3 p-3 sm:p-4">
        <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
        <div>
          <p className="text-xs sm:text-sm font-medium">{label}</p>
          <p className="text-lg sm:text-xl font-bold">{value}</p>
        </div>
      </div>
    </Card>
  )
}
