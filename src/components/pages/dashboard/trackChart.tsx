"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTopTracks } from "@/client/hooks/useTracks";
import Loading from "@/components/shared/loading/loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TrackChart = () => {
  const { data: topTracks, isLoading } = useTopTracks();
  const labels = topTracks?.map((track) => track.track_name);
  const playCounts = topTracks?.map((track) => track.playCount);

  const data = {
    labels,
    datasets: [
      {
        data: playCounts,
        maxBarThickness: 40,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(54, 162, 0)",
          "rgb(153, 102, 255)",
        ],
      },
    ],
  };

  if (isLoading) {
    <Loading />;
  }
  return (
    <div className="bg-[#20201f] rounded-xl shadow-sm flex flex-col">
      <div className="header-wrapper self-baseline bg-[#2b2b29] px-10 py-1 rounded-e-lg shadow-sm">
        <h4 className="text-lg sm:text-2xl font-semibold">Top 5 Tracks</h4>
      </div>
      <div className="chart-wrapper py-3">
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TrackChart;
