// src/store/apiResponse.ts
import { create } from 'zustand';
import axios, { AxiosError } from 'axios';

interface ApiResponseState {
  apiResponse: object | null;
  getApiResponse: (endpoint: string | null) => Promise<any>;
  postApiResponse: (endpoint: string, data: object) => Promise<any>;
  patchApiResponse: (endpoint: string, data: object) => Promise<any>;
  deleteApiResponse: (endpoint: string) => Promise<any>;
}

const url = import.meta.env.VITE_API_URL; // Make sure this spelling matches exactly

export const useApiResponseStore = create<ApiResponseState>((set) => ({
  apiResponse: null,

  getApiResponse: async (endpoint) => {
    if (!endpoint) {
      set({ apiResponse: null });
      return null;
    }

    try {
      const res = await axios.get(`${url}${endpoint}`,{ withCredentials: true });
      set({ apiResponse: res.data });
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('API GET failed:', err);
      set({ apiResponse: { error: 'Failed to fetch data', details: err.message } });
      return { error: 'Failed to fetch data', details: err.message };
    }
  },

  postApiResponse: async (endpoint, data) => {
    if (!endpoint) {
      set({ apiResponse: null });
      return null;
    }

    try {
      console.log("Posting to:", `${url}${endpoint}`, "with data:", data);
      const res = await axios.post(`${url}${endpoint}`, data,{ withCredentials: true });
      console.log("Response received:", res.data);
      set({ apiResponse: res.data });
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('API POST failed:', err);
      set({ apiResponse: { error: 'Failed to post data', details: err.message } });
      return { error: 'Failed to post data', details: err.message };
    }
  },

  patchApiResponse: async (endpoint, data) => {
    if (!endpoint) {
      set({ apiResponse: null });
      return null;
    }

    try {
      const res = await axios.patch(`${url}${endpoint}`, data,{ withCredentials: true });
      set({ apiResponse: res.data });
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('API PATCH failed:', err);
      set({ apiResponse: { error: 'Failed to patch data', details: err.message } });
      return { error: 'Failed to patch data', details: err.message };
    }
  },

  deleteApiResponse: async (endpoint) => {
    if (!endpoint) {
      set({ apiResponse: null });
      return null;
    }

    try {
      const res = await axios.delete(`${url}${endpoint}`,{ withCredentials: true });
      set({ apiResponse: res.data });
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('API DELETE failed:', err);
      set({ apiResponse: { error: 'Failed to delete data', details: err.message } });
      return { error: 'Failed to delete data', details: err.message };
    }
  },
}));
