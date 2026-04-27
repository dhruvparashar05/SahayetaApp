import React from 'react';
import { ShieldAlert, Flame, Activity, Clock, User, CheckCircle, ArrowRight, Bell } from 'lucide-react';

const AlertCard = ({ alert, onUpdateStatus }) => {
  const id = alert.id;
  const { type, room, status, priority, timestamp, assignedStaff } = alert.data();
  
  const timeAgo = Math.floor((Date.now() - timestamp) / 60000); // minutes ago

  const getTypeIcon = () => {
    switch (type) {
      case 'Fire': return <Flame className="w-5 h-5 text-orange-500" />;
      case 'Medical': return <Activity className="w-5 h-5 text-accent-red" />;
      case 'Security': return <ShieldAlert className="w-5 h-5 text-blue-500" />;
      case 'Emergency': return <ShieldAlert className="w-5 h-5 text-accent-red" />;
      default: return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'Active': return 'bg-accent-red/20 text-accent-red border-accent-red/30';
      case 'In Progress': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'Resolved': return 'bg-green-500/20 text-green-500 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className={`p-4 rounded-xl border border-gray-800 bg-dark-lighter relative overflow-hidden transition-all hover:border-gray-700`}>
      {/* priority indicator line */}
      {status === 'Active' && priority === 'High' && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-red shadow-[0_0_8px_rgba(230,57,70,0.8)] animate-pulse"></div>
      )}
      
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-dark rounded-lg border border-gray-800">
            {getTypeIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-white">{type} Emergency</h3>
            <p className="text-sm text-gray-400">{room}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}>
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-400">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>{timeAgo === 0 ? 'Just now' : `${timeAgo}m ago`}</span>
        </div>
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4" />
          <span className="truncate">{assignedStaff || 'Unassigned'}</span>
        </div>
      </div>

      {status !== 'Resolved' && (
        <div className="flex space-x-2 mt-2 pt-4 border-t border-gray-800">
          {status === 'Active' && (
            <button 
              onClick={() => onUpdateStatus(id, 'In Progress')}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <span>Acknowledge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {status === 'In Progress' && (
            <button 
              onClick={() => onUpdateStatus(id, 'Resolved')}
              className="flex-1 bg-green-600/20 hover:bg-green-600/30 text-green-500 border border-green-600/30 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark Resolved</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AlertCard;
