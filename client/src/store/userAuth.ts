import {create} from 'zustand';

interface UserAuthState {
    isAuthenticated: boolean;
    setIsAuthenticated: (authStatus: boolean) => void;
}

export const useUserAuthStore = create<UserAuthState>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (authStatus: boolean) => set({ isAuthenticated: authStatus }),
}));