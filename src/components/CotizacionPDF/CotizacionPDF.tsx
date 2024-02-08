import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import iqeaLogo from "../../assets/iqea_logo.png";
import { TypeCotizacion } from "../../Types/ProjectData";
import { PriceValue } from "../../Types/ProjectData";
import { setFormat } from "../../utils/CurrencyFormat";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CotizacionPDF({ data }: any) {
  const {
    project_data,
    water_cotizacion,
    waste_water_cotizacion,
    reuso_cotizacion,
  } = data as TypeCotizacion;

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    iqeaLogo: {
      width: "200px",
      height: "56px",
    },
    headerText: {
      margin: 6,
      fontSize: 12,
      textAlign: "justify",
    },
    projectDataRow: {
      display: "flex",
      flexDirection: "row",
    },
    projectDataText: {
      fontSize: 12,
    },
    table: {
      marginTop: "20px",
    },
    theader: {},
    tbody: {
      border: "1px solid black",
    },
    trow: {
      border: "1px solid black",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    tCantidad: {
      width: "8%",
    },
    tUnidad: {
      width: "7%",
    },
    tClave: {
      width: "11%",
    },
    tDescripcion: {
      width: "36%",
    },
    tUnitario: {
      width: "12%",
    },
    tImporte: {
      width: "13%",
    },
    tMoneda: {
      width: "7%",
    },
    theaderText: {
      fontSize: 10,
      fontWeight:500,
    },
    dataText: {
      fontSize: 10,
    },
    tfooterText: {
      fontSize: 10,
      margin: 3,

    },
    tfooter: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      width: "100%",
    },
    tfooterRow: {
      display: "flex",
      flexDirection: "row",
    },
    firma:{
      display:'flex',
      flexDirection:'column',
      marginTop:'40px'
    },
    pageNumber: {
      position: "absolute",
      fontSize: 10,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
  });
  // console.log(styles);

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
  // console.log("total", totalObra);

  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.header}>
          <Image src={iqeaLogo} style={styles.iqeaLogo} />
          <View>
            <Text style={styles.headerText}>Estimacion de Costo: XXXXX</Text>
            <Text style={styles.headerText}>Folio: XXXX-XXXXX-XXX</Text>
            <Text style={styles.headerText}>Fecha de Emision: XX-XX-XXXX</Text>
          </View>
        </View>

        <View style={styles.projectDataRow}>
          <Text style={styles.projectDataText}>Cotizacion:</Text>
          <Text style={styles.projectDataText}>xxxxxx</Text>
        </View>
        <View style={styles.projectDataRow}>
          <Text style={styles.projectDataText}>Contacto:</Text>
          <Text style={styles.projectDataText}>USERNAME</Text>
        </View>
        <View style={styles.projectDataRow}>
          <Text style={styles.projectDataText}>Projecto:</Text>
          <Text style={styles.projectDataText}>{project_data?.name}</Text>
        </View>
        <View style={styles.projectDataRow}>
          <Text style={styles.projectDataText}>Fecha de Arranque:</Text>
          <Text style={styles.projectDataText}>xx/xx/xxxx</Text>
        </View>
        <View style={styles.projectDataRow}>
          <Text style={styles.projectDataText}>Ubicacion de Obra:</Text>
          <Text style={styles.projectDataText}>LOCATION</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.theader}>
            <View style={styles.trow}>
              <View style={styles.tCantidad}>
                <Text style={styles.theaderText}>Cantidad</Text>
              </View>
              <View style={styles.tUnidad}>
                <Text style={styles.theaderText}>Unidad</Text>
              </View>
              <View style={styles.tClave}>
                <Text style={styles.theaderText}>Clave</Text>
              </View>
              <View style={styles.tDescripcion}>
                <Text style={styles.theaderText}>Descripcion</Text>
              </View>
              <View style={styles.tUnitario}>
                <Text style={styles.theaderText}>P.Unitario</Text>
              </View>
              <View style={styles.tImporte}>
                <Text style={styles.theaderText}>Importe</Text>
              </View>
              <View style={styles.tMoneda}>
                <Text style={styles.theaderText}>Mon.</Text>
              </View>
            </View>
          </View>
          <View style={styles.tbody}>
            {water_cotizacion &&
              water_cotizacion.map((row: PriceValue) => {
                const { flow = 0, price = 0, unit, system } = row;
                const total = flow * price;
                return (
                  <View style={styles.trow} key={row.id}>
                    <View style={styles.tCantidad}>
                      <Text style={styles.dataText}>1</Text>
                    </View>
                    <View style={styles.tUnidad}>
                      <Text style={styles.dataText}>PAQ</Text>
                    </View>
                    <View style={styles.tClave}>
                      <Text style={styles.dataText}>PROYECTO</Text>
                    </View>
                    <View style={styles.tDescripcion}>
                      <Text style={styles.dataText}>
                        {`Suministro e instalacion de sistema de ${system} en linea con capacidad ${flow} ${unit}. Incluye: Equipos, materiales, accesorios, tuberia y accesorios en pvc ced80.`}
                      </Text>
                    </View>
                    <View style={styles.tUnitario}>
                      <Text style={styles.dataText}>{setFormat(total)}</Text>
                    </View>
                    <View style={styles.tImporte}>
                      <Text style={styles.dataText}>{setFormat(total)}</Text>
                    </View>
                    <View style={styles.tMoneda}>
                      <Text style={styles.dataText}>{row.currency}</Text>
                    </View>
                  </View>
                );
              })}

            {waste_water_cotizacion &&
              waste_water_cotizacion.map((row: PriceValue) => {
                const { flow = 0, price = 0, unit, system } = row;
                const total = flow * price;
                return (
                  <View style={styles.trow} key={row.id}>
                    <View style={styles.tCantidad}>
                      <Text style={styles.dataText}>1</Text>
                    </View>
                    <View style={styles.tUnidad}>
                      <Text style={styles.dataText}>PAQ</Text>
                    </View>
                    <View style={styles.tClave}>
                      <Text style={styles.dataText}>PROYECTO</Text>
                    </View>
                    <View style={styles.tDescripcion}>
                      <Text style={styles.dataText}>
                        {`Suministro e instalacion de sistema de ${system} en linea con capacidad ${flow} ${unit}. Incluye: Equipos, materiales, accesorios,tuberia y accesorios en pvc ced80.`}
                      </Text>
                    </View>
                    <View style={styles.tUnitario}>
                      <Text style={styles.dataText}>{setFormat(total)}</Text>
                    </View>
                    <View style={styles.tImporte}>
                      <Text style={styles.dataText}>{setFormat(total)}</Text>
                    </View>
                    <View style={styles.tMoneda}>
                      <Text style={styles.dataText}>{row.currency}</Text>
                    </View>
                  </View>
                );
              })}

            {reuso_cotizacion &&
              reuso_cotizacion.map((row: PriceValue) => {
                const { flow = 0, price = 0, unit, system } = row;
                const total = flow * price;
                return (
                  <View style={styles.trow} key={row.id}>
                    <View style={styles.tCantidad}>
                      <Text style={styles.dataText}>1</Text>
                    </View>
                    <View style={styles.tUnidad}>
                      <Text style={styles.dataText}>PAQ</Text>
                    </View>
                    <View style={styles.tClave}>
                      <Text style={styles.dataText}>PROYECTO</Text>
                    </View>
                    <View style={styles.tDescripcion}>
                      <Text style={styles.dataText}>
                        {`Suministro e instalacion de sistema de ${system} en linea con capacidad ${flow} ${unit}. Incluye: Equipos, materiales, accesorios, tuberia y accesorios en pvc ced80.`}
                      </Text>
                    </View>
                    <View style={styles.tUnitario}>
                      <Text style={styles.dataText}>{setFormat(total)}</Text>
                    </View>
                    <View style={styles.tImporte}>
                      <Text style={styles.dataText}>{setFormat(total)}</Text>
                    </View>
                    <View style={styles.tMoneda}>
                      <Text style={styles.dataText}>{row.currency}</Text>
                    </View>
                  </View>
                );
              })}
          </View>
          <View style={styles.tfooter}>
            <View style={styles.tfooterRow}>
              <Text style={styles.tfooterText}>Subtotal</Text>
              <Text style={styles.tfooterText}>{setFormat(SubTotal)}</Text>
            </View>
            <View style={styles.tfooterRow}>
              <Text style={styles.tfooterText}>IVA</Text>
              <Text style={styles.tfooterText}>{setFormat(iva)}</Text>
            </View>
            <View style={styles.tfooterRow}>
              <Text style={styles.tfooterText}>Subtotal</Text>
              <Text style={styles.tfooterText}>{setFormat(TotalObra)}</Text>
            </View>
          </View>
        </View>
        <View>
          <View fixed>
            <Text style={styles.dataText}>Notas:</Text>
            <Text style={styles.dataText}>
              Se requiere un anticipo del 50%, el resto en estimaciones contra
              entrega
            </Text>
          </View>
        </View>

        <View fixed style={styles.firma}>
          <View>
            <Text style={styles.dataText}>
              _______________________________________
            </Text>
            <Text style={styles.dataText}>AGENTE SUPERVISOR</Text>
          </View>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}

export default CotizacionPDF;
