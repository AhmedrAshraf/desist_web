"use client";
import { motion } from "framer-motion";
import { AppDownloadCTA } from "../components/AppDownloadCTA";

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-blue-600 opacity-90" />
        <div className="absolute inset-0 bg-[url('/community-pattern.svg')] opacity-10" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Resources & Tools
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Access a comprehensive collection of resources to support your journey and empower change.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {/* Educational Resources */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Educational Resources
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Understanding harassment
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Recognizing warning signs
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Prevention strategies
                  </li>
                </ul>
                <button className="mt-6 w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                  Learn More
                </button>
              </div>

              {/* Legal Resources */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Legal Resources
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Know your rights
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Legal assistance
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Documentation guides
                  </li>
                </ul>
                <button className="mt-6 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                  Access Resources
                </button>
              </div>

              {/* Support Network */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Support Network
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Support groups
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Counseling services
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Community events
                  </li>
                </ul>
                <button className="mt-6 w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors">
                  Find Support
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools & Downloads */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
              Tools & Downloads
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Safety Planning Tools
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Personal safety checklist
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Emergency contact templates
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Safety plan builder
                  </li>
                </ul>
                <button className="mt-6 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
                  Download Tools
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Documentation Resources
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Incident report templates
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Evidence collection guides
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-green-600">✓</span>
                    Legal document samples
                  </li>
                </ul>
                <button className="mt-6 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
                  Access Documents
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-700">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Access Resources Anywhere
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Download our app to access all resources and tools on your mobile device.
            </p>
            <AppDownloadCTA />
          </motion.div>
        </div>
      </section>
    </main>
  );
} 