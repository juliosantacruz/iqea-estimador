import React from "react";
import "./CardCotizacionElement.scss";
import { useCotizacionStore } from "../../store/cotizacionStore";
import { useNavigate } from "react-router-dom";
import { TypeCotizacion } from "../../Types/ProjectData";
import { useUserStore } from "../../store/userStore";
import { deleteProject } from "../../services/fetchData";


type CardProps = {
  data: TypeCotizacion;
};



export default function CardCotizacionElement({ data }: CardProps) {
  const navigate = useNavigate();
  const {jwtTokens} = useUserStore()
  const {deleteCotizacion}= useCotizacionStore()
  const {
    project_data,
    water_cotizacion,
    waste_water_cotizacion,
    reuso_cotizacion,
  } = data;


  const handleDelete=()=>{
    deleteCotizacion(project_data?.id as string)
    deleteProject(project_data?.id as string, jwtTokens?.access as string)
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
          <p className="date">Fecha de creacion: {' '} <span>{project_data?.date}</span> </p>
          <p className="date">Ubicacion de proyecto: {" "}<span>{project_data?.location}</span> </p>

        </div>
        <div className="listFooter">
          <p>Sistemas Cotizados:</p>
          <ul>
            {water_cotizacion &&
              water_cotizacion.map((element) => {
                return (
                  <li
                    key={element.id}
                    style={{color:'white', backgroundColor: "rgb(160, 0, 147)" }}
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
                    style={{color:'white', backgroundColor: "rgb(83, 0, 160)" }}
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
                    style={{color:'white', backgroundColor: "rgb(48, 0, 160)" }}
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
