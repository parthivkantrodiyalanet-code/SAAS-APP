import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";



const Dashboard = () => {
  return (
    <div className="flex h-screen bg-dashboard-secondary">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6  bg-dashboard-primary text-white overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
