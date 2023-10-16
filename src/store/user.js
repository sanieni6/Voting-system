
export const createUserSlice = (set) => (
    
    {
    currentUser:  null,
    isLoggedIn: false,
    role:  null,
    login: async (username, password) => {
        try {
            const response = await fetch('http://54.89.73.83:5000/api/v1/auth/login', {
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
                return 'Inicio de sessión exitoso';
            } else {
                return 'Invalid email or password';
            }
        } catch (error) {
            console.error(error);
        }
    },
    logout: () => {
        set({ isLoggedIn: false });
        set({ currentUser: null });
        set({ role: null });
        return 'Goodbye';
    },
});