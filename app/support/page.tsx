"use client";
import Link from "next/link";
import { ThemeToggle } from "../components/ThemeToggle";
import { useState } from "react";
import LocationPicker from "../components/LocationPicker";
import supabase from "../../utils/supabase";
import { motion } from "framer-motion";
import { AppDownloadCTA } from "../components/AppDownloadCTA";

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

export default function SupportPage() {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Parse coordinates to ensure they are numbers
      const lat = parseFloat(formData.location.lat.toString()) || 0;
      const lng = parseFloat(formData.location.lng.toString()) || 0;

      // Validate coordinates
      if (isNaN(lat) || isNaN(lng)) {
        alert("Invalid coordinates. Please select a valid location.");
        return;
      }

      // Format description as a string with key-value pairs
      const formattedDescription = Object.entries(formData.description)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

      // Prepare data for insertion with coordinates in multiple formats
      const dataToInsert = {
        type: formData.type,
        description: formattedDescription, // Now it's a formatted string
        latitude: lat,  // separate latitude column
        longitude: lng, // separate longitude column
        location_json: {  // JSON format
          lat: lat,
          lng: lng,
          address: formData.location.address || "No address provided"
        },
        location_text: `POINT(${lng} ${lat})`, // WKT format for geometry
        address: formData.location.address || "No address provided",
        created_at: new Date().toISOString(),
        status: 'active'
      };

      // Try inserting with the new data structure
      let insertResult = await supabase
        .from("incidents")
        .insert([dataToInsert])
        .select();

      if (insertResult.error) {
        console.error("Error inserting data:", insertResult.error);
        
        // Fallback: Try with simplified data structure if first attempt fails
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

      // Handle file upload if attachment exists and we have an incident ID
      if (formData.attachment && insertResult.data?.[0]?.id) {
        const fileExt = formData.attachment.name.split('.').pop();
        const fileName = `${insertResult.data[0].id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('incident-attachments')
          .upload(fileName, formData.attachment);

        if (uploadError) {
          console.error("Error uploading file:", uploadError);
          // Continue since the main data was inserted successfully
        }
      }

      // Clear form and show success message
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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-purple-600 opacity-90" />
        <div className="absolute inset-0 bg-[url('/community-pattern.svg')] opacity-10" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              24/7 Support & Resources
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              You're not alone. Get immediate support and access to resources whenever you need them.
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-4">Emergency Contacts</h2>
              <div className="grid md:grid-cols-2 gap-4 text-white">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-bold">Emergency Services</div>
                  <div className="text-xl">911</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-bold">Crisis Hotline</div>
                  <div className="text-xl">1-800-555-0000</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
              Get Support Now
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Chat Support
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Connect with a trained support specialist instantly through our secure chat.
                </p>
                <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                  Start Chat
                </button>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📞</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Phone Support
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Speak directly with our support team for immediate assistance.
                </p>
                <button className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                  Call Now
                </button>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">👩‍⚖️</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Legal Support
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Get legal advice and representation from our trusted partners.
                </p>
                <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                  See Laywers List
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
              Our Support Services
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Immediate Assistance
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    24/7 crisis support
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Emergency response coordination
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Real-time incident reporting
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Ongoing Support
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Counseling referrals
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Support group connections
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Long-term recovery resources
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Support */}
      <section className="py-16 px-4 bg-gradient-to-br from-red-100 to-purple-100 dark:from-gray-800 dark:to-gray-700">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Support in Your Pocket
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Download our app to access all support services and get help whenever you need it.
            </p>
            <AppDownloadCTA />
          </motion.div>
        </div>
      </section>
    </main>
  );
} 