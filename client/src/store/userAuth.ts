import {create} from 'zustand';

interface UserAuthState {
    isAuthenticated: boolean | null;
    setIsAuthenticated: (authStatus: boolean) => void;
}

export const useUserAuthStore = create<UserAuthState>((set) => ({
    isAuthenticated: null,
    setIsAuthenticated: (authStatus: boolean) => set({ isAuthenticated: authStatus }),
}));