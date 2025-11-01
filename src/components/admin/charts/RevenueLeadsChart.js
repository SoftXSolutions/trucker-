import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip, Filler);

const RevenueLeadsChart = ({ labels, leads, revenue }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Leads',
        data: leads,
        borderColor: '#23a455',
        backgroundColor: 'rgba(35,164,85,0.15)',
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 5,
        yAxisID: 'y1',
        fill: true,
      },
      {
        label: 'Revenue ($)',
        data: revenue,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.15)',
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 5,
        yAxisID: 'y',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.dataset.label.includes('Revenue') ? '$' : ''}${ctx.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(0,0,0,0.08)', borderDash: [4, 4] },
      },
      y: {
        position: 'right',
        grid: { color: 'rgba(0,0,0,0.12)', borderDash: [4, 4] },
        ticks: {
          callback: (val) => `$${val}`,
        },
      },
      y1: {
        position: 'left',
        grid: { display: false },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueLeadsChart;
