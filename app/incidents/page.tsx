"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import supabase from "../../utils/supabase";
import DynamicMap from "../components/DynamicMap";
import { StatsDisplay } from "../components/StatsDisplay";
import { FeatureGrid } from "../components/FeatureGrid";
import { CallToAction } from "../components/CallToAction";
import { PageHero } from "../components/PageHero";
import { HeroSection } from "../components/HeroSection";

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
  address: incident.address
});

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');

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
          <motion.a
            href="#view-map"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            View Map
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Controls */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Recent Incidents
                </h2>
                <div className="flex items-center gap-4">
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
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Loading incidents...</p>
                </div>
              ) : incidents.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">No incidents reported yet.</p>
                </div>
              ) : viewMode === 'list' ? (
                <div className="grid gap-6">
                  {filteredIncidents.map((incident) => (
                    <motion.div
                      key={incident.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {incident.type}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(incident.created_at)}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(incident.status)}`}>
                          {incident.status}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {incident.description}
                      </p>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        📍 {incident.address}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <DynamicMap
                  locations={filteredIncidents.map(transformIncidentToLocation)}
                  type="incidents"
                />
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
      />
    </div>
  );
} 