import { connectToDatabase } from '../utils/db';
import { Session } from '../models/user';
import { randomUUID } from 'crypto';


async function getSessionCollection() {
    const db = await connectToDatabase();
    return db.collection<Session>('sessions');
}


export async function findSessionByToken(token: string): Promise<Session | null> {
    const col = await getSessionCollection();
    return col.findOne({ token });
}


export async function createSession(userId: string): Promise<string> {
    const col = await getSessionCollection();
    const token = randomUUID();

    await col.insertOne({ token, userId }); // TODO: improve with expiresAt: new Date(Date.now()+TTL) */

    return token;
}


export async function deleteUserSession(token: string): Promise<boolean> {
    const col = await getSessionCollection();
    const res = await col.deleteOne({ token });

    return res.deletedCount === 1;
}
