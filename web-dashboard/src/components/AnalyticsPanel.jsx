import React from 'react';
import { ShieldAlert, Activity, CheckCircle, Clock } from 'lucide-react';

const AnalyticsPanel = ({ alerts }) => {
  const total = alerts.length;
  const active = alerts.filter(a => a.data().status === 'Active').length;
  const inProgress = alerts.filter(a => a.data().status === 'In Progress').length;
  const resolved = alerts.filter(a => a.data().status === 'Resolved').length;

  const stats = [
    { label: 'Total Alerts', value: total, icon: <ShieldAlert className="w-5 h-5 text-gray-400" />, color: 'border-gray-800' },
    { label: 'Active', value: active, icon: <Activity className="w-5 h-5 text-accent-red" />, color: 'border-accent-red/50 bg-accent-red/10' },
    { label: 'In Progress', value: inProgress, icon: <Clock className="w-5 h-5 text-yellow-500" />, color: 'border-yellow-500/50 bg-yellow-500/10' },
    { label: 'Resolved', value: resolved, icon: <CheckCircle className="w-5 h-5 text-green-500" />, color: 'border-green-500/50 bg-green-500/10' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className={`p-4 rounded-xl border ${stat.color} bg-dark-lighter flex items-center justify-between`}>
          <div>
            <p className="text-sm text-gray-400 font-medium mb-1">{stat.label}</p>
            <h4 className="text-2xl font-bold text-white">{stat.value}</h4>
          </div>
          <div className="p-3 bg-dark rounded-lg">
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsPanel;
