import React, { useState, useEffect } from 'react';
import profileService from '../../services/profileService';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Assets and Profits',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};


export default function Statistics() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);

    profileService
      .getUserInfo()
      .then((res) => {

        const data_ = {
          labels: res.data.labels,
          datasets: [
            {
              label: 'Amount',
              data: res.data.amounts,
              backgroundColor: 'rgb(0, 170, 160)',
            },
            {
              label: 'Profit',
              data: res.data.profits,
              backgroundColor: 'rgb(142, 210, 201)',
            },
          ],
        };

        setData({ ...data_ });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto my-5 px-5">
      <div className="container mx-auto my-5 px-5 z-0 border bg-white rounded-lg shadow-md  flex flex-col items-center justify-center p-6 cursor-pointer">
        {data ? <Bar options={options} data={data} /> : ''}
      </div>
    </div>
  );
}

