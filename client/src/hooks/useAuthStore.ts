import { create } from 'zustand';
import { Session } from '../types';
import * as authApi from '../api/auth';


interface AuthState {
    session: Session | null;
    login: (email: string, password: string) => void;
    register: (email: string, password: string) => void;
    logout: () => void;
}


export const useAuthStore = create<AuthState>((set) => ({
    session: localStorage.getItem('token') ? { token: localStorage.getItem('token')!, userId: '' } : null,

    register: async (email: string, password: string) => {
        try {
            await authApi.register(email, password);
        }
        catch (error) {
            console.error('Error registering:', error);
            throw error;
        }
    },


    login: async (email: string, password: string) => {
        try {
            const session = await authApi.login(email, password);
            localStorage.setItem('token', session.token);
            set({ session });
        }
        catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    },


    logout: async () => {
        try {
            await authApi.logout(localStorage.getItem('token')!);
        }
        catch (error) {
            console.error('Error logging out:', error);
        }
        localStorage.removeItem('token');
        set({ session: null });
    },

}));
