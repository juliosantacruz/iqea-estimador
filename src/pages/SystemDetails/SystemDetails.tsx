/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSystemDetail } from "../../services/fetchData";
import { useUserStore } from "../../store/userStore";
import { PriceRefChart } from "../../components/PriceRefChart/PriceRefChart";
import "./SystemDetails.scss";
import TrashIcon from '../../assets/icons/trash.svg'
import EditIcon from '../../assets/icons/edit.svg'

type SystemDataType = {
  title: string;
  id: number;
  description: string;
  system_category: string;
  system_category_id: number;
};

type RefPointsType = {
  consideraciones: string;
  currency: string;
  flujo: string;
  id: number;
  precioFinal: string;
  precios_referencia: number;
  unidad: string;
};

export default function SystemDetails() {
  const { jwtTokens } = useUserStore();
  const [systemDetail, setSystemDetail] = useState<SystemDataType>();
  const [preciosRefPoints, setPreciosRefPoints] = useState<RefPointsType[]>();
  const { systemCategory, systemId } = useParams();

  console.log(systemDetail);
  console.log(preciosRefPoints);

  useEffect(() => {
    const SystemData = async () => {
      const leId = Number(systemId);
      const res = await getSystemDetail(
        jwtTokens?.access as string,
        leId as number
      );

      const systemData = {
        title: res.system_type.title,
        id: res.system_type.id,
        description: res.description,
        system_category: systemCategory,
        system_category_id: res.system_type.system_category,
      };
      setPreciosRefPoints(res.precios_ref_points);
      setSystemDetail(systemData as SystemDataType);
    };
    SystemData();
  }, []);

  const rawData: { leValues: number[]; labels: string[] } = {
    leValues: [],
    labels: [],
  };

  if (preciosRefPoints !== undefined) {
    preciosRefPoints?.map((priceRef: any) => {
      const label: string = `${priceRef.flujo} ${priceRef.unidad}`;
      rawData.labels.push(label);
      rawData.leValues.push(Number(priceRef.precioFinal));
    });
  }

  return (
    <section className="systemDetail">
      <h1>
        {systemDetail?.title} -{systemDetail?.system_category}
      </h1>

      <div className="system_data">
        <div className="system_table">
          <table>
            <thead>
              <th>id</th>
              <th>Flujo</th>
              <th>Unidad</th>
              <th>Precio</th>
              <th>Moneda</th>
              <th>Notas</th>
              <th>Acciones</th>
            </thead>
            <tbody>
              {preciosRefPoints &&
                (preciosRefPoints as any).map((element: any) => {
                  return (
                    <tr key={element.id}>
                      <td className="flow">{element.id}</td>
                      <td className="flow">{element.flujo}</td>
                      <td className="unit">{element.unidad}</td>
                      <td className="price">{element.precioFinal}</td>
                      <td className="currency">{element.currency}</td>
                      <td className="notes">{element.consideraciones}</td>
                      <td className="actions">
                        <button><img src={EditIcon}/></button>
                        <button><img src={TrashIcon}/></button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="system_chart">
          <PriceRefChart rawData={rawData} />
        </div>
      </div>
    </section>
  );
}
