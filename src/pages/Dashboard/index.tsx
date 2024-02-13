/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import {
  getAllProjectsAdmin,
  getAllUsersAdmin,
} from "../../services/fetchData";
import { useUserStore } from "../../store/userStore";
import { TypeCotizacion } from "../../Types/ProjectData";

export default function Dashboard() {
  const [projectsData, setProjectsData] = useState<TypeCotizacion[]>();
  const [usersData, setUsersData] = useState<any>();
  const { jwtTokens } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await getAllProjectsAdmin(
        jwtTokens?.access as string
      );
      const usersData = await getAllUsersAdmin(jwtTokens?.access as string);

      setUsersData(usersData);
      setProjectsData(projectsData);
    };

    fetchData();
  }, []);

  console.log(usersData);
  return (
    <section className="dashboard">
      <div className="pageTitle">
        <h1>Dashboard</h1>
      </div>

      <div className="usuariosInfo">
        <h2>Listado de Usuarios</h2>
        <div className="userDetails"></div>

        <div className="tableHeader">
          <div className="id">id</div>
          <div className="user">Usuario</div>
          <div className="name">Nombre</div>
          <div className="email">Correo electronico</div>
          <div className="tel">Telefono</div>
          <div className="company">Empresa</div>
          <div className="cotizaciones">Proyec</div>
        </div>

        {usersData &&
          usersData.map((user: any) => {
            console.log(user);
            return <TableRow key={user.id} userData={user} />;
          })}
      </div>

      <div className="projects">
        <h2>Listado de proyecto a cotizar</h2>
        {projectsData &&
          projectsData.map((cotizacion) => {
            return (
              <article key={cotizacion.project_data?.id}>
                <h4>{cotizacion.project_data?.name}</h4>
              </article>
            );
          })}
      </div>
    </section>
  );
}

const TableRow = ({ userData }: any) => {
  const [openDatail, setOpenDetail] = useState(false);
  const { id, username, name, last_name, email, phone, company, cotizaciones } =
    userData;

  const cantidadCotizaciones = cotizaciones.length;
  return (
    <article
      onClick={() => {
        setOpenDetail(!openDatail);
      }}
    >
      <div className="tableRow">
        <div className="id">{id}</div>
        <div className="user">{username}</div>
        <div className="name">{`${name} ${last_name}`}</div>
        <div className="email">{email}</div>
        <div className="tel">{phone}</div>
        <div className="company">{company}</div>
        <div className="cotizaciones">{cantidadCotizaciones}</div>
      </div>
      {openDatail && cantidadCotizaciones > 0 && (
        <div className="projectsDetail">
          <h3>Proyectos de {username}</h3>
          {cotizaciones.map((element: any) => {
            const handleClick=(event:React.SyntheticEvent<EventTarget>)=>{
              console.log('proyeasdf')
              event.stopPropagation()
            }
            return (
              <div className="projectDetail" key={element.id} onClick={(event)=>handleClick(event)}>
                <div className="projectId">{element.project_data.id}</div>
                <div className="projectName">{element.project_data.name}</div>
                <div className="projectLocation">
                  {element.project_data.location}
                </div>
                {element.water_cotizacion.length > 0 && (
                  <div className="projectWater">T Agua Potable</div>
                )}
                {element.waste_water_cotizacion.length > 0 && (
                  <div className="projectWasteWater">T Agua Residual</div>
                )}
                {element.reuso_cotizacion.length > 0 && (
                  <div className="projectReuso">T Agua Reuso</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
};
