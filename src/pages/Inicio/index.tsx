import { useEffect } from "react";
import ListElementsCotizacion from "../../components/ListElementsCotizacion/ListElementsCotizacion";
import NewElementBtn from "../../components/NewElementBtn/NewElementBtn";
import "./Inicio.scss";
import { getAllProjects, getAllSystems } from "../../services/fetchData";
import {useUserStore} from "../../store/userStore"
import { useCotizacionStore } from "../../store/cotizacionStore";
import { useAppConfigStore } from "../../store/configStore";


export default function Inicio() {
  const {jwtTokens} = useUserStore()
  const {loadCotizaciones} = useCotizacionStore()
  const {set_system_categories} = useAppConfigStore()

  useEffect(()=>{
    async function getData(){
      const conf = await getAllSystems(jwtTokens?.access as string)
      set_system_categories(conf)
      const res = await getAllProjects(jwtTokens?.access as string)
      loadCotizaciones(res)
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

