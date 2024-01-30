import { TypeCotizacion } from "../Types/ProjectData";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


export interface CotizacionStore {
  cotizaciones:TypeCotizacion[],
  addCotizacion:(cotizacion:TypeCotizacion)=>void,
  deleteCotizacion:(id:string)=>void,
}


export const useCotizacionStore = create(
  persist<CotizacionStore>(
    (set)=>({
      cotizaciones:[],
      addCotizacion:(cotizacion:TypeCotizacion)=> set((state)=>({
        cotizaciones:[...state.cotizaciones, cotizacion]
      })),
      deleteCotizacion:(id: string)=>{
        set((state) => ({
          cotizaciones: state.cotizaciones.filter((element) => element.projectData?.id !== id),
        }));
      }
    }),
    {
      name: "cotizacion-estimator-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
