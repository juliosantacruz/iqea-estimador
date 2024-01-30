export type ProjectData = {
  id:string;
  name: string;
  location: string;
  date: string;
};

export type PriceValue = {
  system?: string;
  id?: number | string;
  flow?: number;
  unit?: string;
  price?: number;
  currency?: string;
};

// export type Cotizacion = {
//   projectData: ProjectData;
//   waterCotizacion?: PriceValue[];
//   wasteWaterCotizacion?: PriceValue[];
//   reusoCotizacion?: PriceValue[];
// };

export interface TypeCotizacion {
  projectData?: ProjectData;
  waterCotizacion?: PriceValue[];
  wasteWaterCotizacion?: PriceValue[]|[];
  reusoCotizacion?: PriceValue[]|[];
}
