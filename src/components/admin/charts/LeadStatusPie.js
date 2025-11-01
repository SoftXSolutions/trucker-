import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const LeadStatusPie = ({ labels, values }) => {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#10b981'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.parsed}%`,
        },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Pie data={data} options={options} />
    </div>
  );
};

export default LeadStatusPie;
