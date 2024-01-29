import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserType = {
  username: string;
  password: string;
  name: string;
  email: string;
  company: string;
  jwtToken: string;
  isAdmin: boolean;
};

interface UserState {
  user: UserType | undefined;
  setLogin: (user: UserType) => void;
  setSignout: () => void;
  isAuth:boolean,
  setIsAuth:(value:boolean)=>void
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: undefined,
      setLogin: (user: UserType) => set(() => ({user:user})),
      setSignout: () => set(() => ({user: undefined })),
      isAuth:false,
      setIsAuth: (value)=> set((state)=>({...state, isAuth:value})),
    }),
    {
      name: "user-estimator-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
