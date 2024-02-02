import { useEffect, useState } from "react";
import ListElementsCotizacion from "../../components/ListElementsCotizacion/ListElementsCotizacion";
import NewElementBtn from "../../components/NewElementBtn/NewElementBtn";
import "./Inicio.scss";
import { getAllProjects } from "../../services/fetchData";


export default function Inicio() {
  const [project, setProjects]= useState()
  console.log(project)
  useEffect(()=>{
    async function getData(){
      const res = await getAllProjects()
      setProjects(res)
    }
    getData()
  },[])
  return (
    <section className="inicioPage">
      <h1>Mis proyectos</h1>
      <div className="cotizacionesList">
        <ListElementsCotizacion />
      </div>

      <NewElementBtn />
    </section>
  );
}
