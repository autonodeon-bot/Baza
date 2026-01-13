
import React from 'react';
import { Specialist } from '../types';

interface SpecialistCardProps {
  specialist: Specialist;
  onClick: () => void;
}

export const SpecialistCard: React.FC<SpecialistCardProps> = ({ specialist, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer mb-3"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <img 
            src={specialist.avatar} 
            alt={specialist.name} 
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-50"
          />
          {specialist.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-900">{specialist.name}</h3>
            <span className="text-blue-600 font-bold text-sm">{specialist.pricePerHour} ₽/час</span>
          </div>
          <p className="text-xs text-blue-500 font-medium uppercase tracking-wider mb-1">
            {specialist.category}
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span className="text-yellow-400 font-bold">★</span>
            <span>{specialist.rating} ({specialist.reviewsCount})</span>
            <span className="mx-1">•</span>
            <span className="truncate">{specialist.tsjName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
