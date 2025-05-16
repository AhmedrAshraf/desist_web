"use client";
import Link from "next/link";
import { ThemeToggle } from "../components/ThemeToggle";
import { useState } from "react";
import LocationPicker from "../components/LocationPicker";
import supabase from "../../utils/supabase";
import { motion } from "framer-motion";
import { AppDownloadCTA } from "../components/AppDownloadCTA";
import { StatsDisplay } from "../components/StatsDisplay";
import { CallToAction } from "../components/CallToAction";
import { FeatureGrid } from "../components/FeatureGrid";
import { PageHero } from "../components/PageHero";
import { HeroSection } from "../components/HeroSection";

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

  const supportStats = [
    {
      value: "24/7",
      label: "Support Available",
      icon: "🕒",
      color: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      value: "15min",
      label: "Avg. Response Time",
      icon: "⚡",
      color: "bg-yellow-100 dark:bg-yellow-900/30"
    },
    {
      value: "50+",
      label: "Support Agents",
      icon: "👥",
      color: "bg-green-100 dark:bg-green-900/30"
    },
    {
      value: "100%",
      label: "Confidential",
      icon: "🔒",
      color: "bg-purple-100 dark:bg-purple-900/30"
    }
  ];

  const supportFeatures = [
    {
      icon: "💬",
      title: "Chat Support",
      description: "Connect with a trained support specialist instantly through our secure chat.",
      link: {
        label: "Start Chat",
        href: "#chat"
      }
    },
    {
      icon: "📞",
      title: "Phone Support",
      description: "Speak directly with our support team for immediate assistance.",
      link: {
        label: "Call Now",
        href: "tel:1-800-555-0000"
      }
    },
    {
      icon: "👩‍⚖️",
      title: "Legal Support",
      description: "Get legal advice and representation from our trusted partners.",
      link: {
        label: "See Lawyers List",
        href: "/legal-help"
      }
    },
    {
      icon: "🏥",
      title: "Crisis Support",
      description: "Immediate assistance for crisis situations and emergencies.",
      link: {
        label: "Get Help",
        href: "#crisis"
      }
    },
    {
      icon: "📚",
      title: "Resources",
      description: "Access our library of resources and educational materials.",
      link: {
        label: "Browse Resources",
        href: "/resources"
      }
    },
    {
      icon: "👥",
      title: "Community Support",
      description: "Connect with others and share experiences in a safe space.",
      link: {
        label: "Join Community",
        href: "/community"
      }
    }
  ];

  const immediateServices = [
    {
      icon: "🚨",
      title: "Emergency Response",
      description: "24/7 emergency response team ready to assist in critical situations."
    },
    {
      icon: "🤝",
      title: "Advocacy Support",
      description: "Professional advocates to help navigate complex situations."
    },
    {
      icon: "🏠",
      title: "Safe Housing",
      description: "Emergency housing and shelter assistance when needed."
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HeroSection
        title="24/7 Support & Resources"
        description="You're not alone. Get immediate support and access to resources whenever you need them."
        imageSrc="/images/support/support-center.jpg"
        imageAlt="Support team ready to help"
      >
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <motion.a
              href="#chat"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              Chat Now
            </motion.a>
            <motion.a
              href="#call"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Call Support
            </motion.a>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
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
        </div>
      </HeroSection>

      {/* Stats Section */}
      <StatsDisplay stats={supportStats} />

      {/* Support Services */}
      <FeatureGrid
        title="Support Services"
        description="Comprehensive support options tailored to your needs"
        features={supportFeatures}
        columns={3}
        variant="bordered"
      />

      {/* Immediate Services */}
      <FeatureGrid
        title="Immediate Assistance"
        description="Get help right away with our emergency services"
        features={immediateServices}
        columns={3}
        variant="minimal"
      />

      {/* Mobile Support */}
      <CallToAction
        title="Support in Your Pocket"
        description="Download our app to access all support services and get help whenever you need it."
        primaryAction={{
          label: "Download App",
          href: "#download"
        }}
        secondaryAction={{
          label: "Learn More",
          href: "/about"
        }}
      />
    </main>
  );
} 