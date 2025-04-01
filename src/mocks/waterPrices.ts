import { PriceValue } from "../Types/ProjectData";

const filtracion: PriceValue[] = [];
for (let index = 0; index < 50; index++) {
  const newElement = {
    // id:'',
    flow: 5 + index,
    unit: "m3/d",
    price: 1300 + index * 100,
    currency: "USD",
    // system:''
  };

  filtracion.push(newElement);
}

const suavisador: PriceValue[] = [];
for (let index = 0; index < 50; index++) {
  const newElement = {
    // id: '',
    flow: 5 + index,
    unit: "m3/d",
    price: 800 + index * 100,
    currency: "USD",
    // system:''

  };

  suavisador.push(newElement);
}

const osmosis: PriceValue[] = [];
for (let index = 0; index < 50; index++) {
  const newElement = {
    // id: '',
    flow: 5 + index,
    unit: "m3/d",
    price: 800 + index * 100,
    currency: "USD",
    // system:''

  };
  osmosis.push(newElement);
}

const pretratamiento: PriceValue[] = [];
for (let index = 0; index < 50; index++) {
  const newElement = {
    // id: '',
    flow: 5 + index,
    unit: "m3/d",
    price: 800 + index * 100,
    currency: "USD",
    // system:''

  };
  pretratamiento.push(newElement);
}

const lodosActivados: PriceValue[] = [];
for (let index = 0; index < 50; index++) {
  const newElement = {
    // id: '',
    flow: 5 + index,
    unit: "m3/d",
    price: 800 + index * 100,
    currency: "USD",
    // system:''

  };
  lodosActivados.push(newElement);
}

const bioFiltracion: PriceValue[] = [];
for (let index = 0; index < 50; index++) {
  const newElement = {
    // id: index,
    flow: 5 + index,
    unit: "m3/d",
    price: 800 + index * 1150,
    currency: "USD",
  };
  bioFiltracion.push(newElement);
}

const mbbr: PriceValue[] = [];
for (let index = 0; index < 50; index++) {
  const newElement = {
    // id: index,
    flow: 5 + index,
    unit: "m3/d",
    price: 800 + index * 900,
    currency: "USD",
  };
  mbbr.push(newElement);
}

const osmosisReuso: PriceValue[] = [];
for (let index = 0; index < 50; index++) {
  const newElement = {
    // id: index,
    flow: 5 + index,
    unit: "m3/d",
    price: 1200 + index * 800,
    currency: "USD",
  };
  osmosisReuso.push(newElement);
}

const ultrafiltracion: PriceValue[] = [];
for (let index = 0; index < 50; index++) {
  const newElement = {
    // id: index,
    flow: 5 + index,
    unit: "m3/d",
    price: 100 + index * 100,
    currency: "USD",
  };
  ultrafiltracion.push(newElement);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const priceList: any = {
  osmosis,
  suavisador,
  filtracion,
  pretratamiento,
  lodosActivados,
  bioFiltracion,
  mbbr,
  osmosisReuso,
  ultrafiltracion
};
