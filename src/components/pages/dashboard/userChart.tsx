"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { useAllMembers } from "@/client/hooks/useUsers";
import Loading from "@/components/shared/loading/loading";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserChart = () => {
  const { data: membersData, isLoading } = useAllMembers();

  const verifiedCount =
    membersData?.filter((member) => member.emailVerified)?.length || 0;
  const unverifiedCount = (membersData ?? []).length - verifiedCount || 0;

  const chartData = {
    labels: ["Unverified", "Verified"],
    datasets: [
      {
        data: [unverifiedCount, verifiedCount],
        backgroundColor: ["rgb(197, 23, 132)", "rgb(54, 162, 255)"],
        borderWidth: 0,
      },
    ],
  };

  if (isLoading) {
    <Loading />;
  }

  if (!membersData || membersData.length === 0) {
    const data = {
      labels: ["No Users"],
      datasets: [
        {
          data: [1],
          backgroundColor: ["rgb(180, 180, 180)"],
          borderWidth: 0,
        },
      ],
    };
    return (
      <div className="bg-[#20201f] rounded-xl shadow-sm flex flex-col">
        <div className="header-wrapper self-baseline bg-[#2b2b29] px-10 py-1 rounded-e-lg shadow-sm">
          <h4 className="text-lg sm:text-2xl font-semibold">Users</h4>
        </div>
        <div className="chart-wrapper py-3 h-full">
          <Pie
            data={data}
            options={{
              radius: "100%",
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "bottom",
                  align: "end",
                  labels: {
                    usePointStyle: true,
                    boxWidth: 10,
                    padding: 20,
                    font: {
                      size: 14,
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#20201f] rounded-xl shadow-sm flex flex-col">
      <div className="header-wrapper self-baseline bg-[#2b2b29] px-10 py-1 rounded-e-lg shadow-sm">
        <h4 className="text-lg sm:text-2xl font-semibold">Users</h4>
      </div>
      <div className="chart-wrapper py-3">
        <Pie
          data={chartData}
          options={{
            radius: "100%",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "bottom",
                align: "end",
                labels: {
                  usePointStyle: true,
                  boxWidth: 10,
                  padding: 20,
                  font: {
                    size: 14,
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default UserChart;
