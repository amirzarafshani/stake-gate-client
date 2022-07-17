import React from 'react';
import profileService from '../../../services/profileService';
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
  Legend
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

class ProfitChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      page: 1,
      pageSize: 10,
      totalPages: 0,
      data: undefined,
    };
  }

  componentDidMount() {
    this.getData('USDT');
  }

  getData = () => {
    this.setState({ loading: true });

    const { page, pageSize } = this.state;

    profileService
      .getUserInfo(page, pageSize)
      .then((res) => {


        const data = {
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


        console.log(data);

        this.setState({
          data
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { data } = this.state
    return (
      <div className="container mx-auto my-5 px-5">
        <div className="container mx-auto my-5 px-5 z-0 border bg-white rounded-lg shadow-md  flex flex-col items-center justify-center p-6 cursor-pointer" >
          {data ? <Bar options={options} data={data} /> : ''}
        </div>
      </div>
    );
  }
}

export default (ProfitChart);
