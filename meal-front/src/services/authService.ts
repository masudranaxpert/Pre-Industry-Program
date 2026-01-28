import api from './api';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    password: string;
    password2: string;
}

export interface UserData {
    user: {
        username: string;
        email: string;
    };
    manager?: boolean;
    mess_name?: string | { name: string };
    balance?: number;
    mess_meal?: number;
    mess_meal_rate?: number;
    mess_meal_cost?: number;
    deposit?: number;
    mess?: string;
    mess_id?: number;
}

export const authService = {
    login: async (credentials: LoginCredentials) => {
        const response = await api.post('/login/', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    register: async (data: RegisterData) => {
        const response = await api.post('/register/', data);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    },

    getUser: async (): Promise<UserData> => {
        const response = await api.get('/user/');
        return response.data;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },
};
