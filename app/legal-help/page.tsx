"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90" />
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Legal Help Directory
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Connect with experienced attorneys dedicated to protecting your rights and providing expert legal assistance.
            </p>
          </motion.div>
        </div>
      </section>

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
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
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
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Are You an Attorney?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our network and become a featured attorney. Help make a difference in your community while growing your practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:admin@desist.org"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Contact Admin
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 