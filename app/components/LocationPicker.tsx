import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
}

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [address, setAddress] = useState<string>('');
  const [isLocating, setIsLocating] = useState(false);

  // Function to get address from coordinates
  const getAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error('Error fetching address:', error);
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  };

  // Function to update location
  const updateLocation = async (lat: number, lng: number) => {
    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.setView([lat, lng], 16);
      markerRef.current.setLatLng([lat, lng]);
      const newAddress = await getAddressFromCoords(lat, lng);
      setAddress(newAddress);
      onLocationSelect({ lat, lng, address: newAddress });
    }
  };

  // Function to get user's location
  const getUserLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          await updateLocation(lat, lng);
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
          // Fall back to default location (San Francisco)
          updateLocation(37.7749, -122.4194);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
      setIsLocating(false);
      // Fall back to default location
      updateLocation(37.7749, -122.4194);
    }
  };

  useEffect(() => {
    // Fix Leaflet default icon path issues
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    if (!mapInstanceRef.current && mapRef.current) {
      // Initialize with a default location (will be updated by geolocation)
      const initialLocation = { lat: 37.7749, lng: -122.4194 };
      const mapInstance = L.map(mapRef.current).setView([initialLocation.lat, initialLocation.lng], 13);

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance);

      // Add marker
      const markerInstance = L.marker([initialLocation.lat, initialLocation.lng], {
        draggable: true
      }).addTo(mapInstance);

      // Add locate control
      const locateControl = L.Control.extend({
        onAdd: function() {
          const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
          const button = L.DomUtil.create('a', 'leaflet-control-locate', container);
          button.innerHTML = '📍';
          button.href = '#';
          button.title = 'Show my location';
          button.style.fontSize = '18px';
          button.style.display = 'flex';
          button.style.alignItems = 'center';
          button.style.justifyContent = 'center';
          button.style.width = '34px';
          button.style.height = '34px';
          
          button.onclick = (e) => {
            e.preventDefault();
            getUserLocation();
          };
          
          return container;
        }
      });

      mapInstance.addControl(new locateControl({ position: 'topleft' }));

      // Handle map clicks
      mapInstance.on('click', async (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        await updateLocation(lat, lng);
      });

      // Handle marker drag
      markerInstance.on('dragend', async () => {
        const position = markerInstance.getLatLng();
        await updateLocation(position.lat, position.lng);
      });

      // Add search control
      // const searchControl = L.Control.extend({
      //   onAdd: function() {
      //     const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-search');
      //     const input = L.DomUtil.create('input', 'search-input', container);
      //     input.type = 'text';
      //     input.placeholder = 'Search for a location';
          
      //     input.addEventListener('keypress', async (e) => {
      //       if (e.key === 'Enter') {
      //         e.preventDefault();
      //         const searchQuery = (e.target as HTMLInputElement).value;
      //         try {
      //           const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`);
      //           const data = await response.json();
      //           if (data.length > 0) {
      //             const { lat, lon, display_name } = data[0];
      //             await updateLocation(Number(lat), Number(lon));
      //           }
      //         } catch (error) {
      //           console.error('Error searching location:', error);
      //         }
      //       }
      //     });

      //     return container;
      //   }
      // });

      // mapInstance.addControl(new searchControl({ position: 'topleft' }));

      // Store references
      mapInstanceRef.current = mapInstance;
      markerRef.current = markerInstance;

      // Force a resize after initialization to ensure proper rendering
      setTimeout(() => {
        mapInstance.invalidateSize();
      }, 100);

      // Get user's location after map initialization
      getUserLocation();
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full space-y-4">
      <div 
        ref={mapRef} 
        className="w-full h-[400px] rounded-lg shadow-md"
        style={{ minHeight: '400px' }}
      />
      {isLocating && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">Getting your location...</p>
        </div>
      )}
      {address && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Selected location: {address}
          </p>
        </div>
      )}
      <style jsx global>{`
        .leaflet-control-search .search-input {
          margin: 10px;
          padding: 8px 12px;
          border-radius: 4px;
          border: 1px solid #ccc;
          width: 300px;
          font-size: 14px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          background: white;
        }
        .leaflet-control-search {
          clear: none !important;
        }
        .leaflet-control-locate {
          background: white;
          text-decoration: none;
        }
        .leaflet-control-locate:hover {
          background: #f4f4f4;
        }
      `}</style>
    </div>
  );
} 