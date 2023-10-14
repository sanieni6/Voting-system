import { create } from 'zustand';
import axios from 'axios';

const $LOCAL_LOGGEDIN_KEY = "my_app_logged_in";
const $LOCAL_ROLE_KEY = "my_app_role";

export const useAuthStore = (set) => (
    
    {
    currentUser:  null,
    isLoggedIn: localStorage.getItem($LOCAL_LOGGEDIN_KEY) ||false,
    role: localStorage.getItem($LOCAL_ROLE_KEY) || null,
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
                const user = await response.json();
                set({ isLoggedIn: true });
                set({ currentUser: user })
                set({ role: user.role })
                localStorage.setItem($LOCAL_LOGGEDIN_KEY, true);
                localStorage.setItem($LOCAL_ROLE_KEY, user.role);
                console.log( await response);
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (error) {
            console.error(error);
        }
    },
    logout: () => {
        set({ isLoggedIn: false });
        set({ currentUser: null });
        set({ role: null });
        localStorage.removeItem($LOCAL_LOGGEDIN_KEY);
        localStorage.removeItem($LOCAL_ROLE_KEY);
    },
});