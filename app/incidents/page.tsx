"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import supabase from "../../utils/supabase";
import dynamic from 'next/dynamic';
import { StatsDisplay } from "../components/StatsDisplay";
import { FeatureGrid } from "../components/FeatureGrid";
import { CallToAction } from "../components/CallToAction";
import { HeroSection } from "../components/HeroSection";

const DynamicMap = dynamic(() => import("../components/DynamicMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  ),
});

interface Incident {
  id: number;
  type: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  created_at: string;
  status: string;
}

const transformIncidentToLocation = (incident: Incident) => ({
  id: incident.id,
  title: incident.type || 'Unknown Incident Type',
  description: incident.description,
  latitude: incident.latitude,
  longitude: incident.longitude,
  type: 'incident',
  status: incident.status,
  address: incident.address,
  date: incident.created_at
});

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [listLayout, setListLayout] = useState<'list' | 'grid'>('grid');
  const showAll = false;
  const INITIAL_DISPLAY_COUNT = 3;

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const { data, error } = await supabase
        .from("incidents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setIncidents(data || []);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "investigating":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredIncidents = incidents.filter(
    incident => filter === "all" || incident.status === filter
  );

  const displayedIncidents = showAll ? filteredIncidents : filteredIncidents.slice(0, INITIAL_DISPLAY_COUNT);
  // const hasMoreIncidents = filteredIncidents.length > INITIAL_DISPLAY_COUNT;

  const incidentStats = [
    {
      value: incidents.length.toString(),
      label: "Total Reports",
      icon: "📊",
      color: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      value: incidents.filter(i => i.status === "active").length.toString(),
      label: "Active Cases",
      icon: "🔴",
      color: "bg-red-100 dark:bg-red-900/30"
    },
    {
      value: incidents.filter(i => i.status === "investigating").length.toString(),
      label: "Under Investigation",
      icon: "🔍",
      color: "bg-yellow-100 dark:bg-yellow-900/30"
    },
    {
      value: incidents.filter(i => i.status === "resolved").length.toString(),
      label: "Resolved Cases",
      icon: "✅",
      color: "bg-green-100 dark:bg-green-900/30"
    }
  ];

  const reportingFeatures = [
    {
      icon: "🔒",
      title: "Anonymous Reporting",
      description: "Submit reports without revealing your identity. Your privacy is our priority."
    },
    {
      icon: "📱",
      title: "Mobile Reporting",
      description: "Report incidents on the go using our mobile app."
    },
    {
      icon: "📍",
      title: "Location Tracking",
      description: "Optional location services to help identify incident patterns."
    },
    {
      icon: "🔔",
      title: "Real-time Alerts",
      description: "Get notified about incidents in your area."
    },
    {
      icon: "📸",
      title: "Media Upload",
      description: "Securely upload photos and videos as evidence."
    },
    {
      icon: "👥",
      title: "Community Updates",
      description: "Stay informed about incident resolutions and outcomes."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HeroSection
        title="Incident Reports"
        description="Together we can make our community safer. Report incidents and stay informed about what's happening in your area."
        imageSrc="/images/incidents/command-center.jpg"
        imageAlt="Community incident reporting and tracking"
      >
        <div className="flex gap-4">
          <motion.a
            href="/incidents/report"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            Report Incident
          </motion.a>
        </div>
      </HeroSection>

      {/* Stats Section */}
      <StatsDisplay stats={incidentStats} />

      {/* Reporting Features */}
      <FeatureGrid
        title="Reporting Features"
        description="Powerful tools to help you report and track incidents"
        features={reportingFeatures}
        columns={3}
        variant="bordered"
      />

      {/* Incidents Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Title and View All Link */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recent Incidents
            </h2>
            <a
              href="/incidents/all"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center gap-2"
            >
              View All Incidents
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Controls */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center justify-end gap-4">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">All Incidents</option>
                  <option value="active">Active</option>
                  <option value="resolved">Resolved</option>
                  <option value="investigating">Under Investigation</option>
                </select>
                <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    List
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`px-4 py-2 ${
                      viewMode === 'map'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Map
                  </button>
                </div>
                {viewMode === 'list' && (
                  <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
                    <button
                      onClick={() => setListLayout('list')}
                      className={`px-4 py-2 ${
                        listLayout === 'list'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setListLayout('grid')}
                      className={`px-4 py-2 ${
                        listLayout === 'grid'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : viewMode === 'map' ? (
                <div className="h-[600px] rounded-lg overflow-hidden">
                  <DynamicMap locations={displayedIncidents.map(transformIncidentToLocation)} />
                </div>
              ) : listLayout === 'grid' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedIncidents.map((incident) => (
                    <motion.div
                      key={incident.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {incident.type}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(incident.status)}`}>
                          {incident.status}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3" title={incident.description}>
                        {incident.description}
                      </p>
                      <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <p className="truncate max-w-[250px]" title={incident.address}>
                          📍 {incident.address || 'Location not specified'}
                        </p>
                        <p>🕒 {formatDate(incident.created_at)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {displayedIncidents.map((incident) => (
                    <motion.div
                      key={incident.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {incident.type}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mt-1 line-clamp-2" title={incident.description}>
                            {incident.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="truncate max-w-[250px]" title={incident.address}>
                              📍 {incident.address || 'Location not specified'}
                            </span>
                            <span>🕒 {formatDate(incident.created_at)}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(incident.status)}`}>
                          {incident.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction
        title="Download Our Mobile App"
        description="Report incidents, receive alerts, and stay connected with your community on the go."
        primaryAction={{
          label: "Get the App",
          href: "#download"
        }}
        secondaryAction={{
          label: "Learn More",
          href: "/about"
        }}
        pageType="incidents"
      />
    </div>
  );
} 