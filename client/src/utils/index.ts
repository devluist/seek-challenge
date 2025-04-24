
// Helper function for handling fetch responses
export async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        // Extract error detail if available
        const errorDetail = await response.text();
        throw new Error(errorDetail || response.statusText);
    }
    return response.json();
}

export const statusLabels: Record<string, string> = {
    "todo": "Todo",
    "in_progress": "In Progress",
    "done": "Done"
}
