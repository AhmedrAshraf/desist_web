"use client";
import { motion } from "framer-motion";
import { HeroSection } from "../components/HeroSection";
import { StatsDisplay } from "../components/StatsDisplay";
import { MessageBoard } from "./components/MessageBoard";
import { LocalEvents } from "./components/LocalEvents";
import { AppDownloadCTA } from "../components/AppDownloadCTA";
import { useState, useEffect } from "react";
import supabase from "../../utils/supabase";

interface Event {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  date: string;
  type: string;
  organizer: string;
}

export default function CommunityPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true })
        .limit(5); // Only fetch the next 5 upcoming events

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const communityStats = [
    {
      value: "500+",
      label: "Active Reports",
      icon: "🚨",
      color: "bg-red-100 dark:bg-red-900/30"
    },
    {
      value: "1000+",
      label: "Community Members",
      icon: "👥",
      color: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      value: "50+",
      label: "Local Events",
      icon: "📅",
      color: "bg-green-100 dark:bg-green-900/30"
    },
    {
      value: "24/7",
      label: "Support Available",
      icon: "💪",
      color: "bg-purple-100 dark:bg-purple-900/30"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="pt-0">
        <HeroSection
          title="Community Hub"
          description="Join forces with your local community to create safer neighborhoods and support those in need."
          imageSrc="/images/community/community-hero.jpg"
          imageAlt="Community members working together"
        >
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                View Events
              </motion.button>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 max-w-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">Community Impact</h2>
              <div className="grid md:grid-cols-3 gap-4 text-white">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-bold">Active Reports</div>
                  <div className="text-xl">500+</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-bold">Members</div>
                  <div className="text-xl">1,000+</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-bold">Events</div>
                  <div className="text-xl">50+</div>
                </div>
              </div>
            </div>
          </div>
        </HeroSection>

        {/* Community Stats */}
        <StatsDisplay
          title="Community Impact"
          description="Together, we're building stronger and safer communities"
          stats={communityStats}
        />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-0">
            <LocalEvents events={events} loading={loading} formatDate={formatDate} />
            <MessageBoard />
            <AppDownloadCTA />
          </div>
        </div>
      </div>
    </div>
  );
} 