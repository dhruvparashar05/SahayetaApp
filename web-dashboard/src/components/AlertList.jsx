import React from 'react';
import AlertCard from './AlertCard';

const AlertList = ({ alerts, onUpdateStatus }) => {
  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border border-dashed border-gray-800 rounded-xl bg-dark-lighter/50">
        <p className="text-gray-500 font-medium">No active alerts at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
      {alerts.map(alert => (
        <AlertCard 
          key={alert.id} 
          alert={alert} 
          onUpdateStatus={onUpdateStatus} 
        />
      ))}
    </div>
  );
};

export default AlertList;
