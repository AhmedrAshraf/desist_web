"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { HeroSection } from "../../components/HeroSection";
import LocationPermissionHandler from "../../components/LocationPermissionHandler";

interface Attorney {
  id: string;
  name: string;
  specialization: string;
  location: string;
  detailedLocation: string;
  rating: number;
  cases: number;
  image: string;
  languages: string[];
  featured: boolean;
  phone?: string;
  website?: string;
  address?: string;
  email?: string;
  barNumber?: string;
  education?: string[];
  experience?: string;
  lat?: number;
  lng?: number;
}

interface Lawyer {
  id: string;
  name: string;
  specialization: string[];
  address: string;
  phone: string;
  email: string;
  rating: number;
  latitude: number;
  longitude: number;
  website?: string;
}

// Sample data for demonstration
const practiceAreas = [
  "Immigration Law",
  "Family Law",
  "Criminal Law",
  "Corporate Law",
  "Real Estate Law",
  "Personal Injury",
  "Estate Planning",
  "Bankruptcy Law",
  "Employment Law",
  "Intellectual Property"
];

const RADIUS_STEPS = [50, 100, 200, 500]; // radius in kilometers
// const MAX_RADIUS = 500;
const MAX_ADDRESS_LENGTH = 80;
const MAX_NAME_LENGTH = 25;

const truncateAddress = (address: string) => {
  if (address.length <= MAX_ADDRESS_LENGTH) return address;
  return address.substring(0, MAX_ADDRESS_LENGTH) + '...';
};

const truncateName = (name: string) => {
  if (name.length <= MAX_NAME_LENGTH) return name;
  return name.substring(0, MAX_NAME_LENGTH) + '...';
};

export default function AllAttorneysPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [attorneys, setAttorneys] = useState<Attorney[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [currentRadius, setCurrentRadius] = useState(RADIUS_STEPS[0]);

  const addLog = (message: string) => {
    const timestamp = new Date().toISOString(); 
    console.log(`${timestamp}: ${message}`);
  };

  const fetchAttorneys = useCallback(async (lat: number, lng: number) => {
    try {
      const response = await fetch(`/api/lawyers?lat=${lat}&lng=${lng}&radius=${currentRadius}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAttorneys(data.lawyers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching attorneys:', error);
      setError('Failed to fetch attorneys. Please try again later.');
      setLoading(false);
    }
  }, [currentRadius]);

  const handleLocationGranted = useCallback(async (position: GeolocationPosition) => {
    const { latitude: lat, longitude: lng } = position.coords;
    addLog(`Location obtained: ${lat}, ${lng}`);
    setUserLocation({ lat, lng });
    await fetchAttorneys(lat, lng);
  }, [fetchAttorneys]);

  const handleLocationDenied = useCallback(() => {
    addLog('Location access denied');
    setError('Location access was denied. Please enable location access in your browser settings to use this feature.');
    setLoading(false);
  }, []);

  const handleLocationError = useCallback((error: GeolocationPositionError) => {
    addLog(`Geolocation error: ${error.message}`);
    setError('Location access was denied. Please enable location access in your browser settings to use this feature.');
    setLoading(false);
  }, []);

  useEffect(() => {
    addLog("Component mounted");
  }, []);

  const specializations = practiceAreas;
  const locations = Array.from(new Set(attorneys.map(a => a.location)));

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const filteredAttorneys = attorneys.filter(attorney => {
    const matchesSearch = attorney.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         attorney.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialization = !selectedSpecialization || attorney.specialization === selectedSpecialization;
    const matchesLocation = !selectedLocation || attorney.location === selectedLocation;
    
    // Add distance filtering if user location is available
    let matchesDistance = true;
    if (userLocation && attorney.lat && attorney.lng) {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        attorney.lat,
        attorney.lng
      );
      matchesDistance = distance <= currentRadius;
    }

    return matchesSearch && matchesSpecialization && matchesLocation && matchesDistance;
  }).sort((a, b) => {
    // First sort by featured status
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    // Then sort by rating
    return b.rating - a.rating;
  });

  // Add detailed debug logs
  console.log('Filtering Debug:', {
    totalAttorneys: attorneys.length,
    filteredCount: filteredAttorneys.length,
    searchQuery,
    selectedSpecialization,
    selectedLocation,
    currentRadius,
    userLocation,
    filterConditions: {
      hasSearchQuery: searchQuery.length > 0,
      hasSpecialization: selectedSpecialization.length > 0,
      hasLocation: selectedLocation.length > 0,
      hasUserLocation: !!userLocation
    }
  });

  const displayedAttorneys = filteredAttorneys; // Remove slice since we're only showing 5

  const handleRadiusChange = (radius: number) => {
    setCurrentRadius(radius);
    addLog(`Radius changed to ${radius}km`);
    if (userLocation) {
      fetchAttorneys(userLocation.lat, userLocation.lng);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Finding attorneys near you...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button 
            onClick={() => {
              addLog("Retrying location initialization");
              setError(null);
              setLoading(true);
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <LocationPermissionHandler
      onLocationGranted={handleLocationGranted}
      onLocationDenied={handleLocationDenied}
      onLocationError={handleLocationError}
    >
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <HeroSection
          title="All Attorneys"
          description="Browse our complete directory of legal professionals and find the right attorney for your needs."
          imageSrc="/images/legal/legal-team.jpg"
          imageAlt="Legal professionals working together"
        />

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Filters and Search */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Search by name or specialization..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <select
                    value={selectedSpecialization}
                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">All Specializations</option>
                    {specializations.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">All Locations</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={currentRadius}
                    onChange={(e) => handleRadiusChange(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {RADIUS_STEPS.map(radius => (
                      <option key={radius} value={radius}>
                        Within {radius}km
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex justify-between items-center mb-6">
              {/* <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {displayedAttorneys.length} of {filteredAttorneys.length} attorneys
                {userLocation && (
                  <span className="ml-2">
                    within {currentRadius}km of your location
                  </span>
                )}
              </div> */}
              <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Attorneys List/Grid */}
            {filteredAttorneys.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No attorneys found matching your criteria.</p>
              </div>
            ) : viewMode === 'grid' ? (
              <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayedAttorneys.map((attorney) => (
                  <motion.div
                    key={attorney.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative ${
                      attorney.featured 
                        ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30' 
                        : 'bg-white dark:bg-gray-800'
                    } rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                      attorney.featured ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
                    }`}
                  >
                    {attorney.featured && (
                      <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg font-medium text-sm">
                        Featured
                      </div>
                    )}
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-4">
                        {/* <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          attorney.featured 
                            ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white' 
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}> */}
                          {/* <span className="text-2xl">👨‍⚖️</span> */}
                        {/* </div> */}
                        <div>
                          <h3 className={`text-xl font-semibold ${
                            attorney.featured 
                              ? 'text-blue-900 dark:text-blue-100' 
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {truncateName(attorney.name)}
                          </h3>
                          <p className={`${
                            attorney.featured 
                              ? 'text-blue-700 dark:text-blue-300' 
                              : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {attorney.specialization}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4 flex-grow">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">★</span>
                          <span className={`${
                            attorney.featured 
                              ? 'text-blue-900 dark:text-blue-100' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {attorney.rating} Rating
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`${
                            attorney.featured 
                              ? 'text-blue-900 dark:text-blue-100' 
                              : 'text-gray-700 dark:text-gray-300'
                            } ${attorney.detailedLocation.length > MAX_ADDRESS_LENGTH ? 'text-sm' : ''}`}>
                              📍 {truncateAddress(attorney.detailedLocation)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`${
                            attorney.featured 
                              ? 'text-blue-900 dark:text-blue-100' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {attorney.cases}+ cases handled
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {attorney.languages.map((lang) => (
                          <span
                            key={lang}
                            className={`px-3 py-1 rounded-full text-sm ${
                              attorney.featured
                                ? 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                                : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                            }`}
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                      <button className={`w-full py-2 rounded-lg transition-colors mt-auto ${
                        attorney.featured
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}>
                        Contact Attorney
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              </>
            ) : (
              <>
              <div className="grid gap-6">
                  {displayedAttorneys.map((attorney) => (
                  <motion.div
                    key={attorney.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative ${
                      attorney.featured 
                        ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30' 
                        : 'bg-white dark:bg-gray-700'
                    } rounded-xl shadow-lg p-6 ${
                      attorney.featured ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
                    }`}
                  >
                    {attorney.featured && (
                      <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg font-medium text-sm">
                        Featured
                      </div>
                    )}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          attorney.featured 
                            ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white' 
                            : 'bg-gray-200 dark:bg-gray-600'
                        }`}>
                          <span className="text-2xl">👨‍⚖️</span>
                        </div>
                        <div className="flex-grow">
                          <h3 className={`text-xl font-semibold ${
                            attorney.featured 
                              ? 'text-blue-900 dark:text-blue-100' 
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {truncateName(attorney.name)}
                          </h3>
                          <p className={`${
                            attorney.featured 
                              ? 'text-blue-700 dark:text-blue-300' 
                              : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {attorney.specialization}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-yellow-400">★</span>
                            <span className={`${
                              attorney.featured 
                                ? 'text-blue-900 dark:text-blue-100' 
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {attorney.rating}
                            </span>
                            <span className="text-gray-400">|</span>
                            <span className={`${
                              attorney.featured 
                                ? 'text-blue-900 dark:text-blue-100' 
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {attorney.cases}+ cases
                            </span>
                            <span className="text-gray-400">|</span>
                            <span className={`${
                              attorney.featured 
                                ? 'text-blue-900 dark:text-blue-100' 
                                : 'text-gray-700 dark:text-gray-300'
                              } ${attorney.detailedLocation.length > MAX_ADDRESS_LENGTH ? 'text-sm' : ''}`}>
                                📍 {truncateAddress(attorney.detailedLocation)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {attorney.languages.map((lang) => (
                          <span
                            key={lang}
                            className={`px-3 py-1 rounded-full text-sm ${
                              attorney.featured
                                ? 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                                : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                            }`}
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                      <button className={`w-full py-2 rounded-lg transition-colors ${
                        attorney.featured
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}>
                        Contact Attorney
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              </>
            )}
          </div>
        </section>
      </div>
    </LocationPermissionHandler>
  );
} 