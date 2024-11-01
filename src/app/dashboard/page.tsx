import InfoCardList from "@/components/pages/dashboard/infoCardList";
import TrackChart from "@/components/pages/dashboard/trackChart";
import UserChart from "@/components/pages/dashboard/userChart";
import UserTable from "@/components/pages/dashboard/userTable";

const DashboardPage = () => {
  return (
    <>
      <h1 className="text-white text-3xl font-semibold">Dashboard</h1>
      <div className="flex flex-col gap-y-8 mt-5 mb-7">
        <InfoCardList />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <UserChart />
          <TrackChart />
        </div>
        <UserTable />
      </div>
    </>
  );
};

export default DashboardPage;
