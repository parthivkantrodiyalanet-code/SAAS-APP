// src/store/apiResponse.ts
import { create } from 'zustand';
import axios from 'axios';

interface ApiResponseState {
    apiResponse: object | null;
    getApiResponse: (endpoint: string | null) => Promise<void>;
    postApiResponse?: (endpoint: string, data: object) => Promise<void>;
}

const url = import.meta.env.VITE_API_URL; // Or process.env.REACT_APP_API_URL

export const useApiResponseStore = create<ApiResponseState>((set) => ({
    apiResponse: null,

    getApiResponse: async (endpoint) => {
        if (!endpoint) {
            set({ apiResponse: null });
            return;
        }

        try {
            const res = await axios.get(`${url}${endpoint}`);
            set({ apiResponse: res.data });
        } catch (error) {
            console.error('API fetch failed:', error);
            set({ apiResponse: { error: 'Failed to fetch data' } });
        }
    },

    postApiResponse: async (endpoint, data) => {
        if (!endpoint) {
            set({ apiResponse: null });
            return;
        }

        try {
            const res = await axios.post(`${url}${endpoint}`, data);
            set({ apiResponse: res.data });
        } catch (error) {
            console.error('API post failed:', error);
            set({ apiResponse: { error: 'Failed to post data' } });
        }
    },
}));
