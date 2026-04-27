import React from 'react';
import { Truck, Flame, Shield, MapPin, Activity, Navigation, Clock } from 'lucide-react';

const VehicleCard = ({ vehicle }) => {
  const { id, type, status, location, lastUpdated, driver, distance } = vehicle;

  const getTypeIconAndColor = () => {
    switch (type) {
      case 'Ambulance': 
        return { icon: <Activity className="w-6 h-6 text-accent-red" />, color: 'border-accent-red/30 bg-accent-red/10', titleColor: 'text-accent-red' };
      case 'Fire Engine': 
        return { icon: <Flame className="w-6 h-6 text-orange-500" />, color: 'border-orange-500/30 bg-orange-500/10', titleColor: 'text-orange-500' };
      case 'Police Cruiser': 
        return { icon: <Shield className="w-6 h-6 text-blue-500" />, color: 'border-blue-500/30 bg-blue-500/10', titleColor: 'text-blue-500' };
      default: 
        return { icon: <Truck className="w-6 h-6 text-gray-400" />, color: 'border-gray-800 bg-dark', titleColor: 'text-gray-300' };
    }
  };

  const { icon, color, titleColor } = getTypeIconAndColor();

  const getStatusColor = () => {
    switch (status) {
      case 'Available': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'Dispatched': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'Maintenance': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className={`p-5 rounded-xl border ${color} bg-dark-lighter relative transition-all hover:scale-[1.02] hover:shadow-lg`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-dark rounded-xl border border-gray-800 shadow-inner">
            {icon}
          </div>
          <div>
            <h3 className={`font-bold text-lg ${titleColor}`}>{type}</h3>
            <p className="text-sm text-gray-400 font-mono">{id}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor()}`}>
          {status}
        </span>
      </div>

      <div className="space-y-3 mt-4">
        <div className="flex items-center text-sm text-gray-300">
          <MapPin className="w-4 h-4 mr-3 text-gray-500" />
          <span className="truncate">{location}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center text-gray-300">
            <Navigation className="w-4 h-4 mr-3 text-gray-500" />
            <span>{distance} away</span>
          </div>
          <div className="flex items-center text-gray-500 text-xs">
            <Clock className="w-3 h-3 mr-1" />
            <span>{lastUpdated}</span>
          </div>
        </div>
      </div>
      
      {status === 'Available' && (
        <button className="mt-5 w-full py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors border border-gray-700">
          Dispatch Unit
        </button>
      )}
      {status === 'Dispatched' && (
        <button className="mt-5 w-full py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 rounded-lg font-medium transition-colors border border-yellow-500/30">
          Track Unit
        </button>
      )}
    </div>
  );
};

export default VehicleCard;
