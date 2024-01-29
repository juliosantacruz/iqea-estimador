import { useCotizacionStore } from "../../store/cotizacionStore";
import CardCotizacionElement from "../CardCotizacionElement/CardCotizacionElement";

export default function ListElementsCotizacion() {
  const { cotizaciones } = useCotizacionStore();

  // console.log(cotizaciones)
  return (
    <>
      {cotizaciones &&
        cotizaciones.map((element) => {
          return (
            <CardCotizacionElement
              data={element}
              key={element.projectData?.name}
            />
          );
        })}
    </>
  );
}
