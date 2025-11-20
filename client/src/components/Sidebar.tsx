import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-dashboard-primary text-white flex flex-col border-r border-dashboard-input-border">

      {/* Brand */}
      <div className="px-6 py-6 text-2xl font-semibold tracking-wide">
        TeamSync
      </div>

      <div className="border-b border-dashboard-input-border mb-4"></div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-3">
        <NavLink to="projects"><button className="w-full text-left px-3 py-2 rounded-lg hover:bg-dashboard-secondary hover:text-dashboard-accent-blue transition">
          Projects
        </button></NavLink>

        <NavLink to="tasks"><button className="w-full text-left px-3 py-2 rounded-lg hover:bg-dashboard-secondary hover:text-dashboard-accent-blue transition">
          Tasks
        </button></NavLink>

        <NavLink to="workspace"><button className="w-full text-left px-3 py-2 rounded-lg hover:bg-dashboard-secondary hover:text-dashboard-accent-blue transition">
          Workspace
        </button></NavLink>

        <NavLink to="settings"><button className="w-full text-left px-3 py-2 rounded-lg hover:bg-dashboard-secondary hover:text-dashboard-accent-blue transition">
          Setting
        </button></NavLink>
      </nav>

      {/* Logout */}
      <div className="px-4 pb-6">
        <button className="w-full text-left px-3 py-2 rounded-lg bg-dashboard-accent-orange hover:bg-dashboard-hover-orange text-white transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
