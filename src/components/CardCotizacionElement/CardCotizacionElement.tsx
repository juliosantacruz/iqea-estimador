import React from "react";
import "./CardCotizacionElement.scss";
import { useCotizacionStore } from "../../store/cotizacionStore";
import { useNavigate } from "react-router-dom";
import { TypeCotizacion } from "../../Types/ProjectData";


type CardProps = {
  data: TypeCotizacion;
};



export default function CardCotizacionElement({ data }: CardProps) {
  const navigate = useNavigate();

  const {deleteCotizacion}= useCotizacionStore()
  const {
    project_data,
    water_cotizacion,
    waste_water_cotizacion,
    reuso_cotizacion,
  } = data;


  const handleDelete=()=>{
    deleteCotizacion(project_data?.id as string)
  }

  const handleDetalle=(id:string)=>{
    navigate(`detalle/${id}`)
    console.log(id)
  }
  return (
    <article className="listElement">
      <div className="listContent">
        <div className="listHeader">
          <h3>{project_data?.name?.toUpperCase()}</h3>
          <p className="date">Fecha de creacion: {' '} <span>12-02-2024</span> </p>
          <p className="date">Ubicacion de proyecto: {" "}<span>Sonora</span> </p>

        </div>
        <div className="listFooter">
          <p>Sistemas Cotizados:</p>
          <ul>
            {water_cotizacion &&
              water_cotizacion.map((element) => {
                return (
                  <li
                    key={element.id}
                    style={{ backgroundColor: "rgb(160, 0, 147)" }}
                  >
                    {element.system}
                  </li>
                );
              })}
            {waste_water_cotizacion &&
              waste_water_cotizacion.map((element) => {
                return (
                  <li
                    key={element.id}
                    style={{ backgroundColor: "rgb(83, 0, 160)" }}
                  >
                    {element.system}
                  </li>
                );
              })}
            {reuso_cotizacion &&
              reuso_cotizacion.map((element) => {
                return (
                  <li
                    key={element.id}
                    style={{ backgroundColor: "rgb(48, 0, 160)" }}
                  >
                    {element.system}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <div className="listButton">
        <button className="delete" onClick={handleDelete}>Eliminar</button>
        <button className="details" onClick={()=>handleDetalle(project_data?.id as string)}>Ver Detalle</button>
      </div>
    </article>
  );
}
