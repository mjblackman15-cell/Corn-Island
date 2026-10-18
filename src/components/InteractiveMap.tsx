import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Spot } from '../types';
import { MapPin, Navigation, Compass } from 'lucide-react';

interface InteractiveMapProps {
  spots: Spot[];
  selectedSpotId: string | null;
  onSelectSpot: (spot: Spot) => void;
  onClearSelectedSpot?: () => void;
}

export function InteractiveMap({
  spots,
  selectedSpotId,
  onSelectSpot,
}: InteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  // Category color theme helper
  const getCategoryColor = (category: Spot['category']) => {
    switch (category) {
      case 'Beaches':
        return { bg: '#0284C7', text: '#FFFFFF', border: '#38BDF8' }; // Ocean sky blue
      case 'Food & Drink':
        return { bg: '#D97706', text: '#FFFFFF', border: '#FBBF24' }; // Warm amber
      case 'Activities':
        return { bg: '#0E4B68', text: '#FFFFFF', border: '#38BDF8' }; // Deep Caribbean navy
      case 'Practical Tips':
        return { bg: '#0D9488', text: '#FFFFFF', border: '#2DD4BF' }; // Sea teal
      default:
        return { bg: '#0E4B68', text: '#FFFFFF', border: '#CBD5E1' };
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize map centered between Big Corn & Little Corn
      const map = L.map(mapContainerRef.current, {
        center: [12.2200, -83.0500],
        zoom: 11,
        minZoom: 10,
        maxZoom: 18,
        zoomControl: false,
      });

      // Add Zoom control at top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // CartoDB Voyager tiles (clean, light, water blue, land beige)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    // Add spot markers
    spots.forEach((spot) => {
      const colors = getCategoryColor(spot.category);
      const isSelected = spot.id === selectedSpotId;

      const customIcon = L.divIcon({
        className: 'custom-island-marker',
        html: `
          <div style="
            position: relative;
            transform: translate(-50%, -100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
          ">
            <div style="
              background: ${colors.bg};
              color: ${colors.text};
              padding: 6px 10px;
              border-radius: 12px;
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-size: 11px;
              font-weight: 700;
              box-shadow: 0 4px 12px rgba(0,0,0,0.25);
              border: 2px solid ${isSelected ? '#FFFFFF' : colors.border};
              display: flex;
              align-items: center;
              gap: 4px;
              white-space: nowrap;
              transition: transform 0.2s ease;
              ${isSelected ? 'transform: scale(1.15); box-shadow: 0 0 0 3px #0E4B68, 0 8px 16px rgba(0,0,0,0.3);' : ''}
            ">
              <span>${spot.name.length > 20 ? spot.name.slice(0, 18) + '...' : spot.name}</span>
              <span style="opacity: 0.85; font-size: 10px;">${spot.priceTier}</span>
            </div>
            <div style="
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 8px solid ${colors.bg};
              margin-top: -1px;
            "></div>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });

      const marker = L.marker(spot.coordinates, { icon: customIcon }).addTo(map);

      // Popup content
      const popupHtml = `
        <div style="width: 260px; font-family: 'Plus Jakarta Sans', sans-serif; padding: 12px; background: #FFFFFF; border-radius: 14px;">
          <div style="height: 110px; border-radius: 10px; overflow: hidden; margin-bottom: 8px; position: relative; background: #E2DDD1;">
            <img src="${spot.imageUrl}" alt="${spot.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'" />
            <div style="position: absolute; top: 6px; left: 6px; background: rgba(14, 75, 104, 0.85); color: #fff; font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 6px;">
              ${spot.island}
            </div>
            <div style="position: absolute; bottom: 6px; right: 6px; background: rgba(0,0,0,0.7); color: #FCD34D; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 6px;">
              ${spot.priceTier}
            </div>
          </div>
          <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #0E4B68; font-family: 'Outfit', sans-serif;">${spot.name}</h4>
          <p style="margin: 0 0 8px 0; font-size: 11px; color: #475569; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            ${spot.insiderTip}
          </p>
          <div style="display: flex; gap: 6px; margin-top: 4px;">
            <button id="btn-popup-${spot.id}" style="
              flex: 1;
              background: #0E4B68;
              color: #FFFFFF;
              border: none;
              padding: 7px 10px;
              border-radius: 8px;
              font-size: 11px;
              font-weight: 600;
              cursor: pointer;
            ">
              View Details
            </button>
            <a href="https://www.google.com/maps/search/?api=1&query=${spot.coordinates[0]},${spot.coordinates[1]}" target="_blank" rel="noopener noreferrer" style="
              display: inline-flex;
              align-items: center;
              justify-content: center;
              background: #ECFDF5;
              color: #065F46;
              border: 1px solid #A7F3D0;
              padding: 7px 10px;
              border-radius: 8px;
              font-size: 11px;
              font-weight: 600;
              text-decoration: none;
            ">
              Google Maps
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        closeButton: true,
        offset: [0, -32],
      });

      marker.on('popupopen', () => {
        const button = document.getElementById(`btn-popup-${spot.id}`);
        if (button) {
          button.onclick = (e) => {
            e.stopPropagation();
            onSelectSpot(spot);
          };
        }
      });

      markersRef.current[spot.id] = marker;
    });

    // Resize invalidate
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => clearTimeout(timer);
  }, [spots, selectedSpotId, onSelectSpot]);

  // Handle focusing a specific selected spot
  useEffect(() => {
    if (!selectedSpotId || !mapInstanceRef.current) return;
    const targetSpot = spots.find((s) => s.id === selectedSpotId);
    if (!targetSpot) return;

    mapInstanceRef.current.flyTo(targetSpot.coordinates, 15, {
      duration: 1.2,
      easeLinearity: 0.25,
    });

    const marker = markersRef.current[selectedSpotId];
    if (marker) {
      setTimeout(() => {
        marker.openPopup();
      }, 700);
    }
  }, [selectedSpotId, spots]);

  const zoomToIsland = (island: 'Big Corn' | 'Little Corn' | 'Both') => {
    if (!mapInstanceRef.current) return;
    if (island === 'Big Corn') {
      mapInstanceRef.current.flyTo([12.1670, -83.0550], 13.5, { duration: 1.0 });
    } else if (island === 'Little Corn') {
      mapInstanceRef.current.flyTo([12.2900, -83.0480], 14.5, { duration: 1.0 });
    } else {
      mapInstanceRef.current.flyTo([12.2200, -83.0500], 11, { duration: 1.0 });
    }
  };

  return (
    <div className="relative w-full h-[580px] sm:h-[650px] rounded-2xl overflow-hidden border border-[#E7E2D6] shadow-sm bg-[#EBF4F6]">
      {/* Map DOM node */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating Island quick switcher pill inside map */}
      <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-1.5 p-1 bg-white/95 backdrop-blur-md rounded-xl border border-[#E7E2D6] shadow-sm text-xs font-semibold text-[#0E4B68]">
        <button
          type="button"
          onClick={() => zoomToIsland('Both')}
          className="px-2.5 py-1.5 rounded-lg hover:bg-[#F2EFE9] transition-colors cursor-pointer flex items-center gap-1"
        >
          <Compass className="w-3.5 h-3.5 text-amber-600" />
          <span>Both Islands</span>
        </button>
        <button
          type="button"
          onClick={() => zoomToIsland('Big Corn')}
          className="px-2.5 py-1.5 rounded-lg hover:bg-[#F2EFE9] transition-colors cursor-pointer flex items-center gap-1"
        >
          <Navigation className="w-3.5 h-3.5 text-[#0284C7]" />
          <span>Big Corn (South)</span>
        </button>
        <button
          type="button"
          onClick={() => zoomToIsland('Little Corn')}
          className="px-2.5 py-1.5 rounded-lg hover:bg-[#F2EFE9] transition-colors cursor-pointer flex items-center gap-1"
        >
          <MapPin className="w-3.5 h-3.5 text-teal-600" />
          <span>Little Corn (North)</span>
        </button>
      </div>

      {/* Legend & Count badge */}
      <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-[#E7E2D6] shadow-sm text-xs text-[#54687A] flex items-center gap-3">
        <span className="font-semibold text-[#0E4B68]">{spots.length} spots mapped</span>
        <div className="hidden sm:flex items-center gap-2 text-[11px]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#0284C7]"></span> Beaches
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#D97706]"></span> Food
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#0E4B68]"></span> Activities
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#0D9488]"></span> Tips
          </span>
        </div>
      </div>
    </div>
  );
}
