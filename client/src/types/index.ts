
export type ID = string;

export type TaskStatus = 'todo' | 'in_progress' | 'done'

export interface TaskInput {
    title: string;
    status: TaskStatus;
}

export interface Task extends TaskInput {
    id: ID;
}

export interface User {
    id: ID;
    email: string;
}

export interface Session {
    userId: string;
    token: string;
}
