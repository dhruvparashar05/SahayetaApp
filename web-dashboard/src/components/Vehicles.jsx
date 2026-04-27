import React, { useState } from 'react';
import VehicleCard from './VehicleCard';
import { Search, Filter } from 'lucide-react';

// Mock data for emergency vehicles
const mockVehicles = [
  { id: 'AMB-101', type: 'Ambulance', status: 'Available', location: 'Downtown Medical Center', distance: '1.2 miles', lastUpdated: 'Just now', driver: 'Paramedic Sarah' },
  { id: 'AMB-102', type: 'Ambulance', status: 'Dispatched', location: 'En route to 5th Ave', distance: '3.4 miles', lastUpdated: '2 min ago', driver: 'Paramedic John' },
  { id: 'ENG-201', type: 'Fire Engine', status: 'Available', location: 'Station 42, Northside', distance: '2.5 miles', lastUpdated: '5 min ago', driver: 'Captain Miller' },
  { id: 'ENG-202', type: 'Fire Engine', status: 'Maintenance', location: 'City Garage', distance: '5.0 miles', lastUpdated: '1 hr ago', driver: 'N/A' },
  { id: 'PLC-301', type: 'Police Cruiser', status: 'Available', location: 'West District Precinct', distance: '0.8 miles', lastUpdated: 'Just now', driver: 'Officer Davis' },
  { id: 'PLC-302', type: 'Police Cruiser', status: 'Available', location: 'Highway Patrol Hub', distance: '4.1 miles', lastUpdated: '10 min ago', driver: 'Officer Chen' },
  { id: 'AMB-103', type: 'Ambulance', status: 'Available', location: 'Southside Clinic', distance: '2.0 miles', lastUpdated: 'Just now', driver: 'Paramedic Alex' },
];

const Vehicles = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredVehicles = mockVehicles.filter(v => {
    const matchesFilter = filter === 'All' || v.status === filter;
    const matchesSearch = v.type.toLowerCase().includes(search.toLowerCase()) || 
                          v.id.toLowerCase().includes(search.toLowerCase()) ||
                          v.location.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Available Vehicles</h1>
          <p className="text-gray-400">Monitor and dispatch emergency response units.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search units..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500 w-full md:w-64"
            />
          </div>
          <button className="flex items-center space-x-2 bg-dark-lighter border border-gray-700 px-4 py-2 rounded-lg text-white hover:bg-gray-800 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
        {['All', 'Available', 'Dispatched', 'Maintenance'].map(status => (
          <button 
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === status 
                ? 'bg-white text-dark' 
                : 'bg-dark-lighter border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600'
            }`}
          >
            {status}
            <span className="ml-2 opacity-60">
              {status === 'All' ? mockVehicles.length : mockVehicles.filter(v => v.status === status).length}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
        {filteredVehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
        
        {filteredVehicles.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center border border-dashed border-gray-800 rounded-xl bg-dark-lighter/50">
            <p className="text-gray-500 font-medium text-lg">No vehicles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vehicles;
