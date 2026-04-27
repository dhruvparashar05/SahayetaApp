import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, LayoutDashboard, Truck, LogOut, Users } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-dark-lighter border-r border-gray-800 flex flex-col">
      <div className="p-6 flex items-center space-x-3">
        <div className="p-2 bg-accent-red rounded-lg">
          <ShieldAlert className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-wide">SahayetaApp</span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </NavLink>
        <NavLink 
          to="/vehicles" 
          className={({ isActive }) => 
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`
          }
        >
          <Truck className="w-5 h-5" />
          <span className="font-medium">Available Vehicles</span>
        </NavLink>
        <NavLink 
          to="/responders" 
          className={({ isActive }) => 
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`
          }
        >
          <Users className="w-5 h-5" />
          <span className="font-medium">First Responders</span>
        </NavLink>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={() => alert('Logout clicked!')}
          className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-white hover:bg-red-500/20 w-full transition-colors rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
