"use client";
import { motion } from "framer-motion";
import { HeroSection } from "./components/HeroSection";
import { StatsDisplay } from "./components/StatsDisplay";
import { FeatureGrid } from "./components/FeatureGrid";
import { CallToAction } from "./components/CallToAction";
import FeaturedNews from './components/FeaturedNews';

export default function JoinPage() {
  const impactStats = [
    {
      value: "10K+",
      label: "Community Members",
      icon: "👥",
      color: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      value: "50+",
      label: "Partner Organizations",
      icon: "🤝",
      color: "bg-yellow-100 dark:bg-yellow-900/30"
    },
    {
      value: "100K+",
      label: "People Supported",
      icon: "❤️",
      color: "bg-red-100 dark:bg-red-900/30"
    },
    {
      value: "24/7",
      label: "Community Support",
      icon: "🌟",
      color: "bg-purple-100 dark:bg-purple-900/30"
    }
  ];

  const volunteerFeatures = [
    {
      icon: "✋",
      title: "Community Outreach",
      description: "Connect with and support community members in need.",
      link: {
        label: "Learn More",
        href: "#outreach"
      }
    },
    {
      icon: "📅",
      title: "Event Support",
      description: "Help organize and run community events and workshops.",
      link: {
        label: "View Events",
        href: "#events"
      }
    },
    {
      icon: "📦",
      title: "Resource Distribution",
      description: "Assist in distributing resources to community members.",
      link: {
        label: "Get Started",
        href: "#resources"
      }
    }
  ];

  const partnerFeatures = [
    {
      icon: "🤝",
      title: "Organization Partnerships",
      description: "Join forces with like-minded organizations to amplify impact.",
      link: {
        label: "Partner With Us",
        href: "#partner"
      }
    },
    {
      icon: "🔄",
      title: "Resource Sharing",
      description: "Share resources and expertise to strengthen our community.",
      link: {
        label: "Share Resources",
        href: "#share"
      }
    },
    {
      icon: "🎯",
      title: "Joint Initiatives",
      description: "Collaborate on projects that drive meaningful change.",
      link: {
        label: "Start Project",
        href: "#initiatives"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection
        title="Join Our Community"
        description="Be part of a movement that's making a real difference. Together, we can create stronger, safer communities for everyone."
        imageSrc="/images/community/community-hero.jpg"
        imageAlt="Community members working together in solidarity"
      >
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <motion.a
              href="/request"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              Volunteer
            </motion.a>
            <motion.a
              onClick={() => {
                window.location.href = "/contact";
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Support Us
            </motion.a>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Join the Movement</h2>
            <div className="grid md:grid-cols-3 gap-4 text-white">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="font-bold">Volunteers</div>
                <div className="text-xl">1,000+</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="font-bold">Communities</div>
                <div className="text-xl">50+</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="font-bold">Impact</div>
                <div className="text-xl">100K+</div>
              </div>
            </div>
          </div>
        </div>
      </HeroSection>

      {/* Impact Stats */}
      <StatsDisplay
        title="Our Impact"
        description="Together, we're making a real difference in our communities"
        stats={impactStats}
      />

      {/* Volunteer Opportunities */}
      <FeatureGrid
        title="Volunteer Opportunities"
        description="Make a difference in your community through various volunteer roles"
        features={volunteerFeatures}
        columns={3}
        variant="bordered"
      />

      {/* Partnership Opportunities */}
      <FeatureGrid
        title="Partnership Opportunities"
        description="Join forces with us to create lasting change"
        features={partnerFeatures}
        columns={3}
        variant="minimal"
      />

      {/* Add FeaturedNews after the hero section */}
      <div className="container mx-auto px-4 py-12">
        <FeaturedNews />
      </div>

      {/* Mobile App Section */}
      <CallToAction
        title="Join the Movement on Mobile"
        description="Download our app to stay connected with the community and access resources on the go."
        primaryAction={{
          label: "Download App",
          href: "#download"
        }}
        secondaryAction={{
          label: "Learn More",
          href: "/about"
        }}
        pageType="default"
      />
    </div>
  );
} 
