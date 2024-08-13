/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export function PriceRefChart({rawData}:any) {

  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const {labels,leValues} = rawData
  console.log(labels, typeof(labels))
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Precios de Referencia',
      },
    },
  };


  const data = {
    labels,
    datasets: [
      {
        label: 'GPM/$',
        data: leValues,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };



  return <Line options={options} data={data} />;
}
