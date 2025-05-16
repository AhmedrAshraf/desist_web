"use client";
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapLocation {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  type: string;
  date: string;
  address: string;
  status?: string;
}

interface DynamicMapProps {
  locations: MapLocation[];
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
}

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

function getUserLocation(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        () => {
          // Default to San Francisco if geolocation fails
          resolve({ lat: 37.7749, lng: -122.4194 });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  });
}

export default function DynamicMap({ locations, center: initialCenter, zoom: initialZoom = 12 }: DynamicMapProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [mapZoom, setMapZoom] = useState(initialZoom);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      // Get user location or use default
      const { lat, lng } = await getUserLocation();

      // Set center based on priority:
      // 1. Provided center
      // 2. User location
      // 3. Default location (handled in getUserLocation)
      if (initialCenter) {
        setMapCenter([initialCenter.lat, initialCenter.lng]);
      } else {
        setMapCenter([lat, lng]);
      }
    };

    initializeMap();
  }, [initialCenter]);

  const getMarkerColor = (item: MapLocation) => {
    if (item.type.toLowerCase() === 'incidents') {
      switch (item.status?.toLowerCase()) {
        case 'active':
          return 'red';
        case 'resolved':
          return 'green';
        case 'investigating':
          return 'orange';
        default:
          return 'gray';
      }
    }
    return 'blue';
  };

  const createCustomIcon = (color: string) => {
    return L.divIcon({
      html: `
        <div style="
          background-color: ${color};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 4px rgba(0,0,0,0.4);
        "></div>
      `,
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  const handleViewAllClick = () => {
    if (locations.length > 0 && mapInstance) {
      const bounds = L.latLngBounds(
        locations.map(loc => [loc.latitude, loc.longitude])
      );
      mapInstance.fitBounds(bounds, { padding: [50, 50] });
    }
  };

  if (!mapCenter) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="w-full h-full"
        style={{ background: '#f0f0f0' }}
        ref={setMapInstance}
      >
        <ChangeView center={mapCenter} zoom={mapZoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {userLocation && (
          <Marker
            position={userLocation}
            icon={createCustomIcon('blue')}
          >
            <Popup>
              <div className="text-sm">
                <strong>Your Location</strong>
              </div>
            </Popup>
          </Marker>
        )}

        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={50}
          spiderfyOnMaxZoom={true}
          showCoverageOnHover={false}
        >
          {locations.map((item) => (
            <Marker
              key={item.id}
              position={[item.latitude, item.longitude]}
              icon={createCustomIcon(getMarkerColor(item))}
            >
              <Popup>
                <div className="text-sm">
                  <strong className="block mb-1">{item.title}</strong>
                  <p className="mb-1">{item.description}</p>
                  <p className="text-gray-600">{item.address}</p>
                  {item.date && (
                    <p className="text-gray-600 mt-1">{new Date(item.date).toLocaleDateString()}</p>
                  )}
                  {item.status && (
                    <span className={`
                      inline-block px-2 py-1 mt-2 rounded-full text-xs
                      ${item.status.toLowerCase() === 'active' ? 'bg-red-100 text-red-800' :
                        item.status.toLowerCase() === 'resolved' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'}
                    `}>
                      {item.status}
                    </span>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      <div className="absolute bottom-4 right-4 z-[1000] flex gap-2">
        <button
          onClick={() => userLocation && mapInstance?.setView(userLocation, mapZoom)}
          className="px-4 py-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          Center on Me
        </button>
        <button
          onClick={handleViewAllClick}
          className="px-4 py-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          View All
        </button>
      </div>
    </div>
  );
} 