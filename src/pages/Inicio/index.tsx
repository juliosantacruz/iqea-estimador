// import React from 'react'
import ListElementsCotizacion from "../../components/ListElementsCotizacion/ListElementsCotizacion";
import NewElementBtn from "../../components/NewElementBtn/NewElementBtn";
import "./Inicio.scss";

export default function Inicio() {
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
