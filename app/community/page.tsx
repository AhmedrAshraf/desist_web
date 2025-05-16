"use client";
import { motion } from "framer-motion";
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Use shared Header component */}
      <Header />

      {/* Add top margin to account for fixed header */}
      <div className="pt-16">
        {/* Hero Section with Stats */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 opacity-90" />
          <div className="absolute inset-0 bg-[url('/community-pattern.svg')] opacity-10" />
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Join Our Community
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Together, we're building a stronger, safer community. Connect with others, share resources, and make a difference.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-white mb-1">10K+</div>
                  <div className="text-white/80 text-sm">Active Members</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-white mb-1">500+</div>
                  <div className="text-white/80 text-sm">Events Organized</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-white mb-1">50+</div>
                  <div className="text-white/80 text-sm">Partner Organizations</div>
          </div>
          </div>
            </motion.div>
        </div>
      </section>

        {/* Main Content Grid */}
        <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Message Board Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Community Discussion
                  </h2>
                  <div className="space-y-4 mb-6">
                    <div className="p-4 bg-purple-50 dark:bg-gray-700 rounded-lg">
                      <h3 className="font-semibold text-purple-700 dark:text-purple-300">Support Groups</h3>
                      <p className="text-gray-600 dark:text-gray-400">Connect with others in your area</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                      <h3 className="font-semibold text-blue-700 dark:text-blue-300">Resource Sharing</h3>
                      <p className="text-gray-600 dark:text-gray-400">Share and discover helpful resources</p>
                    </div>
                  </div>
                  <Link
                    href="/community/messages"
                    className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Join Discussion
                  </Link>
                </motion.div>

                {/* Incident Reporting */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Safety Network
                  </h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <span className="mr-2">✓</span>
                      Anonymous Reporting
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <span className="mr-2">✓</span>
                      Real-time Alerts
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <span className="mr-2">✓</span>
                      Location-based Support
                    </div>
                  </div>
                  <Link
                    href="/incidents"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View & Report Incidents
                  </Link>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Local Events */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Upcoming Events
                  </h2>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
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
                      <Link
                        href="/events/create"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Create Event
                      </Link>
                    </div>
                  </div>

                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-4 text-gray-600 dark:text-gray-400">Loading events...</p>
                    </div>
                  ) : events.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-600 dark:text-gray-400">No upcoming events scheduled.</p>
                      <Link
                        href="/events/create"
                        className="mt-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Create the first event →
                      </Link>
                    </div>
                  ) : viewMode === 'list' ? (
                    <div className="grid gap-6">
                      {events.map((event) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex items-center justify-between"
                        >
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {event.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {formatDate(event.date)} • {event.address}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              👤 {event.organizer}
                            </span>
                            <Link
                              href={`/events/${event.id}`}
                              className="px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors text-sm"
                            >
                              Details
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                      <div className="text-center mt-4">
                        <Link
                          href="/events"
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          View all events →
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[400px] rounded-xl overflow-hidden">
                      <DynamicMap
                        locations={events.map(transformEventToLocation)}
                        type="events"
                      />
                    </div>
                  )}
                </motion.div>

                {/* Resources Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Resources
                  </h2>
                  <div className="space-y-4 mb-6">
                    <div className="p-4 bg-orange-50 dark:bg-gray-700 rounded-lg">
                      <h3 className="font-semibold text-orange-700 dark:text-orange-300">Support Services</h3>
                      <p className="text-gray-600 dark:text-gray-400">Access help and guidance</p>
                    </div>
                    <div className="p-4 bg-teal-50 dark:bg-gray-700 rounded-lg">
                      <h3 className="font-semibold text-teal-700 dark:text-teal-300">Educational Materials</h3>
                      <p className="text-gray-600 dark:text-gray-400">Learn about your rights</p>
                    </div>
                  </div>
                  <Link
                    href="/resources"
                    className="inline-block bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Access Resources
                  </Link>
                </motion.div>
            </div>
          </div>
        </div>
      </section>

        {/* Stay Connected Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AppDownloadCTA />
            </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DESIST!</h3>
              <p className="text-gray-400">
                Creating safer spaces for everyone through community action and support.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link href="/resources" className="text-gray-400 hover:text-white">Resources</Link></li>
                <li><Link href="/support" className="text-gray-400 hover:text-white">Support</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} DESIST! All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
} 