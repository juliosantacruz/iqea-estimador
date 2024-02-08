/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCotizacionStore } from "../../store/cotizacionStore";
import CardCotizacionElement from "../CardCotizacionElement/CardCotizacionElement";



export default function ListElementsCotizacion() {
  const { cotizaciones } = useCotizacionStore();

  console.log('soy cotizaciones',cotizaciones)
  return (
    <>

      {cotizaciones &&
        cotizaciones.map((element) => {
          return (
            <CardCotizacionElement
              data={element}
              key={element.project_data?.name}
            />
          );
        })}
    </>
  );
}
