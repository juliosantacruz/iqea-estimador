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

export interface TypeCotizacion {
  created?: string;
  user?:string|number;
  project_data?: ProjectData;
  water_cotizacion?: PriceValue[];
  waste_water_cotizacion?: PriceValue[]|[];
  reuso_cotizacion?: PriceValue[]|[];
}
