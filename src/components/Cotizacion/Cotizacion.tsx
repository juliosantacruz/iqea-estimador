/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCotizacionStore } from "../../store/cotizacionStore";
import { TypeCotizacion } from "../../Types/ProjectData";

// import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CotizacionPDF from "../../components/CotizacionPDF/CotizacionPDF";
import iqeaLogo from "../../assets/iqea_logo.png";
import { setFormat } from "../../utils/CurrencyFormat";
import "./Cotizacion.scss";

export default function Cotizacion({ id }: { id: string }) {
  const { cotizaciones } = useCotizacionStore();

  const data = cotizaciones.find(
    (cotizacion) => cotizacion.projectData?.id === id
  );
  const {
    projectData,
    waterCotizacion,
    wasteWaterCotizacion,
    reusoCotizacion,
  } = data as TypeCotizacion;

  console.log("id", id);

  const totalObra: number[] = [];

  waterCotizacion?.map((element) => {
    const { flow = 0, price = 0 } = element;
    const total = flow * price;
    totalObra.push(total);
  });
  wasteWaterCotizacion?.map((element) => {
    const { flow = 0, price = 0 } = element;
    const total = flow * price;
    totalObra.push(total);
  });
  reusoCotizacion?.map((element) => {
    const { flow = 0, price = 0 } = element;
    const total = flow * price;
    totalObra.push(total);
  });
  const SubTotal = totalObra.reduce((total, numero) => total + numero, 0);
  const iva = SubTotal * 0.16;
  const TotalObra = SubTotal + iva;
  console.log("total", totalObra);

  return (
    <>
      <div className="pdfBtn">
        <PDFDownloadLink
          document={<CotizacionPDF data={data} />}
          fileName="sdftest.pdf"
        >
          {({ loading }) =>
            loading ? <button>Cargando...</button> : <button>Descargar</button>
          }
        </PDFDownloadLink>
      </div>
      <article className="cotizacion">
        <div className="Header">
          <div className="HeaderLogo">
            <img src={iqeaLogo} alt="logo" />
          </div>
          {/* <div className="HeaderInfo">
          <p>NORMA ALICIA MURILLO SOLIS</p>
          <p>RFC MUSN511021DU4</p>
          <p>
            CANTERA 400 Int.104, Playas de Tijuana Sección Monumental, Del.
            Tijuana
          </p>
          <p>Tijuana, Baja California, México CP: 22504</p>
          <p>Lada 664 Tel(s) 210-1017</p>
          <p>iqea.facturacion@gmail.com</p>
        </div> */}
          <div className="HeaderCotizacion">
            <h3>Estimacion de Costo</h3>
            <p>Folio: {id}</p>
            <p>Emitida</p>
            <p>Febrero 12, 2024</p>
          </div>
        </div>

        <div className="Content">
          <div className="ContentHeader">
            <div className="row">
              <p className="rowTitle">Cotizado a:</p>
              <p>Publico en general</p>
            </div>
            <div className="row">
              <p className="rowTitle">Contacto:</p>
              <p>USER NAME</p>
            </div>
          </div>

          <div className="ContentProjectData">
            <div className="projectDataRow">
              <p className="rowTitle">Projecto: </p>
              <p>{projectData?.name}</p>
            </div>
            <div className="projectDataRow">
              <p>Fecha de Arranque: </p>
              <p className="rowTitle">{projectData?.date}</p>
            </div>
            <div className="projectDataRow">
              <p className="rowTitle">Ubicacion de Obra: </p>
              <p>{projectData?.location}</p>
            </div>
          </div>
          <div className="contentSystems">
            <table>
              <thead>
                <tr>
                  <td>Cantidad</td>
                  <td>Unidad</td>
                  <td>Clave</td>
                  <td>Descripcion</td>
                  <td>P.UNitario</td>
                  <td>Importe</td>
                  <td>Mon.</td>
                </tr>
              </thead>
              <tbody>
                {waterCotizacion &&
                  waterCotizacion.map((row) => {
                    const { flow = 0, price = 0, unit, system } = row;
                    const total = flow * price;
                    totalObra.push(total);
                    return (
                      <tr key={row.id}>
                        <td>1</td>
                        <td>PAQ</td>
                        <td>PROYECTO</td>
                        <td>
                          Suministro e instalacion de sistema de {system} en
                          linea con capacidad {flow} {unit}. Incluye: Equipos,
                          materiales, accesorios, tuberia y accesorios en pvc
                          ced80.
                        </td>
                        <td>{setFormat(total)}</td>
                        <td>{setFormat(total)}</td>
                        <td>{row.currency}</td>
                      </tr>
                    );
                  })}
                {wasteWaterCotizacion &&
                  wasteWaterCotizacion.map((row) => {
                    const { flow = 0, price = 0, unit, system } = row;
                    const total = flow * price;
                    totalObra.push(total);
                    return (
                      <tr key={row.id}>
                        <td>1</td>
                        <td>PAQ</td>
                        <td>PROYECTO</td>
                        <td>
                          Suministro e instalacion de sistema de {system} en
                          linea con capacidad {flow} {unit}. Incluye: Equipos,
                          materiales, accesorios, tuberia y accesorios en pvc
                          ced80.
                        </td>
                        <td>{setFormat(total)}</td>
                        <td>{setFormat(total)}</td>
                        <td>{row.currency}</td>
                      </tr>
                    );
                  })}
                {reusoCotizacion &&
                  reusoCotizacion.map((row) => {
                    const { flow = 0, price = 0, unit, system } = row;
                    const total = flow * price;
                    totalObra.push(total);
                    return (
                      <tr key={row.id}>
                        <td>1</td>
                        <td>PAQ</td>
                        <td>PROYECTO</td>
                        <td>
                          Suministro e instalacion de sistema de {system} en
                          linea con capacidad {flow} {unit}. Incluye: Equipos,
                          materiales, accesorios, tuberia y accesorios en pvc
                          ced80.
                        </td>
                        <td>{setFormat(total)}</td>
                        <td>{setFormat(total)}</td>
                        <td>{row.currency}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            <div className="tableFooter">
              <div className="footerRow">
                <p>Subtotal</p>
                <p>{setFormat(SubTotal)}</p>
              </div>
              <div className="footerRow">
                <p>I.V.A.</p>
                <p>{setFormat(iva)}</p>
              </div>
              <div className="footerRow">
                <p>Total</p>
                <p>{setFormat(TotalObra)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="Footer">
          <div className="footerNotas">
            <p>Notas:</p>
            <p>
              Se requiere un anticipo del 50%, el resto en estimaciones contra
              entrega
            </p>
            <br />
            <p>Quedo a sus órdenes</p>
          </div>
          <div className="footerFirma">
            <p>AGENTE SUPERVISOR</p>
          </div>
        </div>
      </article>
    </>
  );
}
