"use client";
import { motion } from "framer-motion";
import { HeroSection } from "../components/HeroSection";
import { StatsDisplay } from "../components/StatsDisplay";
import { LocalEvents } from "./components/LocalEvents";
import { AppDownloadCTA } from "../components/AppDownloadCTA";
import { useState, useEffect } from "react";
import supabase from "../../utils/supabase";
import Link from "next/link";

const CATEGORIES = [
  { id: 'support', name: 'Support Groups', color: 'blue', bgClass: 'bg-blue-100 dark:bg-blue-900/30', textClass: 'text-blue-800 dark:text-blue-300' },
  { id: 'resources', name: 'Resource Sharing', color: 'purple', bgClass: 'bg-purple-100 dark:bg-purple-900/30', textClass: 'text-purple-800 dark:text-purple-300' },
  { id: 'stories', name: 'Success Stories', color: 'pink', bgClass: 'bg-pink-100 dark:bg-pink-900/30', textClass: 'text-pink-800 dark:text-pink-300' },
  { id: 'updates', name: 'Community Updates', color: 'green', bgClass: 'bg-green-100 dark:bg-green-900/30', textClass: 'text-green-800 dark:text-green-300' }
];

interface Event {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  date: string;
  type: string;
  organizer: string;
}

export default function CommunityPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents();
    fetchRecentPosts();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true })
        .limit(5);

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          users!inner (
            email,
            full_name,
            username
          )
        `)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setRecentPosts(data || []);
    } catch (error) {
      console.error('Error fetching recent posts:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const communityStats = [
    {
      value: "500+",
      label: "Active Reports",
      icon: "🚨",
      color: "bg-red-100 dark:bg-red-900/30"
    },
    {
      value: "1000+",
      label: "Community Members",
      icon: "👥",
      color: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      value: "50+",
      label: "Local Events",
      icon: "📅",
      color: "bg-green-100 dark:bg-green-900/30"
    },
    {
      value: "24/7",
      label: "Support Available",
      icon: "💪",
      color: "bg-purple-100 dark:bg-purple-900/30"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="pt-0">
        <HeroSection
          title="Community Hub"
          description="Join forces with your local community to create safer neighborhoods and support those in need."
          imageSrc="/images/community/community-hero.jpg"
          imageAlt="Community members working together"
        >
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                View Events
              </motion.button>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 max-w-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">Community Impact</h2>
              <div className="grid md:grid-cols-3 gap-4 text-white">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-bold">Active Reports</div>
                  <div className="text-xl">500+</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-bold">Members</div>
                  <div className="text-xl">1,000+</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-bold">Events</div>
                  <div className="text-xl">50+</div>
                </div>
              </div>
            </div>
          </div>
        </HeroSection>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-12">
            {/* Community Stats */}
            <StatsDisplay
              title="Community Impact"
              description="Together, we're building stronger and safer communities"
              stats={communityStats}
            />

            {/* Community Forum Preview */}
            <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Community Forum
                    </h2>
                    <p className="text-blue-100">
                      Join the conversation and share your experiences
                    </p>
                  </div>
                  <Link
                    href="/community/forum"
                    className="px-6 py-3 text-white rounded-lg font-medium hover:bg-white/20 transition-colors backdrop-blur-sm bg-gray-800"
                  >
                    View Full Forum
                  </Link>
                </div>
              </div>

              {/* Posts Preview */}
              <div className="p-8">
                <div className="space-y-6">
                  {recentPosts.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="mb-4">
                        <svg
                          className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        No posts yet. Be the first to start a conversation!
                      </p>
                    </div>
                  ) : (
                    recentPosts.map((post) => {
                      const category = CATEGORIES.find(c => c.id === post.category);
                      const displayName = post.users?.username || post.users?.full_name || post.users?.email;
                      return (
                        <div
                          key={post.id}
                          className="group bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${category?.bgClass} ${category?.textClass}`}>
                                {category?.name}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {formatDate(post.created_at)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                {displayName}
                              </span>
                              {post.users?.username && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  @{post.users.username}
                                </span>
                              )}
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                            {post.content}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </section>

            {/* Local Events */}
            <LocalEvents events={events} loading={loading} formatDate={formatDate} />

            {/* App Download CTA */}
            <AppDownloadCTA />
          </div>
        </div>
      </div>
    </div>
  );
} 