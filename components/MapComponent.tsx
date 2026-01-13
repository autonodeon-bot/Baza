
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Specialist } from '../types';

// Исправление путей к иконкам Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  specialists: Specialist[];
  selectedSpecialist: Specialist | null;
  onMarkerClick: (s: Specialist) => void;
}

const RecenterMap: React.FC<{ coords: [number, number] }> = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 14, { animate: true });
  }, [coords, map]);
  return null;
};

export const MapComponent: React.FC<MapComponentProps> = ({ specialists, selectedSpecialist, onMarkerClick }) => {
  const mapRef = useRef<L.Map>(null);

  const createCustomIcon = (specialist: Specialist) => {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="relative flex flex-col items-center">
          <div class="w-10 h-10 rounded-full border-2 border-white shadow-lg overflow-hidden bg-blue-500">
            <img src="${specialist.avatar}" class="w-full h-full object-cover" />
          </div>
          <div class="absolute -bottom-1 bg-blue-600 text-white text-[8px] px-1 rounded font-bold whitespace-nowrap">
            ${specialist.pricePerHour} ₽
          </div>
          <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-blue-600"></div>
        </div>
      `,
      iconSize: [40, 50],
      iconAnchor: [20, 50],
      popupAnchor: [0, -50],
    });
  };

  return (
    <div className="flex-1 relative h-full">
      <MapContainer 
        center={[59.9343, 30.3351]} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {specialists.map((s) => (
          <Marker 
            key={s.id} 
            position={s.location} 
            icon={createCustomIcon(s)}
            eventHandlers={{
                click: () => onMarkerClick(s),
            }}
          >
            <Popup className="specialist-popup">
              <div className="p-1">
                <h4 className="font-bold text-gray-900">{s.name}</h4>
                <p className="text-xs text-blue-600 mb-1">{s.category}</p>
                <div className="flex items-center gap-1 text-xs mb-2">
                    <span className="text-yellow-500">★</span>
                    <span>{s.rating}</span>
                </div>
                <button 
                  onClick={() => window.open(`tel:${s.phone}`)}
                  className="w-full py-1.5 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors"
                >
                  Позвонить
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {selectedSpecialist && <RecenterMap coords={selectedSpecialist.location} />}
      </MapContainer>
      
      {/* Search overlay indicator */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none">
          <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-gray-700">Найдено мастеров: {specialists.length}</span>
          </div>
      </div>
    </div>
  );
};
