import React from "react";

const Projects = () => {
  return (
    <div className="text-white">

      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <button className="px-4 py-2 rounded-lg bg-dashboard-accent-blue hover:bg-dashboard-hover-blue transition">
          Add Project
        </button>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Example Project Card */}
        <div className="p-5 rounded-xl bg-dashboard-secondary border border-dashboard-input-border hover:border-dashboard-accent-blue transition cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Project Alpha</h2>
          <p className="text-dashboard-text-subtle mb-4">
            A short description about the project.
          </p>
          <button className="text-dashboard-accent-orange hover:text-dashboard-hover-orange transition">
            View Details
          </button>
        </div>

        <div className="p-5 rounded-xl bg-dashboard-secondary border border-dashboard-input-border hover:border-dashboard-accent-blue transition cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Project Beta</h2>
          <p className="text-dashboard-text-subtle mb-4">
            Another sample project description.
          </p>
          <button className="text-dashboard-accent-orange hover:text-dashboard-hover-orange transition">
            View Details
          </button>
        </div>

        <div className="p-5 rounded-xl bg-dashboard-secondary border border-dashboard-input-border hover:border-dashboard-accent-blue transition cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Project Gamma</h2>
          <p className="text-dashboard-text-subtle mb-4">
            Example description text.
          </p>
          <button className="text-dashboard-accent-orange hover:text-dashboard-hover-orange transition">
            View Details
          </button>
        </div>

      </div>
    </div>
  );
};

export default Projects;
