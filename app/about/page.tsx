"use client";
import { motion } from "framer-motion";
import { AppDownloadCTA } from "../components/AppDownloadCTA";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90" />
        <div className="absolute inset-0 bg-[url('/community-pattern.svg')] opacity-10" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Our Movement
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              We're building a future where everyone feels safe and empowered in their communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  To create safer communities by empowering individuals with tools, resources, and support networks that enable them to take action against harassment and discrimination.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-blue-600">✓</span>
                    Empower communities through education
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-blue-600">✓</span>
                    Provide immediate support and resources
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-blue-600">✓</span>
                    Build strong support networks
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Our Vision
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  We envision a world where every person feels safe, respected, and empowered to live their life without fear of harassment or discrimination.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-purple-600">✓</span>
                    Safe and inclusive communities
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-purple-600">✓</span>
                    Empowered individuals
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-purple-600">✓</span>
                    Lasting social change
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
              Our Approach
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Prevention
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We focus on education and awareness to prevent incidents before they occur, empowering communities with knowledge and tools.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Support
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We provide immediate assistance and ongoing support through our network of resources and community partners.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">💪</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Action
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We take concrete steps to address incidents and work towards systemic change through advocacy and community action.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
              Our Impact
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  100K+
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  App Downloads
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                  50+
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  Cities
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                  200+
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  Community Events
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-4">
                  25K+
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  People Helped
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Join Our Movement
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Download our app to become part of the solution and help create safer communities.
            </p>
            <AppDownloadCTA />
          </motion.div>
        </div>
      </section>
    </main>
  );
} 