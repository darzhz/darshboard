"use client"

import { useState, useEffect } from "react"
import { CheckSquare, Square, Plus, Trash } from "lucide-react"

interface Task {
  id: number
  text: string
  completed: boolean
}
export function TaskChecklist() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("dashboard-tasks")
      return savedTasks
        ? JSON.parse(savedTasks)
        : [
            { id: 1, text: "Review dashboard design", completed: false },
            { id: 2, text: "Add new widgets", completed: true },
            { id: 3, text: "Share with team", completed: false },
          ]
    }
    return [
      { id: 1, text: "Review dashboard design", completed: false },
      { id: 2, text: "Add new widgets", completed: true },
      { id: 3, text: "Share with team", completed: false },
    ]
  })

  const [newTask, setNewTask] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    localStorage.setItem("dashboard-tasks", JSON.stringify(tasks))
  }, [tasks])

  const toggleTask = (id:number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          completed: false,
        },
      ])
      setNewTask("")
      setIsAdding(false)
    }
  }

  const removeTask = (id:number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="flex h-full flex-col">
      <h3 className="mb-2 text-sm font-medium text-gray-500">Tasks</h3>
      <div className="flex-1 overflow-auto">
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-2">
                <button onClick={() => toggleTask(task.id)}>
                  {task.completed ? (
                    <CheckSquare className="h-4 w-4 text-[#6551F3]" />
                  ) : (
                    <Square className="h-4 w-4 text-gray-400" />
                  )}
                </button>
                <span className={task.completed ? "text-gray-400 line-through" : ""}>{task.text}</span>
              </div>
              <button onClick={() => removeTask(task.id)} className="text-gray-400 hover:text-red-500">
                <Trash className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      {isAdding ? (
        <div className="mt-2 flex">
          <input
            type="text"
            className="flex-1 rounded-l border border-gray-200 px-2 py-1 text-sm focus:border-[#6551F3] focus:outline-none"
            placeholder="New task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            autoFocus
          />
          <button className="rounded-r bg-[#6551F3] px-2 py-1 text-white" onClick={addTask}>
            Add
          </button>
        </div>
      ) : (
        <button
          className="mt-2 flex items-center justify-center gap-1 rounded border border-dashed border-gray-300 py-1 text-xs text-gray-500 hover:border-[#6551F3] hover:text-[#6551F3]"
          onClick={() => setIsAdding(true)}
        >
          <Plus className="h-3 w-3" />
          Add Task
        </button>
      )}
    </div>
  )
}
