import React, { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
);

function Chart() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    const handler = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const data = useMemo(() => {
    return {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      datasets: [
        {
          label: "Revenue",
          data: [200, 300, 400, 350, 500, 450, 600, 100],
          borderColor: isDark ? "#60A5FA" : "#2563EB",
          backgroundColor: "rgba(59,130,246,0.15)",
          tension: 0.35,
          fill: true,
          pointRadius: 4,
        },
      ],
    };
  }, [isDark]);

  const options = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          position: "top",
          labels: {
            color: isDark ? "#D1D5DB" : "#374151",
          },
        },
        title: {
          display: true,
          text: "Revenue Over Time",
          color: isDark ? "#F9FAFB" : "#111827",
          font: { size: 18, weight: "bold" },
        },
      },

      scales: {
        x: {
          ticks: { color: isDark ? "#D1D5DB" : "#374151" },
          grid: { color: isDark ? "#374151" : "#E5E7EB" },
        },
        y: {
          ticks: { color: isDark ? "#D1D5DB" : "#374151" },
          grid: { color: isDark ? "#374151" : "#E5E7EB" },
        },
      },
    };
  }, [isDark]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
      <div className="h-[350px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default Chart;
