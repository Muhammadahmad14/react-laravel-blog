import StatCard from "./StatCard";
import { Users, FileText } from "lucide-react";
import Chart from "./Chart";
import RecentActivities from "./RecentActivities";

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Total Users"
          value={1245}
          trend={12}
          color="primary"
        />
        <StatCard
          icon={FileText}
          label="Posts Created"
          value={567}
          trend={-8}
          color="success"
        />
        <StatCard
          icon={FileText}
          label="Pending Comments"
          value={34}
          trend={5}
          color="warning"
        />
        <StatCard
          icon={Users}
          label="Blocked Users"
          value={12}
          trend={-3}
          color="destructive"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <Chart />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <RecentActivities />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
