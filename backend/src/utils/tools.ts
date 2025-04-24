import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { extractToken } from "../models/user";
import { findSessionByToken } from "../services/sessionService";


export class HTTPError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

// Session authorization guard
export async function authorize(event: APIGatewayEvent): Promise<string> {
    const token = extractToken(event);
    if (!token)
        throw new HTTPError(401, 'Unauthorized');

    const session = await findSessionByToken(token);
    if (!session)
        throw new HTTPError(401, 'Unauthorized');

    return session.userId;
}


// Centralize responses
export const buildResponse = (
    statusCode: number,
    body?: Record<string, any>
): APIGatewayProxyResult => ({
    statusCode,
    headers: {
        'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : '',
})


//Convert any thrown value into a standardized APIGatewayProxyResult
export function handleError(err: unknown, defaultMsg: string): APIGatewayProxyResult {
    if (err instanceof HTTPError) {
        return buildResponse(err.statusCode, { message: err.message });
    }

    // unexpected err
    console.error(err);
    return buildResponse(500, { message: defaultMsg });
}
