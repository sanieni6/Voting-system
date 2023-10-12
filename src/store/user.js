import { create } from 'zustand';
import axios from 'axios';

export const useAuthStore = (set) => ({
    currentUser: null,
    isLoggedIn: false,
    login: async (username, password) => {
        try {
            const response = await fetch('http://52.200.0.69:5000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                set({ isLoggedIn: true });
                set({ currentUser: await response.json()})
                
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (error) {
            console.error(error);
        }
    },
});

