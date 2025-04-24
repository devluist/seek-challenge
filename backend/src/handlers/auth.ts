import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { comparePasswords, extractToken, parseUserInput, UserIn } from '../models/user';
import { registerUser, findUserByEmail } from '../services/userService';
import { createSession, deleteUserSession } from '../services/sessionService';
import { buildResponse, handleError, HTTPError } from '../utils/tools';


export const register = async (
    event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const userReg: UserIn = parseUserInput(event.body);
        const newUser = await registerUser(userReg);

        return buildResponse(201, {
            message: 'Registration successful',
            user_id: newUser.id,
        });

    } catch (err) {
        return handleError(err, 'Error creating user');
    }
};


export const login = async (
    event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const payload: UserIn = parseUserInput(event.body);
        const user = await findUserByEmail(payload.email);
        if (!user || !user.password) throw new HTTPError(422, 'Check input data');

        const valid = await comparePasswords(
            payload.password,
            user.password
        );

        if (!valid) throw new HTTPError(401, 'Invalid credentials');

        const token = await createSession(user.id);

        return buildResponse(200, {
            message: 'Login successful',
            token,
        });

    } catch (err) {
        return handleError(err, 'Login failed');
    }
};


export const logout = async (
    event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const token = extractToken(event);
        if (!token) throw new HTTPError(422, 'Token required');
        await deleteUserSession(token);

        return buildResponse(204);

    } catch (err) {
        return handleError(err, 'Error logging out');
    }
};
