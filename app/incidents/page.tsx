"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import supabase from "../../utils/supabase";

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

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-purple-600 opacity-90" />
        <div className="absolute inset-0 bg-[url('/community-pattern.svg')] opacity-10" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Incident Reports
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Together we can make our community safer. Report incidents and stay informed about what's happening in your area.
            </p>

            <Link
              href="/incidents/report"
              className="inline-flex items-center px-8 py-4 bg-white text-red-600 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-50 transition-colors group"
            >
              <span className="mr-2">Report an Incident</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="text-3xl font-bold text-white mb-1">
                {incidents.length}
              </div>
              <div className="text-white/80">Total Reports</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="text-3xl font-bold text-white mb-1">
                {incidents.filter(i => i.status === "active").length}
              </div>
              <div className="text-white/80">Active Cases</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="text-3xl font-bold text-white mb-1">
                {incidents.filter(i => i.status === "resolved").length}
              </div>
              <div className="text-white/80">Resolved</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Incidents List */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Filters */}
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
                </div>
              </div>
            </div>

            {/* Incidents Grid */}
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
              ) : (
                <div className="grid gap-6">
                  {incidents
                    .filter(incident => filter === "all" || incident.status === filter)
                    .map((incident) => (
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
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 