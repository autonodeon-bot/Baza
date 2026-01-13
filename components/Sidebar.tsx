
import React from 'react';
import { CATEGORIES, DISTRICTS } from '../constants';
import { Category, Filters, Specialist } from '../types';
import { SpecialistCard } from './SpecialistCard';

interface SidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  specialists: Specialist[];
  onSpecialistSelect: (s: Specialist) => void;
  onAIQuery: (q: string) => void;
  isSearching: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  filters, 
  setFilters, 
  specialists, 
  onSpecialistSelect,
  onAIQuery,
  isSearching
}) => {
  const [aiInput, setAiInput] = React.useState('');

  const handleAiSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiInput.trim()) onAIQuery(aiInput);
  };

  return (
    <div className="w-full md:w-96 h-full bg-white border-r border-gray-200 flex flex-col z-20 overflow-hidden shadow-xl">
      <div className="p-4 border-b border-gray-100 space-y-4">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          Sosedi.Pro
        </h1>

        {/* AI Search Bar */}
        <form onSubmit={handleAiSearch} className="relative">
          <input 
            type="text"
            placeholder="Умный поиск (например: няня на выходные)"
            className="w-full pl-4 pr-10 py-2 bg-blue-50 border border-blue-100 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
          />
          <button type="submit" className="absolute right-3 top-2 text-blue-500">
            {isSearching ? (
                <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            )}
          </button>
        </form>

        <div className="space-y-2">
          <select 
            className="w-full p-2 text-sm border border-gray-200 rounded-lg"
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value as Category | 'all' }))}
          >
            <option value="all">Все категории</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>

          <select 
            className="w-full p-2 text-sm border border-gray-200 rounded-lg"
            value={filters.district}
            onChange={(e) => setFilters(prev => ({ ...prev, district: e.target.value }))}
          >
            <option value="">Все районы</option>
            {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50">
        <div className="mb-4 flex justify-between items-center">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Найдено: {specialists.length}</h2>
            {specialists.length === 0 && <p className="text-sm text-gray-400 mt-2">Ничего не найдено</p>}
        </div>
        {specialists.map(s => (
          <SpecialistCard 
            key={s.id} 
            specialist={s} 
            onClick={() => onSpecialistSelect(s)}
          />
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-100 bg-white">
        <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
          Стать исполнителем
        </button>
      </div>
    </div>
  );
};
