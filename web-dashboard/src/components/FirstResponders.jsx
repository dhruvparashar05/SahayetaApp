import React, { useState } from 'react';
import ResponderCard from './ResponderCard';
import { Search, Filter, Users } from 'lucide-react';

const mockResponders = [
  { id: '1', name: 'Michael Chang', phone: '+1 (555) 019-2834', age: 34, area: 'Downtown Core', skills: ['First Aid', 'CPR', 'Medical Professional'], availability: 'Available' },
  { id: '2', name: 'Sarah Jenkins', phone: '+1 (555) 837-1928', age: 29, area: 'Northside District', skills: ['Fire Safety', 'Emergency Response'], availability: 'Available' },
  { id: '3', name: 'David Rodriguez', phone: '+1 (555) 472-9182', age: 41, area: 'West End', skills: ['Search and Rescue', 'First Aid'], availability: 'On Call' },
  { id: '4', name: 'Emily Chen', phone: '+1 (555) 918-2736', age: 26, area: 'University Campus', skills: ['First Aid', 'CPR'], availability: 'Available' },
  { id: '5', name: 'Marcus Johnson', phone: '+1 (555) 283-7465', age: 38, area: 'Southside', skills: ['Medical Professional', 'Emergency Response', 'CPR'], availability: 'Offline' },
  { id: '6', name: 'Elena Rostova', phone: '+1 (555) 736-1829', age: 31, area: 'East Bay Area', skills: ['Fire Safety', 'Search and Rescue'], availability: 'On Call' },
  { id: '7', name: 'James Wilson', phone: '+1 (555) 564-9283', age: 45, area: 'Downtown Core', skills: ['Emergency Response', 'First Aid'], availability: 'Available' },
  { id: '8', name: 'Priya Patel', phone: '+1 (555) 827-3645', age: 28, area: 'Medical District', skills: ['Medical Professional', 'CPR', 'First Aid'], availability: 'Available' },
];

const FirstResponders = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredResponders = mockResponders.filter(r => {
    const matchesFilter = filter === 'All' || r.availability === filter;
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      r.name.toLowerCase().includes(searchLower) || 
      r.area.toLowerCase().includes(searchLower) ||
      r.skills.some(skill => skill.toLowerCase().includes(searchLower));
      
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight flex items-center">
            <Users className="w-8 h-8 mr-3 text-accent-red" />
            First Responders Directory
          </h1>
          <p className="text-gray-400">Manage and contact skilled emergency personnel in your area.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search name, area, or skill..." 
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
        {['All', 'Available', 'On Call', 'Offline'].map(status => (
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
              {status === 'All' ? mockResponders.length : mockResponders.filter(r => r.availability === status).length}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
        {filteredResponders.map(responder => (
          <ResponderCard key={responder.id} responder={responder} />
        ))}
        
        {filteredResponders.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center border border-dashed border-gray-800 rounded-xl bg-dark-lighter/50">
            <Users className="w-12 h-12 text-gray-600 mb-4" />
            <p className="text-gray-400 font-medium text-lg">No responders found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirstResponders;
