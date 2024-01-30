import { useParams } from "react-router-dom";
import Cotizacion from "../../components/Cotizacion/Cotizacion";

export default function Details() {
  const {projectId} = useParams()

  return (
    <section className="detailsPage">
      <div className="title">
        <h1>Estimacion de Costo</h1>
      </div>

      <Cotizacion id={projectId as string} />
    </section>
  );
}
