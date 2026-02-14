import StatCard from "./StatCard";
import { Users, FileText,Verified,DollarSign } from "lucide-react";
import Chart from "./Chart";
import RecentActivities from "./RecentActivities";
import { useEffect, useState } from "react";
import { admin } from "../../../Laravel/admin";
import Loading from "../../Loading";
function Dashboard() {
  const [data, setData] = useState();
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await admin.dashboard();
        if (response.success) {
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false);
      }
    };
    getData();
  }, []);
  if(loading) return <Loading />;
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Total Users"
          value={data?.cardData?.total_users}
          trend={0}
          color="primary"
        />
        <StatCard
          icon={FileText}
          label="Posts Created"
          value={data?.cardData?.total_posts}
          trend={0}
          color="success"
        />
        <StatCard
          icon={Verified}
          label="Veryfied Users"
          value={data?.cardData?.verified_users}
          trend={0}
          color="warning"
        />
        <StatCard
          icon={DollarSign}
          label="Available Balance"
          value={data?.cardData?.total_balance}
          trend={0}
          color="destructive"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <Chart MontlyPosts={data?.monthly_posts}/>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <RecentActivities />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
