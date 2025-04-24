import bcryptjs from 'bcryptjs';
import { HTTPError } from '../utils/tools';
import { z } from 'zod';


const UserInSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(6, { message: 'Password must be greater than 6 chars' }),
});



export type UserIn = z.infer<typeof UserInSchema>;
export interface User   extends UserIn { id: string }
export interface UserOut { id: string; email: string }
export interface Session { token: string; userId: string }



export function parseUserInput(raw: string | null): UserIn {
    const json = raw ?? '{}';
    let data: unknown;

    try {
        data = JSON.parse(json);
    } catch {
        throw new HTTPError(400, 'Invalid JSON payload');
    }

    try {
        return UserInSchema.parse(data);

    } catch (err) {
        const msg = (err as z.ZodError)
            .errors
            .map(e => e.message)
            .join('; ');

        throw new HTTPError(400, msg);
    }
}


export function extractToken(event: { headers: Record<string, string | undefined> }): string {
    const auth = event.headers.Authorization || event.headers.authorization || '';
    return auth.startsWith('Bearer ') ? auth.slice(7) : auth;
}


// bcrypt utilities
const SALT_ROUNDS = 10;

export function hashPassword(pw: string): Promise<string> {
    return bcryptjs.hash(pw, SALT_ROUNDS);
}


export function comparePasswords(pw: string, hash: string): Promise<boolean> {
    return bcryptjs.compare(pw, hash);
}
