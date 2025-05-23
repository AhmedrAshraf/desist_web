"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { HeroSection } from "../../components/HeroSection";

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

// Sample attorneys data
const sampleAttorneys: Attorney[] = [
  {
    id: "1",
    name: "Advocate Ahmed Khan",
    specialization: "Criminal Law",
    location: "Karachi",
    detailedLocation: "Office #302, 3rd Floor, Al-Habib Plaza, Block 6, PECHS, Karachi",
    rating: 4.8,
    cases: 220,
    image: "/images/attorneys/attorney1.jpg",
    languages: ["English", "Urdu", "Sindhi"],
    featured: true,
    phone: "+92 300 1234567",
    email: "ahmed.khan@example.com",
    barNumber: "BAR123456",
    education: ["Karachi University", "LLB"],
    experience: "18 years of experience in criminal law"
  },
  {
    id: "2",
    name: "Barrister Sarah Malik",
    specialization: "Corporate Law",
    location: "Karachi",
    detailedLocation: "Suite 405, 4th Floor, Business Center, Clifton Block 5, Karachi",
    rating: 4.7,
    cases: 150,
    image: "/images/attorneys/attorney2.jpg",
    languages: ["English", "Urdu"],
    featured: true,
    phone: "+92 300 2345678",
    email: "sarah.malik@example.com",
    barNumber: "BAR234567",
    education: ["Lincoln's Inn", "Barrister-at-Law"],
    experience: "12 years of experience in corporate law"
  },
  {
    id: "3",
    name: "Advocate Usman Ali",
    specialization: "Family Law",
    location: "Karachi",
    detailedLocation: "Office #201, 2nd Floor, Gulshan-e-Iqbal Block 7, Karachi",
    rating: 4.9,
    cases: 180,
    image: "/images/attorneys/attorney3.jpg",
    languages: ["English", "Urdu", "Punjabi"],
    featured: true,
    phone: "+92 300 3456789",
    email: "usman.ali@example.com",
    barNumber: "BAR345678",
    education: ["Punjab University", "LLB"],
    experience: "15 years of experience in family law"
  },
  {
    id: "4",
    name: "Ahmed Khan",
    specialization: "Criminal Law",
    location: "Karachi Division, Pakistan",
    detailedLocation: "Address not available",
    rating: 4.8,
    cases: 220,
    image: "/images/attorneys/attorney4.jpg",
    languages: ["English", "Urdu", "Sindhi"],
    featured: false,
    phone: "+92 (555) 456-7890",
    email: "ahmed.khan@example.com",
    barNumber: "BAR456789",
    education: ["Oxford Law School", "JD"],
    experience: "18 years of experience in criminal law"
  },
  {
    id: "5",
    name: "Advocate Fatima Zahra",
    specialization: "Family Law",
    location: "Lahore",
    detailedLocation: "Office #501, 5th Floor, Liberty Plaza, Gulberg III, Lahore",
    rating: 4.7,
    cases: 160,
    image: "/images/attorneys/attorney5.jpg",
    languages: ["English", "Urdu", "Punjabi"],
    featured: false,
    phone: "+92 300 5678901",
    email: "fatima.zahra@example.com",
    barNumber: "BAR567890",
    education: ["Lahore University", "LLB"],
    experience: "10 years of experience in family law"
  },
  {
    id: "6",
    name: "Barrister Muhammad Ali",
    specialization: "Corporate Law",
    location: "Islamabad",
    detailedLocation: "Suite 202, Blue Area, Jinnah Avenue, Islamabad",
    rating: 4.6,
    cases: 140,
    image: "/images/attorneys/attorney6.jpg",
    languages: ["English", "Urdu"],
    featured: false,
    phone: "+92 300 6789012",
    email: "muhammad.ali@example.com",
    barNumber: "BAR678901",
    education: ["Cambridge University", "Barrister-at-Law"],
    experience: "8 years of experience in corporate law"
  },
  {
    id: "7",
    name: "Advocate Ayesha Khan",
    specialization: "Criminal Law",
    location: "Karachi",
    detailedLocation: "Office #103, 1st Floor, Defence Plaza, Clifton, Karachi",
    rating: 4.5,
    cases: 120,
    image: "/images/attorneys/attorney7.jpg",
    languages: ["English", "Urdu", "Sindhi"],
    featured: false,
    phone: "+92 300 7890123",
    email: "ayesha.khan@example.com",
    barNumber: "BAR789012",
    education: ["Karachi University", "LLB"],
    experience: "6 years of experience in criminal law"
  },
  {
    id: "8",
    name: "Barrister Hassan Raza",
    specialization: "Immigration Law",
    location: "Lahore",
    detailedLocation: "Suite 305, 3rd Floor, Mall Road, Lahore",
    rating: 4.4,
    cases: 100,
    image: "/images/attorneys/attorney8.jpg",
    languages: ["English", "Urdu", "Punjabi"],
    featured: false,
    phone: "+92 300 8901234",
    email: "hassan.raza@example.com",
    barNumber: "BAR890123",
    education: ["Lincoln's Inn", "Barrister-at-Law"],
    experience: "5 years of experience in immigration law"
  },
  {
    id: "9",
    name: "Advocate Zainab Ali",
    specialization: "Family Law",
    location: "Islamabad",
    detailedLocation: "Office #402, 4th Floor, Centaurus Mall, Islamabad",
    rating: 4.3,
    cases: 90,
    image: "/images/attorneys/attorney9.jpg",
    languages: ["English", "Urdu"],
    featured: false,
    phone: "+92 300 9012345",
    email: "zainab.ali@example.com",
    barNumber: "BAR901234",
    education: ["Islamabad University", "LLB"],
    experience: "4 years of experience in family law"
  },
  {
    id: "10",
    name: "Advocate Bilal Khan",
    specialization: "Corporate Law",
    location: "Karachi",
    detailedLocation: "Office #601, 6th Floor, Bahria Complex, Clifton, Karachi",
    rating: 4.2,
    cases: 85,
    image: "/images/attorneys/attorney10.jpg",
    languages: ["English", "Urdu"],
    featured: false,
    phone: "+92 300 0123456",
    email: "bilal.khan@example.com",
    barNumber: "BAR012345",
    education: ["Karachi University", "LLB"],
    experience: "4 years of experience in corporate law"
  },
  {
    id: "11",
    name: "Barrister Sana Malik",
    specialization: "Family Law",
    location: "Lahore",
    detailedLocation: "Suite 401, 4th Floor, Gulberg V, Lahore",
    rating: 4.1,
    cases: 80,
    image: "/images/attorneys/attorney11.jpg",
    languages: ["English", "Urdu", "Punjabi"],
    featured: false,
    phone: "+92 300 1234567",
    email: "sana.malik@example.com",
    barNumber: "BAR123456",
    education: ["Lincoln's Inn", "Barrister-at-Law"],
    experience: "3 years of experience in family law"
  },
  {
    id: "12",
    name: "Advocate Omar Ali",
    specialization: "Criminal Law",
    location: "Islamabad",
    detailedLocation: "Office #303, 3rd Floor, F-8 Markaz, Islamabad",
    rating: 4.0,
    cases: 75,
    image: "/images/attorneys/attorney12.jpg",
    languages: ["English", "Urdu"],
    featured: false,
    phone: "+92 300 2345678",
    email: "omar.ali@example.com",
    barNumber: "BAR234567",
    education: ["Islamabad University", "LLB"],
    experience: "3 years of experience in criminal law"
  },
  {
    id: "13",
    name: "Barrister Hina Khan",
    specialization: "Immigration Law",
    location: "Karachi",
    detailedLocation: "Suite 502, 5th Floor, Defence Housing Authority, Karachi",
    rating: 3.9,
    cases: 70,
    image: "/images/attorneys/attorney13.jpg",
    languages: ["English", "Urdu", "Sindhi"],
    featured: false,
    phone: "+92 300 3456789",
    email: "hina.khan@example.com",
    barNumber: "BAR345678",
    education: ["Lincoln's Inn", "Barrister-at-Law"],
    experience: "2 years of experience in immigration law"
  },
  {
    id: "14",
    name: "Advocate Faisal Raza",
    specialization: "Corporate Law",
    location: "Lahore",
    detailedLocation: "Office #202, 2nd Floor, Gulberg III, Lahore",
    rating: 3.8,
    cases: 65,
    image: "/images/attorneys/attorney14.jpg",
    languages: ["English", "Urdu"],
    featured: false,
    phone: "+92 300 4567890",
    email: "faisal.raza@example.com",
    barNumber: "BAR456789",
    education: ["Lahore University", "LLB"],
    experience: "2 years of experience in corporate law"
  },
  {
    id: "15",
    name: "Barrister Ayesha Malik",
    specialization: "Family Law",
    location: "Islamabad",
    detailedLocation: "Suite 301, 3rd Floor, Blue Area, Islamabad",
    rating: 3.7,
    cases: 60,
    image: "/images/attorneys/attorney15.jpg",
    languages: ["English", "Urdu", "Punjabi"],
    featured: false,
    phone: "+92 300 5678901",
    email: "ayesha.malik@example.com",
    barNumber: "BAR567890",
    education: ["Cambridge University", "Barrister-at-Law"],
    experience: "1 year of experience in family law"
  }
];

const RADIUS_STEPS = [50, 100, 200, 500]; // radius in kilometers
// const MAX_RADIUS = 500;
const MAX_ADDRESS_LENGTH = 80;

const truncateAddress = (address: string) => {
  if (address.length <= MAX_ADDRESS_LENGTH) return address;
  return address.substring(0, MAX_ADDRESS_LENGTH) + '...';
};

// Define attorney element type
type AttorneyElement = {
  id: string;
  lat: number;
  lon: number;
  tags: {
    name?: string;
    'addr:city'?: string;
    'addr:state'?: string;
    'addr:street'?: string;
    'addr:postcode'?: string;
    'addr:housenumber'?: string;
    'addr:full'?: string;
    phone?: string;
    website?: string;
    email?: string;
    opening_hours?: string;
    office?: string;
  };
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
  // const [nearbyCities, setNearbyCities] = useState<string[]>([]);
  // const [logs, setLogs] = useState<string[]>([]);
  const [currentRadius, setCurrentRadius] = useState(RADIUS_STEPS[0]);
  // const [searchAttempts, setSearchAttempts] = useState(0);
  const [displayCount, setDisplayCount] = useState(5); // Changed to 5 for initial display
  const [loadingMore, setLoadingMore] = useState(false);

  const addLog = (message: string) => {
    const timestamp = new Date().toISOString();
    // setLogs(prev => [...prev, `${timestamp}: ${message}`]);
    console.log(`${timestamp}: ${message}`);
  };

  const initializeLocation = useCallback(async () => {
    addLog("Initializing location services");
    if ("geolocation" in navigator) {
      try {
        addLog("Requesting user location");
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            addLog(`Location received: ${latitude}, ${longitude}`);
            setUserLocation({ lat: latitude, lng: longitude });
            await fetchAttorneys(latitude, longitude);
          },
          (error) => {
            const errorMessage = `Location error: ${error.message}`;
            addLog(errorMessage);
            setError("Unable to get your location. Please enable location services.");
            setLoading(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      } catch (err) {
        const errorMessage = `Geolocation error: ${err instanceof Error ? err.message : 'Unknown error'}`;
        addLog(errorMessage);
        setError("Error accessing location services");
        setLoading(false);
      }
    } else {
      addLog("Geolocation not supported");
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    addLog("Component mounted");
    initializeLocation();
  }, [initializeLocation]);

  const fetchAttorneys = async (lat: number, lng: number) => {
    addLog("Fetching attorneys from Overpass API");
    try {
      // Overpass API query to find law firms and lawyers
      const radius = 5000; // 5km radius
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="lawyer"](around:${radius},${lat},${lng});
          node["office"="lawyer"](around:${radius},${lat},${lng});
          node["office"="attorney"](around:${radius},${lat},${lng});
          way["amenity"="lawyer"](around:${radius},${lat},${lng});
          way["office"="lawyer"](around:${radius},${lat},${lng});
          way["office"="attorney"](around:${radius},${lat},${lng});
        );
        out body;
        >;
        out skel qt;
      `;

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      addLog(`Found ${data.elements?.length || 0} legal professionals`);

      if (!data.elements || data.elements.length === 0) {
        // If no results from Overpass, use sample data
        addLog("No results from Overpass API, using sample data");
        // Use the full sampleAttorneys array instead of just 3 attorneys
        const attorneysWithLocation = sampleAttorneys.map(attorney => ({
          ...attorney,
          lat: lat + (Math.random() * 0.02 - 0.01), // Add some random variation to coordinates
          lng: lng + (Math.random() * 0.02 - 0.01)
        }));
        setAttorneys(attorneysWithLocation);
      } else {
        // Transform Overpass data to attorney format
        const transformedAttorneys = data.elements.map((element: AttorneyElement, index: number) => {
          const rating = Math.round((4.5 + Math.random() * 0.5) * 10) / 10; // Round to 1 decimal place
          const detailedAddress = [
            element.tags["addr:street"],
            element.tags["addr:housenumber"],
            element.tags["addr:postcode"],
            element.tags["addr:city"],
            element.tags["addr:state"],
            "Pakistan"
          ].filter(Boolean).join(", ");

          return {
            id: element.id.toString(),
            name: element.tags.name || `Legal Professional ${index + 1}`,
            specialization: element.tags.office || "General Practice",
            location: element.tags["addr:city"] || "Karachi",
            detailedLocation: detailedAddress || "Address not available",
            rating: rating,
            cases: Math.floor(Math.random() * 200) + 50,
            image: `/images/attorneys/attorney${(index % 3) + 1}.jpg`,
            languages: ["English", "Urdu"],
            featured: Math.random() > 0.5,
            phone: element.tags.phone,
            website: element.tags.website,
            address: element.tags["addr:full"] || element.tags["addr:street"],
            lat: element.lat,
            lng: element.lon
          };
        });
        setAttorneys(transformedAttorneys);
      }
      
      setLoading(false);
    } catch (err) {
      const errorMessage = `Error fetching attorneys: ${err instanceof Error ? err.message : 'Unknown error'}`;
      addLog(errorMessage);
      // Fallback to sample data on error
      addLog("Using sample data due to error");
      // Use the full sampleAttorneys array instead of just 3 attorneys
      const attorneysWithLocation = sampleAttorneys.map(attorney => ({
        ...attorney,
        lat: lat + (Math.random() * 0.02 - 0.01), // Add some random variation to coordinates
        lng: lng + (Math.random() * 0.02 - 0.01)
      }));
      setAttorneys(attorneysWithLocation);
      setLoading(false);
    }
  };

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

  const displayedAttorneys = filteredAttorneys.slice(0, displayCount);
  const hasMore = displayCount < filteredAttorneys.length;

  // Add console logs to track load more button visibility
  console.log('Load More Button Debug:', {
    displayCount,
    totalFilteredAttorneys: filteredAttorneys.length,
    hasMore,
    displayedAttorneysCount: displayedAttorneys.length,
    remainingAttorneys: filteredAttorneys.length - displayCount
  });

  const handleLoadMore = () => {
    setLoadingMore(true);
    // Simulate loading delay
    setTimeout(() => {
      setDisplayCount(prev => {
        const newCount = prev + 5;
        console.log('Updating display count:', {
          previous: prev,
          new: newCount,
          totalAvailable: filteredAttorneys.length
        });
        return newCount;
      });
      setLoadingMore(false);
    }, 500);
  };

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
              initializeLocation();
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
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        attorney.featured 
                          ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}>
                        <span className="text-2xl">👨‍⚖️</span>
                      </div>
                      <div>
                        <h3 className={`text-xl font-semibold ${
                          attorney.featured 
                            ? 'text-blue-900 dark:text-blue-100' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {attorney.name}
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
                    <div className="space-y-2 mb-4">
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
              {hasMore && (
                <div className="mt-12 text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto gap-2"
                  >
                    {loadingMore ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More Attorneys
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        attorney.featured 
                          ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-600'
                      }`}>
                        <span className="text-2xl">👨‍⚖️</span>
                      </div>
                      <div>
                        <h3 className={`text-xl font-semibold ${
                          attorney.featured 
                            ? 'text-blue-900 dark:text-blue-100' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {attorney.name}
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
                    <button className={`px-6 py-2 rounded-lg transition-colors ${
                      attorney.featured
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}>
                      Contact
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
              {hasMore && (
                <div className="mt-12 text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto gap-2"
                  >
                    {loadingMore ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More Attorneys
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
} 