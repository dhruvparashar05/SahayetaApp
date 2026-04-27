import React from 'react';
import { Phone, MapPin, Award, User as UserIcon, CheckCircle2, Clock, XCircle } from 'lucide-react';

const ResponderCard = ({ responder }) => {
  const { name, phone, age, area, skills, availability } = responder;

  const getAvailabilityInfo = () => {
    switch (availability) {
      case 'Available':
        return { icon: <CheckCircle2 className="w-4 h-4 mr-1.5" />, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/30' };
      case 'On Call':
        return { icon: <Clock className="w-4 h-4 mr-1.5" />, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
      case 'Offline':
      default:
        return { icon: <XCircle className="w-4 h-4 mr-1.5" />, color: 'text-gray-500', bg: 'bg-gray-800', border: 'border-gray-700' };
    }
  };

  const statusInfo = getAvailabilityInfo();

  return (
    <div className={`p-5 rounded-xl border border-gray-800 bg-dark-lighter relative transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex flex-col h-full`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-dark rounded-full border border-gray-700 shadow-inner">
            <UserIcon className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">{name}</h3>
            <p className="text-sm text-gray-400">Age: {age}</p>
          </div>
        </div>
        <span className={`flex items-center px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.border} ${statusInfo.bg} ${statusInfo.color}`}>
          {statusInfo.icon}
          {availability}
        </span>
      </div>

      <div className="space-y-3 mb-5 flex-grow">
        <div className="flex items-center text-sm text-gray-300">
          <Phone className="w-4 h-4 mr-3 text-gray-500 shrink-0" />
          <span>{phone}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-300">
          <MapPin className="w-4 h-4 mr-3 text-gray-500 shrink-0" />
          <span className="truncate">{area}</span>
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-800">
        <div className="flex items-center mb-3">
          <Award className="w-4 h-4 mr-2 text-accent-red" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Emergency Skills</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-dark text-gray-300 text-xs rounded-md border border-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResponderCard;
