import { APIGatewayEvent } from 'aws-lambda';
import { parseTaskInput, parseTaskUpdateInput, Task } from '../models/task';
import * as taskService from '../services/taskService';
import { authorize } from '../utils/tools';
import { buildResponse, handleError } from '../utils/tools';


export const getTasks = async (event: APIGatewayEvent) => {
    try {
        await authorize(event);
        const tasks: Task[] = await taskService.findTasks();

        return buildResponse(200, tasks);

    } catch (err) {
        return handleError(err, 'Error retrieving tasks');
    }
};



export const createTask = async (event: APIGatewayEvent) => {
    try {
        await authorize(event);
        const taskData = parseTaskInput(event.body);
        const newTask: Task = await taskService.createTask(taskData);

        return buildResponse(201, newTask);

    } catch (err) {
        return handleError(err, 'Error creating task');
    }
};



export const updateTask = async (event: APIGatewayEvent) => {
    const taskId = event.pathParameters?.taskId;
    if (!taskId) {
        return buildResponse(422, { message: 'Task ID is required' });
    }

    try {
        await authorize(event);
        const taskData = parseTaskUpdateInput(event.body);
        const updated = await taskService.updateTask(taskId, taskData);

        return buildResponse(200, updated);

    } catch (err) {
        return handleError(err, 'Error updating task');
    }
};



export const deleteTask = async (event: APIGatewayEvent) => {
    const taskId = event.pathParameters?.taskId;
    if (!taskId) {
        return buildResponse(422, { message: 'Task ID is required' });
    }

    try {
        await authorize(event);
        await taskService.deleteTask(taskId);

        return buildResponse(204);

    } catch (err) {
        return handleError(err, 'Error deleting task');
    }
};
