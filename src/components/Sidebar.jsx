import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h2 className="text-2xl mb-5">Dashboard</h2>
      <ul>
        <li>
          <Link to="/dashboard" className="block mb-3">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/profile" className="block mb-3">
            Profile
          </Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
