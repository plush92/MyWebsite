import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'; // Ensure you import Bar from react-chartjs-2
import { ProcessedGdpData } from '../../../../../types/fredApi';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface GDPChartProps {
  data: ProcessedGdpData;
}

const GDPChart: React.FC<GDPChartProps> = ({ data }) => {
  const chartData = {
    labels: data.labels || ['2020', '2021', '2022'], // Default labels
    datasets: [
      {
        label: 'GDP in Trillions USD',
        data: data.gdpValues || [21.4, 22.6, 23.5], // Default values
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'GDP Over Time' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default GDPChart;
