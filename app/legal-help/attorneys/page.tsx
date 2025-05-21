"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { HeroSection } from "../../components/HeroSection";

interface Attorney {
  id: number;
  name: string;
  specialization: string;
  location: string;
  rating: number;
  cases: number;
  image: string;
  languages: string[];
  featured: boolean;
}

const attorneys: Attorney[] = [
  {
    id: 1,
    name: "Sarah Martinez",
    specialization: "Immigration Law",
    location: "Los Angeles, CA",
    rating: 4.9,
    cases: 250,
    image: "/placeholder-lawyer-1.jpg",
    languages: ["English", "Spanish"],
    featured: true
  },
  {
    id: 2,
    name: "David Chen",
    specialization: "Civil Rights",
    location: "San Francisco, CA",
    rating: 4.8,
    cases: 180,
    image: "/placeholder-lawyer-2.jpg",
    languages: ["English", "Mandarin", "Cantonese"],
    featured: true
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    specialization: "Immigration & Civil Rights",
    location: "New York, NY",
    rating: 4.7,
    cases: 200,
    image: "/placeholder-lawyer-3.jpg",
    languages: ["English", "Spanish", "Portuguese"],
    featured: false
  },
  {
    id: 4,
    name: "James Wilson",
    specialization: "Human Rights Law",
    location: "Chicago, IL",
    rating: 4.6,
    cases: 150,
    image: "/placeholder-lawyer-4.jpg",
    languages: ["English"],
    featured: false
  },
  {
    id: 5,
    name: "Aisha Patel",
    specialization: "Immigration & Family Law",
    location: "Houston, TX",
    rating: 4.8,
    cases: 220,
    image: "/placeholder-lawyer-5.jpg",
    languages: ["English", "Hindi", "Urdu"],
    featured: false
  }
];

const specializations = Array.from(new Set(attorneys.map(a => a.specialization)));
const locations = Array.from(new Set(attorneys.map(a => a.location)));

export default function AllAttorneysPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAttorneys = attorneys.filter(attorney => {
    const matchesSearch = attorney.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         attorney.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialization = !selectedSpecialization || attorney.specialization === selectedSpecialization;
    const matchesLocation = !selectedLocation || attorney.location === selectedLocation;
    return matchesSearch && matchesSpecialization && matchesLocation;
  });

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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex justify-end mb-6">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAttorneys.map((attorney) => (
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
                        }`}>
                          📍 {attorney.location}
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
          ) : (
            <div className="grid gap-6">
              {filteredAttorneys.map((attorney) => (
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
                          }`}>
                            📍 {attorney.location}
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
          )}
        </div>
      </section>
    </div>
  );
} 