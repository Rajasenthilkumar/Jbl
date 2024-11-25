import {
  ArcElement,
  Chart as ChartJS,
  DoughnutController,
  Legend,
  Tooltip,
  type TooltipItem,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, DoughnutController);

const BasicDonutChart = () => {
  const total = 1000;
  const data = {
    labels: ['Security Deposit', 'Damage Waiver'],
    datasets: [
      {
        label: 'Category Distribution',
        data: [27, 25],
        backgroundColor: ['#D1E1FE', '#CEF5D1'],
        borderColor: ['#D1E1FE', '#CEF5D1'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'doughnut'>) => {
            const { label, raw } = tooltipItem;
            return `${label}: ${raw}%`;
          },
        },
      },
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
    cutout: '60%',
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
      className="doughnut-chart my-2"
    >
      <Doughnut
        data={data}
        options={{
          ...options,
          plugins: {
            ...options.plugins,
            legend: {
              ...options.plugins?.legend,
              position: 'bottom',
            },
          },
        }}
      />
      <div
        className="total-amount"
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        Total: {total}
      </div>
    </div>
  );
};

export default BasicDonutChart;
