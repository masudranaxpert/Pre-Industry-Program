import api from './api';

export interface Mess {
    id: number;
    name: string;
    manager: number;
}

export interface MessMember {
    id: number;
    mess: number;
    user: {
        username: string;
        email: string;
        first_name?: string;
        last_name?: string;
    };
    status: boolean; // true: Active, false: Inactive
    role: string;
}

export interface MealData {
    id?: number;
    breakfast: number;
    lunch: number;
    dinner: number;
    date: string;
    member?: number;
}

export interface DepositData {
    id?: number;
    deposit_amount: number;
    deposit_details?: string;
    date: string;
    member?: number;
}

export interface CostData {
    id?: number;
    meal_cost: number;
    meal_cost_details?: string;
    date: string;
    member?: number;
}

export interface MemberActivity {
    mess: string;
    deposit: number;
    user_deposit: number;
    mess_balance: number;
    user_balance: number;
    mess_total_meal: number;
    user_mess_meal: number;
    mess_meal_rate: number;
    user_cost: number;
}

export const messService = {
    // Mess operations
    getMessList: async (): Promise<Mess[]> => {
        const response = await api.get('/mess/');
        return response.data;
    },

    createMess: async (data: { name: string }): Promise<Mess> => {
        const response = await api.post('/mess/', data);
        return response.data;
    },

    updateMess: async (id: number, data: { name: string }): Promise<Mess> => {
        const response = await api.put(`/mess/${id}/`, data);
        return response.data;
    },

    deleteMess: async (id: number): Promise<void> => {
        await api.delete(`/mess/${id}/`);
    },

    // Member operations
    getMemberList: async (): Promise<MessMember[]> => {
        const response = await api.get('/memberlist/');
        return response.data;
    },

    addMember: async (data: { mess: number; user: number | string; status?: boolean | number }) => {
        const response = await api.post('/add-del-member/', data);
        return response.data;
    },

    updateMember: async (id: number, data: { mess: number; user: number; status?: boolean }) => {
        const response = await api.put(`/add-del-member/${id}/`, data);
        return response.data;
    },

    deleteMember: async (id: number): Promise<void> => {
        await api.delete(`/add-del-member/${id}/`);
    },

    getMemberActivity: async (): Promise<MemberActivity> => {
        const response = await api.get('/mess_activity/');
        return response.data;
    },

    // Meal operations
    getMealList: async (): Promise<MealData[]> => {
        const response = await api.get('/meal/');
        return response.data;
    },

    createMeal: async (data: MealData) => {
        const response = await api.post('/meal/', data);
        return response.data;
    },

    // Deposit operations
    getDepositList: async (): Promise<DepositData[]> => {
        const response = await api.get('/deposit/');
        return response.data;
    },

    createDeposit: async (data: DepositData) => {
        const response = await api.post('/deposit/', data);
        return response.data;
    },

    // Cost operations
    getCostList: async (): Promise<CostData[]> => {
        const response = await api.get('/cost/');
        return response.data;
    },

    createCost: async (data: CostData) => {
        const response = await api.post('/cost/', data);
        return response.data;
    },

    resetMonth: async () => {
        await api.get('/reset/');
    },
};
