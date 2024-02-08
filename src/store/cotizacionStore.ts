import { TypeCotizacion } from "../Types/ProjectData";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


export interface CotizacionStore {
  cotizaciones:TypeCotizacion[],
  loadCotizaciones:(arrCotizaciones:TypeCotizacion[])=>void,
  addCotizacion:(cotizacion:TypeCotizacion)=>void,
  deleteCotizacion:(id:string)=>void,
}

// export const useCotizacionStore = create<CotizacionStore>(
//     (set)=>({
//       cotizaciones:[],
//       loadCotizaciones:(arrCotizaciones:TypeCotizacion[])=>set(()=>({
//         cotizaciones:arrCotizaciones
//       })),
//       addCotizacion:(cotizacion:TypeCotizacion)=> set((state)=>({
//         cotizaciones:[...state.cotizaciones, cotizacion]
//       })),
//       deleteCotizacion:(id: string)=>{
//         set((state) => ({
//           cotizaciones: state.cotizaciones.filter((element) => element.project_data?.id !== id),
//         }));
//       }
//     })
//   )



// guardado en local storage
export const useCotizacionStore = create(
  persist<CotizacionStore>(
    (set)=>({
      cotizaciones:[],
      loadCotizaciones:(arrCotizaciones:TypeCotizacion[])=>set(()=>({
        cotizaciones:arrCotizaciones
      })),
      addCotizacion:(cotizacion:TypeCotizacion)=> set((state)=>({
        cotizaciones:[...state.cotizaciones, cotizacion]
      })),
      deleteCotizacion:(id: string)=>{
        set((state) => ({
          cotizaciones: state.cotizaciones.filter((element) => element.project_data?.id !== id),
        }));
      }
    }),
    {
      name: "cotizacion-estimator-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
