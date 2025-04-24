import { connectToDatabase } from '../utils/db';
import { Task, TaskIn } from '../models/task';
import { Collection, ObjectId, OptionalId } from 'mongodb';
import { HTTPError } from '../utils/tools';

interface TaskDoc extends TaskIn {
    _id: ObjectId;
}

function mapDocToTask(doc: TaskDoc): Task {
    const { _id, ...rest } = doc;
    return { id: _id.toHexString(), ...rest };
}


async function getTaskCollection(): Promise<Collection> {
    const db = await connectToDatabase();
    return db.collection('tasks');
}


export async function findTasks(): Promise<Task[]> {
    const col = await getTaskCollection();
    const docs = await col.find<TaskDoc>({}).toArray();

    return docs.map(mapDocToTask);
}


export async function createTask(task: TaskIn): Promise<Task> {
    const col = await getTaskCollection();
    const res = await col.insertOne({ ...task } as OptionalId<Task>);

    return { id: res.insertedId.toString(), ...task };
}


export async function updateTask(taskId: string, updatedTask: Partial<TaskIn>): Promise<Task> {
    let _id: ObjectId;
    try {
        _id = new ObjectId(taskId);
    } catch {
        throw new HTTPError(422, 'Invalid task ID');
    }

    const col = await getTaskCollection();
    const result = await col.findOneAndUpdate(
        { _id },
        { $set: updatedTask },
        { returnDocument: 'after' }
    );

    if (!result) {
        throw new HTTPError(404, 'Task not found');
    }

    return mapDocToTask(result as TaskDoc);
}


export async function deleteTask(taskId: string): Promise<boolean> {
    let _id: ObjectId;
    try {
        _id = new ObjectId(taskId);
    } catch {
        throw new HTTPError(422, 'Invalid task ID');
    }

    const col = await getTaskCollection();
    const res = await col.deleteOne({ _id: new ObjectId(taskId) });

    return res.deletedCount === 1;
}
