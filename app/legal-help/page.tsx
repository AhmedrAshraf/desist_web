"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { StatsDisplay } from "../components/StatsDisplay";
import { CallToAction } from "../components/CallToAction";
import { FeatureGrid } from "../components/FeatureGrid";
import { PageHero } from "../components/PageHero";
import { HeroSection } from "../components/HeroSection";

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

export default function LegalHelpPage() {
  const legalStats = [
    {
      value: "500+",
      label: "Cases Handled",
      icon: "⚖️",
      color: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      value: "98%",
      label: "Success Rate",
      icon: "📈",
      color: "bg-green-100 dark:bg-green-900/30"
    },
    {
      value: "24/7",
      label: "Support Available",
      icon: "🕒",
      color: "bg-yellow-100 dark:bg-yellow-900/30"
    },
    {
      value: "50+",
      label: "Partner Organizations",
      icon: "🤝",
      color: "bg-purple-100 dark:bg-purple-900/30"
    }
  ];

  const legalServices = [
    {
      icon: "📝",
      title: "Document Review",
      description: "Expert review of legal documents and contracts to ensure your rights are protected."
    },
    {
      icon: "💼",
      title: "Case Consultation",
      description: "Free initial consultation to understand your case and provide guidance."
    },
    {
      icon: "👥",
      title: "Representation",
      description: "Professional legal representation in court and administrative proceedings."
    },
    {
      icon: "🌍",
      title: "Immigration Services",
      description: "Specialized assistance with immigration cases and documentation."
    },
    {
      icon: "📚",
      title: "Legal Education",
      description: "Workshops and resources to help you understand your rights and legal options."
    },
    {
      icon: "🤲",
      title: "Pro Bono Services",
      description: "Free legal services for qualifying individuals and cases."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HeroSection
        title="Legal Help Directory"
        description="Connect with experienced attorneys dedicated to protecting your rights and providing expert legal assistance."
        imageSrc="/images/legal/legal-team.jpg"
        imageAlt="Legal professionals working together to provide justice"
      >
        <div className="flex gap-4">
          <motion.a
            href="#find-lawyer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            Find a Lawyer
          </motion.a>
          <motion.a
            href="#resources"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            Legal Resources
          </motion.a>
        </div>
      </HeroSection>

      {/* Stats Section */}
      <StatsDisplay stats={legalStats} />

      {/* Legal Services */}
      <FeatureGrid
        title="Our Legal Services"
        description="Comprehensive legal support tailored to your needs"
        features={legalServices}
        columns={3}
        variant="bordered"
      />

      {/* Featured Attorneys */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Attorneys
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Top-rated legal professionals in our network
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attorneys.filter(attorney => attorney.featured).map((attorney) => (
              <motion.div
                key={attorney.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👨‍⚖️</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {attorney.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {attorney.specialization}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">★</span>
                      <span className="text-gray-700 dark:text-gray-300">{attorney.rating} Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700 dark:text-gray-300">📍 {attorney.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700 dark:text-gray-300">
                        {attorney.cases}+ cases handled
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {attorney.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                  <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Contact Attorney
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Attorneys */}
      <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              All Available Attorneys
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Browse our complete directory of legal professionals
            </p>
          </div>

          <div className="grid gap-6">
            {attorneys.filter(attorney => !attorney.featured).map((attorney) => (
              <motion.div
                key={attorney.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👨‍⚖️</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {attorney.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {attorney.specialization}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-gray-700 dark:text-gray-300">{attorney.rating}</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-700 dark:text-gray-300">{attorney.cases}+ cases</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Contact
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action for Attorneys */}
      <CallToAction
        title="Are You an Attorney?"
        description="Join our network and become a featured attorney. Help make a difference in your community while growing your practice."
        primaryAction={{
          label: "Join Our Network",
          href: "mailto:admin@desist.org"
        }}
        secondaryAction={{
          label: "Learn More",
          href: "/legal-help/join"
        }}
      />
    </div>
  );
} 