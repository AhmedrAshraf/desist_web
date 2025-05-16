"use client";
import { motion } from "framer-motion";
import { HeroSection } from "../components/HeroSection";
import { StatsDisplay } from "../components/StatsDisplay";
import { FeatureGrid } from "../components/FeatureGrid";
import { CallToAction } from "../components/CallToAction";
import { MessageBoard } from "./components/MessageBoard";
import { IncidentTracker } from "./components/IncidentTracker";
import { LocalEvents } from "./components/LocalEvents";
import { AppDownloadCTA } from "../components/AppDownloadCTA";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../components/ThemeToggle";
import { useState, useEffect } from "react";
import LocationPicker from "../components/LocationPicker";
import supabase from "../../utils/supabase";
import DynamicMap from "../components/DynamicMap";
import { Header } from "../components/Header";

const INCIDENT_TYPES = [
  'ICE Activity',
  'Border Patrol Activity',
  'Checkpoint',
  'Raid in Progress',
  'Suspicious Vehicle',
  'Other Activity'
];

const INCIDENT_DESCRIPTIONS = {
  'ICE Activity': [
    { label: 'Number of officers', type: 'text' },
    { label: 'Vehicle descriptions', type: 'text' },
    { label: 'Badge numbers (if visible)', type: 'text' },
    { label: 'Actions being taken', type: 'text' },
    { label: 'Witnesses present', type: 'text' }
  ],
  'Border Patrol Activity': [
    { label: 'Number of agents', type: 'text' },
    { label: 'Vehicle descriptions', type: 'text' },
    { label: 'Actions being taken', type: 'text' },
    { label: 'Checkpoint or mobile unit', type: 'text' }
  ],
  'Checkpoint': [
    { label: 'Checkpoint location', type: 'text' },
    { label: 'Type of checkpoint', type: 'text' },
    { label: 'Number of officers', type: 'text' },
    { label: 'Vehicle descriptions', type: 'text' },
    { label: 'Specific activities observed', type: 'text' }
  ],
  'Raid in Progress': [
    { label: 'Location of raid', type: 'text' },
    { label: 'Number of officers', type: 'text' },
    { label: 'Vehicle descriptions', type: 'text' },
    { label: 'Type of location (business/residence)', type: 'text' },
    { label: 'Actions being taken', type: 'text' }
  ],
  'Suspicious Vehicle': [
    { label: 'Vehicle description', type: 'text' },
    { label: 'License plate (if visible)', type: 'text' },
    { label: 'Number of occupants', type: 'text' },
    { label: 'Observed behavior', type: 'text' },
    { label: 'Direction of travel', type: 'text' }
  ],
  'Other Activity': [
    { label: 'Please describe the activity in detail', type: 'text' },
    { label: 'Location', type: 'text' },
    { label: 'Personnel involved', type: 'text' },
    { label: 'Vehicles present', type: 'text' },
    { label: 'Actions observed', type: 'text' }
  ]
} as const;

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

const transformEventToLocation = (event: Event) => ({
  id: event.id,
  title: event.title,
  description: event.description,
  latitude: event.latitude,
  longitude: event.longitude,
  type: event.type,
  date: event.date,
  address: event.address
});

export default function CommunityPage() {
  const [formData, setFormData] = useState({
    type: "",
    description: {} as Record<string, string>,
    location: {
      lat: 0,
      lng: 0,
      address: ""
    },
    status: "active",
    attachment: null as File | null,
  });

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const lat = parseFloat(formData.location.lat.toString()) || 0;
      const lng = parseFloat(formData.location.lng.toString()) || 0;

      if (isNaN(lat) || isNaN(lng)) {
        alert("Invalid coordinates. Please select a valid location.");
        return;
      }

      const formattedDescription = Object.entries(formData.description)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

      const dataToInsert = {
        type: formData.type,
        description: formattedDescription,
        latitude: lat,
        longitude: lng,
        location_json: {
          lat: lat,
          lng: lng,
          address: formData.location.address || "No address provided"
        },
        location_text: `POINT(${lng} ${lat})`,
        address: formData.location.address || "No address provided",
        created_at: new Date().toISOString(),
        status: 'active'
      };

      let insertResult = await supabase
        .from("incidents")
        .insert([dataToInsert])
        .select();

      if (insertResult.error) {
        console.error("Error inserting data:", insertResult.error);
        
        const simplifiedData = {
          type: formData.type,
          description: formattedDescription,
          latitude: lat,
          longitude: lng,
          address: formData.location.address || "No address provided",
          created_at: new Date().toISOString(),
          status: 'active'
        };

        insertResult = await supabase
          .from("incidents")
          .insert([simplifiedData])
          .select();

        if (insertResult.error) {
          console.error("Fallback error:", insertResult.error);
          alert("Failed to submit report. Please try again.");
          return;
        }
      }

      if (formData.attachment && insertResult.data?.[0]?.id) {
        const fileExt = formData.attachment.name.split('.').pop();
        const fileName = `${insertResult.data[0].id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('incident-attachments')
          .upload(fileName, formData.attachment);

        if (uploadError) {
          console.error("Error uploading file:", uploadError);
        }
      }

      setFormData({
        type: "",
        description: {},
        location: {
          lat: 0,
          lng: 0,
          address: ""
        },
        status: "active",
        attachment: null
      });

      alert("Report submitted successfully!");
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleDetailChange = (label: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      description: {
        ...prev.description,
        [label]: value
      }
    }));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        attachment: e.target.files![0]
      }));
    }
  };

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setFormData(prev => ({
      ...prev,
      location
    }));
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

  const communityFeatures = [
    {
      icon: "🗺️",
      title: "Incident Mapping",
      description: "Track and report incidents in your area with our interactive map.",
      link: {
        label: "View Map",
        href: "#map"
      }
    },
    {
      icon: "📢",
      title: "Message Board",
      description: "Connect with community members and share important updates.",
      link: {
        label: "Join Discussion",
        href: "#messages"
      }
    },
    {
      icon: "📅",
      title: "Local Events",
      description: "Find and participate in community events and gatherings.",
      link: {
        label: "Browse Events",
        href: "#events"
      }
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
                onClick={() => setViewMode('map')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                View Map
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            {viewMode === 'map' ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Community Map</h2>
                <DynamicMap
                  locations={events.map(transformEventToLocation)}
                  center={{ lat: 40.7128, lng: -74.0060 }}
                  zoom={12}
                />
                <LocationPicker
                  onLocationSelect={handleLocationSelect}
                  className="w-full h-[400px] rounded-lg"
                />
              </div>
            ) : (
              <div className="space-y-8">
                <LocalEvents events={events} loading={loading} formatDate={formatDate} />
                <MessageBoard />
                <IncidentTracker />
              </div>
            )}
          </div>
        </div>

        {/* Community Features */}
        {/* <FeatureGrid
          title="Community Tools"
          description="Access powerful tools to stay connected and informed"
          features={communityFeatures}
          columns={3}
          variant="bordered"
        /> */}

        {/* App Download Section */}
        {/* <section className="py-16 px-4 bg-gradient-to-br from-blue-900 to-blue-800">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AppDownloadCTA />
            </motion.div>
          </div>
        </section> */}
      </div>
    </div>
  );
} 