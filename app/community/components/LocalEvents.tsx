"use client";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  address: string;
  organizer: string;
}

interface LocalEventsProps {
  events: Event[];
  loading: boolean;
  formatDate: (dateString: string) => string;
}

export function LocalEvents({ }: LocalEventsProps) {
  const router = useRouter();

  const handleEventTypeClick = (type: string) => {
    router.push(`/request?type=event&category=${type}`);
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Local Events & Meetups
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Types of Events
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div 
                  onClick={() => handleEventTypeClick('support')}
                  className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Support Groups</h4>
                  <p className="text-gray-600 dark:text-gray-400">Regular meetings for sharing and healing</p>
                </div>
                <div 
                  onClick={() => handleEventTypeClick('workshop')}
                  className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Workshops</h4>
                  <p className="text-gray-600 dark:text-gray-400">Educational sessions on safety and empowerment</p>
                </div>
                <div 
                  onClick={() => handleEventTypeClick('community')}
                  className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">Community Actions</h4>
                  <p className="text-gray-600 dark:text-gray-400">Organized activities for social change</p>
                </div>
                <div 
                  onClick={() => handleEventTypeClick('social')}
                  className="bg-pink-50 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-semibold mb-2 text-pink-700 dark:text-pink-300">Social Gatherings</h4>
                  <p className="text-gray-600 dark:text-gray-400">Casual meetups to build connections</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                📱 Get More with Our App
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="mr-2">✓</span>
                  Real-time event notifications
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="mr-2">✓</span>
                  RSVP and attendance tracking
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="mr-2">✓</span>
                  Connect with event organizers
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="mr-2">✓</span>
                  Location-based event discovery
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                🤝 Host an Event
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Want to organize a community event? Submit a request to:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Create and manage your event</li>
                <li>• Reach local community members</li>
                <li>• Get support from our team</li>
                <li>• Access event planning resources</li>
              </ul>
              <motion.button
                onClick={() => router.push('/request?type=event')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors w-full"
              >
                Request to Host an Event
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 