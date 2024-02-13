import {
  ProjectData,
  TypeCotizacion,
} from "../../Types/ProjectData";

import { PDFDownloadLink } from "@react-pdf/renderer";
import iqeaLogo from "../../assets/iqea_logo.png";
import { setFormat } from "../../utils/CurrencyFormat";
import CotizacionPDF from "../../components/CotizacionPDF/CotizacionPDF";
import "./Cotizacion.scss";
import { setDateFormat } from "../../utils/DateFormat";

export default function Cotizacion({ leData }: { leData: TypeCotizacion }) {
  const dateTest = setDateFormat(leData.created as string)
  console.log(dateTest)

  const {
    project_data,
    water_cotizacion,
    waste_water_cotizacion,
    reuso_cotizacion,
  } = leData as TypeCotizacion;


  const totalObra: number[] = [];

  water_cotizacion?.map((element) => {
    const { flow = 0, price = 0 } = element;
    const total = flow * price;
    totalObra.push(total);
  });
  waste_water_cotizacion?.map((element) => {
    const { flow = 0, price = 0 } = element;
    const total = flow * price;
    totalObra.push(total);
  });
  reuso_cotizacion?.map((element) => {
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
          document={<CotizacionPDF data={leData} />}
          fileName={`Cotizacion_${(project_data as ProjectData).name}.pdf`}
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
            <p>Folio: {project_data?.id}</p>
            <p>Emitida</p>
            <p className="headerInfo">Fecha de Creacion: </p>
            <p className="headerData">{dateTest}</p>
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
              <p>{project_data?.name}</p>
            </div>
            <div className="projectDataRow">
              <p>Fecha de Arranque: </p>
              <p className="rowTitle">{project_data?.date}</p>
            </div>
            <div className="projectDataRow">
              <p className="rowTitle">Ubicacion de Obra: </p>
              <p>{project_data?.location}</p>
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
                {water_cotizacion &&
                  water_cotizacion.map((row) => {
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
                {waste_water_cotizacion &&
                  waste_water_cotizacion.map((row) => {
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
                {reuso_cotizacion &&
                  reuso_cotizacion.map((row) => {
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
