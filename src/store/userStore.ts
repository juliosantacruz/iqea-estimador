import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserStoreType } from "../Types/UsersData";



type jwtTokens= {access:string, refresh:string}

interface UserState {
  user: UserStoreType | undefined;
  jwtTokens?: jwtTokens;
  setTokens:(tokens:jwtTokens)=> void;
  setUser: (user: UserStoreType) => void;
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
      setUser: (user: UserStoreType) => set(() => ({user:user})),
      setIsAuth: (value)=> set((state)=>({...state, isAuth:value})),
      setSignout: () => set((state) => ({...state, user: undefined, jwtTokens:undefined, isAuth:false })),
    }),
    {
      name: "user-estimator-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
