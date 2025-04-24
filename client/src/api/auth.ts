import { handleResponse } from "../utils";
import { Session } from "../types";

const API_URL = import.meta.env.VITE_API_URL + '/auth';


// Login using email and password
export async function login(email: string, password: string): Promise<Session> {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    return handleResponse<Session>(response);
}


// Register using email and password
export async function register(email: string, password: string): Promise<Session> {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    return handleResponse<Session>(response);
}


// TODO: implement logout
// Logout by passing the token as a query parameter
export async function logout(token: string): Promise<void> {
    const response = await fetch(`${API_URL}/logout?token=${token}`, {
        method: "POST",
    });
    await handleResponse(response);
}