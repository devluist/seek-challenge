import { ID, Task, TaskInput } from '../types';
import { handleResponse } from "../utils";

const API_URL = import.meta.env.VITE_API_URL + '/tasks';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};


export const fetchTasks = async () => {
    const response = await fetch(API_URL, {
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');

    return handleResponse<Task[]>(response);
};


export const createTask = async (task: TaskInput) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Network response was not ok');

    return handleResponse<Task>(response);
};


export const updateTask = async (task: Task) => {
    const response = await fetch(`${API_URL}/${task.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Network response was not ok');

    return handleResponse<Task>(response);
};


export const deleteTask = async (id: ID) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });

    if (!response.ok) throw new Error('Network response was not ok');
};
