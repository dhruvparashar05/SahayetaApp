import React, { useEffect, useState } from 'react';
import { subscribeToAlerts, updateAlertStatus, createMockAlert } from '../firebase';
import AnalyticsPanel from './AnalyticsPanel';
import MapView from './MapView';
import AlertList from './AlertList';
import { Radio } from 'lucide-react';

const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Subscribe to mock firebase alerts
    const unsubscribe = subscribeToAlerts((snapshot) => {
      setAlerts(snapshot);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = (id, status) => {
    updateAlertStatus(id, status);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Emergency Command Center</h1>
          <p className="text-gray-400">Monitor and manage facility emergencies in real-time.</p>
        </div>
        
        {/* Testing Button (Simulates mobile app action) */}
        <button 
          onClick={createMockAlert}
          className="flex items-center space-x-2 bg-accent-red/10 border border-accent-red text-accent-red hover:bg-accent-red hover:text-white px-4 py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(230,57,70,0.2)] hover:shadow-[0_0_20px_rgba(230,57,70,0.5)]"
        >
          <Radio className="w-5 h-5" />
          <span className="font-medium">Trigger Test Alert</span>
        </button>
      </div>

      <AnalyticsPanel alerts={alerts} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Live Map Overview</h2>
            <span className="flex items-center space-x-2 text-sm text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>System Online</span>
            </span>
          </div>
          <MapView alerts={alerts} />
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Active Alerts</h2>
            <span className="bg-gray-800 text-gray-300 text-xs font-bold px-2 py-1 rounded-md">
              {alerts.filter(a => a.data().status !== 'Resolved').length}
            </span>
          </div>
          <AlertList 
            alerts={alerts.filter(a => a.data().status !== 'Resolved')} 
            onUpdateStatus={handleUpdateStatus} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
