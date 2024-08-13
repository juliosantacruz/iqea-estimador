/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from "../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import "./CotizacionForm.scss";
import InputFieldUnit from "../../components/InputFieldUnit/InputFieldUnit";
import { priceList } from "../../mocks/waterPrices";
import { PriceValue } from "../../Types/ProjectData";
import { useCotizacionStore } from "../../store/cotizacionStore";
import { IDFromName } from "../../utils/ID_Generator";
import { postNewProject } from "../../services/fetchData";
import { useUserStore } from "../../store/userStore";

export default function CotizacionForm(props: any) {
  const isDev = import.meta.env.VITE_IS_DEV === "false" ? false : true;

  const { addCotizacion } = useCotizacionStore();
  const {user, jwtTokens}=useUserStore()
  const { modal } = props;

  const { register, handleSubmit } = useForm();

  const setPrice = (flow: number, arrPrice: PriceValue[]) => {
    const value = Math.ceil(flow);
    const priceValue = arrPrice.find((element) => element.flow === value);
    return priceValue;
  };

  const setCotizacion = (data: any) => {
    const waterSystems = ["filtracion", "suavisador", "osmosis"];
    const wasteWaterSystems = [
      "pretratamiento",
      "lodosActivados",
      "bioFiltracion",
      "mbbr",
    ];
    const reusoSystems = ["osmosisReuso", "ultrafiltracion"];

    const project_data = {
      id: IDFromName(data.name),
      name: data.name,
      location: data.location,
      date: data.date,
    };

    const water_cotizacion = waterSystems
      .map((system) => {
        console.log(system, data)
        if (data[system]) {
          const priceData = setPrice(data[system], priceList[system]);
          const systemData: PriceValue = {
            id: system,
            system: system,
            flow:data[system],
            unit:data[`${system}-unit`],
            ...priceData,
          };
          return systemData;
        }
      })
      .filter((element) => element !== undefined);

    const waste_water_cotizacion = wasteWaterSystems
      .map((system) => {
        if (data[system]) {
          const priceData = setPrice(data[system], priceList[system]);
          const systemData = {
            id: system,
            system: system,
            flow:data[system],
            unit:data[`${system}-unit`],
            ...priceData,
          };
          return systemData;
        }
      })
      .filter((element) => element !== undefined);

    const reuso_cotizacion = reusoSystems
      .map((system) => {
        if (data[system]) {
          const priceData = setPrice(data[system], priceList[system]);
          const systemData = {
            id: system,
            system: system,
            flow:data[system],
            unit:data[`${system}-unit`],
            ...priceData,
          };
          console.log(systemData);

          return systemData;
        }
      })
      .filter((element) => element !== undefined);

    return {
      project_data,
      water_cotizacion,
      waste_water_cotizacion,
      reuso_cotizacion,
      user:user?.userId
    };
  };

  const leSubmit = handleSubmit((data: any) => {
    const cotizacionData: any = setCotizacion(data);
    addCotizacion(cotizacionData);
    if(!isDev){
      postNewProject(cotizacionData, jwtTokens?.access as string)
    }
    // if(isDev){

    // }


    modal.setViewForm(false);
  });


  return (
    <div className="cotizacionForm">
      <div className="formTitle">
        <h2>Estimacion de Proyecto</h2>
        <button onClick={() => modal.setViewForm(false)}>x</button>
      </div>
      <form onSubmit={leSubmit}>
        <div className="subtitle">
          <h4> </h4>
        </div>

        <fieldset className="ProjectInfo">
          <InputField
            name="name"
            label="Nombre del proyecto"
            type="text"
            register={register}
          />

          <InputField
            name="location"
            label="Ubicacion del proyecto"
            type="text"
            register={register}
          />
          <InputField
            name="date"
            label="Fecha de Inicio"
            type="date"
            register={register}
          />

          {/* <div className="sistemOptions">
            <div className="inputCheck">
              <input type="checkbox" id="sistemas-agua" name="sistemas-agua" />
              <label htmlFor="">Sistemas de Agua / PTA</label>
            </div>
            <div className="inputCheck">
              <input type="checkbox" id="sistemas-agua" name="sistemas-agua" />
              <label htmlFor="">Sistemas de Agua Residual / PTAR</label>
            </div>
            <div className="inputCheck">
              <input type="checkbox" id="sistemas-agua" name="sistemas-agua" />
              <label htmlFor="">Sistemas de Reuso / PTAR</label>
            </div>
          </div> */}
        </fieldset>

        <details>
          <summary>Sistemas de Agua / PTA</summary>
          <p>
            Procesos de agua potable para uso humano, riego, limpieza e higiene
          </p>
          <fieldset className="ProjectData">
            <InputFieldUnit
              isRequired={true}
              name="filtracion"
              label="Sistema de filtracion"
              type="number"
              register={register}
            />

            <InputFieldUnit
              name="suavisador"
              label="Sistema suavisador"
              type="number"
              register={register}
            />
            <InputFieldUnit
              name="osmosis"
              label="Sistema de Osmosis"
              type="number"
              register={register}
            />
          </fieldset>
        </details>

        <details>
          <summary>Sistemas de Agua Residual / PTAR</summary>
          <p>Procesos de agua residual</p>

          <fieldset className="ProjectData">
            <InputFieldUnit
              name="pretratamiento"
              label="Pretratamiento"
              type="number"
              register={register}
            />
            <InputFieldUnit
              name="lodosActivados"
              label="Lodos Activados"
              type="number"
              register={register}
            />
            <InputFieldUnit
              name="bioFiltracion"
              label="Bio Filtracion"
              type="number"
              register={register}
            />
            <InputFieldUnit
              name="mbbr"
              label="MBBR"
              type="number"
              register={register}
            />
          </fieldset>
        </details>
        <details>
          <summary>Sistemas de Reuso / PTAR</summary>
          <p>Procesos de aguas de reuso para procesos de alta calidad</p>

          <fieldset className="ProjectData">
            <InputFieldUnit
              name="osmosisReuso"
              label="Osmosis Inversa"
              type="number"
              register={register}
            />
            <InputFieldUnit
              name="ultrafiltracion"
              label="Ultrafiltracion"
              type="number"
              register={register}
            />
          </fieldset>
        </details>

        <div className="btnGroup">
          <button>Enviar</button>
        </div>
      </form>
    </div>
  );
}
