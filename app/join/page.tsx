"use client";
import { motion } from "framer-motion";
import { AppDownloadCTA } from "../components/AppDownloadCTA";

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 to-orange-600 opacity-90" />
        <div className="absolute inset-0 bg-[url('/community-pattern.svg')] opacity-10" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join the Movement
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Be part of the change. Together, we can create safer communities and empower others.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ways to Join */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
              Ways to Get Involved
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Volunteer */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">✋</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Volunteer
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Join our volunteer network and help make a difference in your community.
                </p>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-yellow-600">✓</span>
                    Community outreach
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-yellow-600">✓</span>
                    Event support
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-yellow-600">✓</span>
                    Resource distribution
                  </li>
                </ul>
                <button className="w-full py-3 px-4 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors">
                  Volunteer Now
                </button>
              </div>

              {/* Partner */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Partner
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Partner with us to expand our reach and impact in communities.
                </p>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-orange-600">✓</span>
                    Organization partnerships
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-orange-600">✓</span>
                    Resource sharing
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-orange-600">✓</span>
                    Joint initiatives
                  </li>
                </ul>
                <button className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors">
                  Partner With Us
                </button>
              </div>

              {/* Donate */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">❤️</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Donate
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Support our mission with a donation to help fund our programs.
                </p>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-red-600">✓</span>
                    Program funding
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-red-600">✓</span>
                    Resource development
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-red-600">✓</span>
                    Community support
                  </li>
                </ul>
                <button className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors">
                  Donate Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
              Our Impact
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
                  10K+
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Community Members
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Active participants in our movement
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-4">
                  50+
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Partner Organizations
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Working together for change
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">
                  100K+
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  People Supported
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Through our programs and resources
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-gray-800 dark:to-gray-700">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Join the Movement on Mobile
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Download our app to stay connected with the community and access resources on the go.
            </p>
            <AppDownloadCTA />
          </motion.div>
        </div>
      </section>
    </main>
  );
} 