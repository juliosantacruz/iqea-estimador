import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserType = {
  userId:string;
  username: string;
  email: string;
  company: string;
  isAdmin: boolean;
};

type jwtTokens= {access:string, refresh:string}

interface UserState {
  user: UserType | undefined;
  jwtTokens?: jwtTokens;
  setTokens:(tokens:jwtTokens)=> void;
  setUser: (user: UserType) => void;
  setSignout: () => void;
  isAuth:boolean,
  setIsAuth:(value:boolean)=>void
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: undefined,
      jwtTokens: undefined,
      isAuth:false,
      setTokens:(tokens:jwtTokens)=>set((state)=>({...state, jwtTokens:tokens})),
      setUser: (user: UserType) => set(() => ({user:user})),
      setIsAuth: (value)=> set((state)=>({...state, isAuth:value})),
      setSignout: () => set((state) => ({...state, user: undefined, jwtTokens:undefined, isAuth:false })),
    }),
    {
      name: "user-estimator-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
