import { Db, MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
let client: MongoClient;
let db: Db;


if (!uri) {
    throw new Error('MONGODB_URI must be set');
}
if (!dbName) {
    throw new Error('DB_NAME must be set');
}


export async function connectToDatabase(): Promise<Db> {
    if (!client) {
        client = new MongoClient(uri!);
        await client.connect();
        db = client.db(dbName);
    }
    return db;
}


export async function closeDatabaseConnection(): Promise<void> {
    if (client) {
        await client.close();
        client = undefined as any;
        db = undefined as any;
    }
}
