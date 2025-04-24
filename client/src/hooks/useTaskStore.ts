import { create } from 'zustand';
import { ID, Task, TaskInput } from '../types';
import * as taskApi from '../api/tasks';


interface TaskState {
    tasks: Task[]
    fetchTasks: () => Promise<void>
    addTask: (data: TaskInput) => Promise<void>
    updateTask: (task: Task) => Promise<void>
    removeTask: (id: ID) => Promise<void>
}

export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: [],

    fetchTasks: async () => {
        const tasks = await taskApi.fetchTasks()
        set({ tasks })
    },

    addTask: async (data) => {
        const newTask = await taskApi.createTask(data)
        set({ tasks: [...get().tasks, newTask] })
    },

    updateTask: async (task) => {
        const updated = await taskApi.updateTask(task)
        set({
            tasks: get().tasks.map(t => (t.id === updated.id ? updated : t))
        })
    },

    removeTask: async (id) => {
        await taskApi.deleteTask(id)
        set({
            tasks: get().tasks.filter(t => t.id !== id)
        })
    }
}))
