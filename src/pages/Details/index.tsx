import { useParams } from "react-router-dom";
import Cotizacion from "../../components/Cotizacion/Cotizacion";
import { useCotizacionStore } from "../../store/cotizacionStore";

export default function Details() {
  const { projectId } = useParams();
  const { cotizaciones } = useCotizacionStore();

  const data = cotizaciones.find(
    cotizacion => {
      const cotizacionID = cotizacion.project_data?.id.toString()
      if(cotizacionID === projectId) return cotizacion
    }
    );

  return (
    <section className="detailsPage">
      <div className="title">
        <h1>Estimacion de Costo</h1>
      </div>

      {
        data&&
        <Cotizacion leData={data} />

      }

    </section>
  );
}
