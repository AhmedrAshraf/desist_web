"use client";
import { motion } from "framer-motion";

export const MessageBoard = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Community Message Board
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
              Connect with others, share experiences, and support each other. Join our community discussions about:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Support Groups</h3>
                <p className="text-gray-600 dark:text-gray-400">Find and join local support groups in your area</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Resource Sharing</h3>
                <p className="text-gray-600 dark:text-gray-400">Share and discover helpful resources and tips</p>
              </div>
              <div className="p-4 bg-pink-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2 text-pink-700 dark:text-pink-300">Success Stories</h3>
                <p className="text-gray-600 dark:text-gray-400">Share your journey and inspire others</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-700 dark:text-green-300">Community Updates</h3>
                <p className="text-gray-600 dark:text-gray-400">Stay informed about local initiatives and news</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl shadow-lg mb-12">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              💬 Join the Conversation
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Download our app to access the full message board features, including private messaging, notifications, and real-time updates.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 