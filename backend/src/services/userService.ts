import { connectToDatabase } from '../utils/db';
import { hashPassword, User, UserIn, UserOut } from '../models/user';
import { Collection } from 'mongodb';
import { HTTPError } from '../utils/tools';


async function getUserCollection(): Promise<Collection> {
    const db = await connectToDatabase();
    return db.collection('users');
}


export async function registerUser(userData: UserIn): Promise<UserOut> {
    try {
        const col = await getUserCollection();

        // Check if a user with the provided email already exists
        const existing = await col.findOne({ email: userData.email });
        if (existing) {
            throw new HTTPError(409, 'User already exists');
        }

        // Hash the password before saving
        const password = await hashPassword(userData.password);
        const res = await col.insertOne({ email: userData.email, password });

        return {
            id: res.insertedId.toString(),
            email: userData.email
        };
    } catch (err) {
        if (err instanceof HTTPError) throw err;

        throw new HTTPError(500, 'Error registering user');
    }
}


export async function findUserByEmail(email: string): Promise<User | null> {
    try {
        const col = await getUserCollection();
        const doc = await col.findOne({ email });
        if (!doc) return null;

        return {
            id: doc._id.toString(),
            email: doc.email,
            password: doc.password,
        };

    } catch {
        throw new HTTPError(500, 'Error finding user');
    }
}
