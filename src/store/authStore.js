import { create } from 'zustand'

export const useTokenStore = create((set) => (
    {
        token : null,
        setToken : () => set({ token : localStorage.getItem("token")}),
    }
))
