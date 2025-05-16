"use client";
import { motion } from "framer-motion";
import { AppDownloadCTA } from "../components/AppDownloadCTA";
import { HeroSection } from "../components/HeroSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection
        title="About Our Mission"
        description="We are a community-driven organization dedicated to protecting and empowering immigrant communities through unity, education, and mutual support."
        imageSrc="/images/community/unity/community-circle.jpg"
        imageAlt="Community members standing together in solidarity"
      >
        <div className="flex gap-4">
          <motion.a
            href="#learn-more"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Learn More
          </motion.a>
          <motion.a
            href="/join"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            Join Us
          </motion.a>
        </div>
      </HeroSection>

      {/* Rest of the about page content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <section id="learn-more" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Founded by community members who recognized the need for organized support and protection,
              DESIST! has grown into a network of dedicated individuals and organizations working
              together to create safer spaces for all.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              We believe in the power of community action, mutual aid, and solidarity. Through
              education, rapid response networks, and community organizing, we work to protect our
              neighbors and build stronger, more resilient communities.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-purple-50 dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
                  Unity
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We stand together, recognizing that our strength lies in our solidarity and mutual support.
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">
                  Education
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Knowledge is power. We empower our community through workshops, training, and resource sharing.
                </p>
              </div>
              <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">
                  Action
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We take concrete steps to protect and support our community members when they need it most.
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-3">
                  Community
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We build strong, resilient networks of support that celebrate our diversity and shared humanity.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Mobile App Section */}
      <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
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
    </div>
  );
} 