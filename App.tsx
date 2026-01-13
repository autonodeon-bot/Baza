
import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { MapComponent } from './components/MapComponent';
import { MOCK_SPECIALISTS } from './constants';
import { Filters, Specialist } from './types';
import { filterSpecialistsWithAI } from './services/geminiService';

const App: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    district: '',
    maxPrice: 10000,
    searchQuery: ''
  });

  const [aiIds, setAiIds] = useState<string[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);

  const filteredSpecialists = useMemo(() => {
    return MOCK_SPECIALISTS.filter(s => {
      // If AI search is active, only show AI-selected IDs
      if (aiIds !== null && !aiIds.includes(s.id)) return false;

      const categoryMatch = filters.category === 'all' || s.category === filters.category;
      const districtMatch = !filters.district || s.district === filters.district;
      const priceMatch = s.pricePerHour <= filters.maxPrice;
      
      return categoryMatch && districtMatch && priceMatch;
    });
  }, [filters, aiIds]);

  const handleAIQuery = async (query: string) => {
    setIsSearching(true);
    try {
      const ids = await filterSpecialistsWithAI(query, MOCK_SPECIALISTS);
      setAiIds(ids);
    } catch (error) {
      console.error(error);
      setAiIds(null);
    } finally {
      setIsSearching(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      category: 'all',
      district: '',
      maxPrice: 10000,
      searchQuery: ''
    });
    setAiIds(null);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-gray-50">
      <Sidebar 
        filters={filters}
        setFilters={setFilters}
        specialists={filteredSpecialists}
        onSpecialistSelect={setSelectedSpecialist}
        onAIQuery={handleAIQuery}
        isSearching={isSearching}
      />
      
      <main className="flex-1 relative">
        <MapComponent 
          specialists={filteredSpecialists} 
          selectedSpecialist={selectedSpecialist}
          onMarkerClick={setSelectedSpecialist}
        />
        
        {/* Float Reset Button if AI filters are active */}
        {aiIds !== null && (
          <button 
            onClick={resetFilters}
            className="absolute bottom-6 right-6 z-[1000] bg-white border border-gray-200 px-4 py-2 rounded-full shadow-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            Сбросить поиск
          </button>
        )}
      </main>
    </div>
  );
};

export default App;
