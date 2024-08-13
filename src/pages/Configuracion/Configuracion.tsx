/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
// import { getAllSystems } from '../../services/fetchData'
// import { useUserStore } from '../../store/userStore'
import { useAppConfigStore } from "../../store/configStore";
import { TypeSystemTypes, TypeSystemsCategories } from "../../Types/SystemsType";
import "./Configuration.scss";
import { useNavigate } from "react-router-dom";
import { RoutesDirectory } from "../../routes/RoutesDirectory";

export default function Configuracion() {
  const { system_categories } = useAppConfigStore();
  // console.log(system_categories)

  // useEffect(()=>{
  //   async function getData(){
  //     const res = await getAllSystems(jwtTokens?.access as string)
  //     console.log(res)
  //     setSystems(res)
  //   }

  //   getData()
  // },[])
  return (
    <section>
      <h1>Configuracion de Aplicacion</h1>

      {system_categories &&
        system_categories.map((category) => {
          return (
            <ul>
              <li key={category.id}>{category.title}</li>
              <ol>
                {category.system_category &&
                  category.system_category.map((element) => {

                    return <ListRow key={element.id} categoryData={category} rowData={element} />;
                  })}
              </ol>
            </ul>
          );
        })}
    </section>
  );
}

const ListRow = ({ rowData,categoryData }: { rowData: TypeSystemTypes,categoryData:TypeSystemsCategories }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(RoutesDirectory.GO_CONFIG_SYSTEM(categoryData.title, rowData.id))
    console.log(rowData);

  };
  return (
    <li className="confRowList" onClick={handleClick}>
      {rowData.id}-{rowData.title}{" "}
    </li>
  );
};
