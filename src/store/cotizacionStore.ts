import { PriceValue, ProjectData } from "@/Types/ProjectData";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";





export interface Cotizacion {
  projectData?: ProjectData;
  waterCotizacion?: PriceValue[];
  wasteWaterCotizacion?: PriceValue[]|[];
  reusoCotizacion?: PriceValue[]|[];
}

export interface CotizacionStore {
  cotizaciones:Cotizacion[],
  addCotizacion:(cotizacion:Cotizacion)=>void,
  deleteCotizacion:(id:string)=>void,
}


export const useCotizacionStore = create(
  persist<CotizacionStore>(
    (set)=>({
      cotizaciones:[],
      addCotizacion:(cotizacion:Cotizacion)=> set((state)=>({
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
