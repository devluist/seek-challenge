import { z } from 'zod';
import { HTTPError } from '../utils/tools';


const TaskInSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    status: z.enum(['todo', 'in_progress', 'done'], {
        message: "Status must be one of 'todo', 'in_progress', or 'done'",
    }),
});

const TaskUpdateSchema = TaskInSchema
    .partial()
    .refine(obj => Object.keys(obj).length > 0, {
        message: 'At least one field (title or status) must be provided',
});


export type TaskUpdate = z.infer<typeof TaskUpdateSchema>;
export type TaskIn = z.infer<typeof TaskInSchema>;
export interface Task extends TaskIn { id: string }



export function parseTaskInput(raw?: string | null): TaskIn {
    const json = raw ?? '{}';
    let data: unknown;

    try {
        data = JSON.parse(json);

    } catch {
        throw new HTTPError(400, 'Invalid JSON payload');
    }

    try {
        return TaskInSchema.parse(data);

    } catch (err) {
        const msg = (err as z.ZodError)
            .errors
            .map(e => e.message)
            .join('; ');

        throw new HTTPError(400, msg);
    }
}


export function parseTaskUpdateInput(raw?: string | null): TaskUpdate {
    const json = raw ?? '{}';
    let data: unknown;

    try {
        data = JSON.parse(json);

    } catch {
        throw new HTTPError(400, 'Invalid JSON payload');
    }

    try {
        return TaskUpdateSchema.parse(data);

    } catch (err) {
        const msg = (err as z.ZodError).errors.map(e => e.message).join('; ');
        throw new HTTPError(400, msg);
    }
}