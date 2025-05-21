"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PURPOSE_OPTIONS = [
  {
    id: 'volunteer',
    name: 'Volunteer',
    description: 'Join our community as a volunteer and make a difference.',
    icon: '✋',
    fields: ['experience', 'motivation']
  },
  {
    id: 'partner',
    name: 'Partner Organization',
    description: 'Collaborate with us as an organization or business.',
    icon: '🏢',
    fields: ['organization', 'partnership-type']
  },
  {
    id: 'feedback',
    name: 'Feedback & Suggestions',
    description: 'Share your thoughts and help us improve our services.',
    icon: '💭',
    fields: ['feedback-type', 'suggestion']
  }
];

const QUICK_LINKS = [
  {
    title: 'About Us',
    description: 'Learn more about our mission and values',
    icon: '🎯',
    href: '/about'
  },
  {
    title: 'Community Guidelines',
    description: 'Understand our community standards',
    icon: '📜',
    href: '/guidelines'
  },
  {
    title: 'FAQ',
    description: 'Find answers to common questions',
    icon: '❓',
    href: '/faq'
  },
  {
    title: 'Success Stories',
    description: 'Read about our impact and achievements',
    icon: '🌟',
    href: '/stories'
  }
];

const BENEFITS = [
  {
    title: 'Make an Impact',
    description: 'Contribute to meaningful change in your community',
    icon: '💪'
  },
  {
    title: 'Build Connections',
    description: 'Connect with like-minded individuals and organizations',
    icon: '🤝'
  },
  {
    title: 'Grow Together',
    description: 'Learn and develop new skills through collaboration',
    icon: '🌱'
  }
];

export default function ContactFormPage() {
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    // Volunteer specific fields
    experience: '',
    motivation: '',
    // Partner specific fields
    organization: '',
    'partnership-type': '',
    // Feedback specific fields
    'feedback-type': '',
    suggestion: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', { ...formData, purpose: selectedPurpose });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'purpose') {
      setSelectedPurpose(value);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const getSelectedPurpose = () => PURPOSE_OPTIONS.find(p => p.id === selectedPurpose);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* <HeroSection
        title="Contact Us"
        description="Get in touch with us for any purpose - whether you want to volunteer, partner with us, or share feedback."
        imageSrc="/images/contact/contact-hero.jpg"
        imageAlt="People connecting and communicating"
      /> */}

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* Quick Links */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Links
              </h3>
              <div className="space-y-4">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="block p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{link.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {link.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Why Join Us?
              </h3>
              <div className="space-y-4">
                {BENEFITS.map((benefit) => (
                  <div key={benefit.title} className="flex items-start gap-3">
                    <span className="text-2xl">{benefit.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Contact Form
                </h2>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      What would you like to do?
                    </label>
                    <select
                      id="purpose"
                      name="purpose"
                      value={selectedPurpose}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a purpose</option>
                      {PURPOSE_OPTIONS.map((purpose) => (
                        <option key={purpose.id} value={purpose.id}>
                          {purpose.icon} {purpose.name}
                        </option>
                      ))}
                    </select>
                    {selectedPurpose && (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {getSelectedPurpose()?.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Dynamic fields based on purpose */}
                  {selectedPurpose === 'volunteer' && (
                    <>
                      <div>
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Relevant Experience
                        </label>
                        <textarea
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          rows={3}
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Why do you want to volunteer?
                        </label>
                        <textarea
                          id="motivation"
                          name="motivation"
                          value={formData.motivation}
                          onChange={handleInputChange}
                          rows={4}
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </>
                  )}

                  {selectedPurpose === 'partner' && (
                    <>
                      <div>
                        <label htmlFor="organization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Organization Name
                        </label>
                        <input
                          type="text"
                          id="organization"
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="partnership-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Type of Partnership
                        </label>
                        <select
                          id="partnership-type"
                          name="partnership-type"
                          value={formData['partnership-type']}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select partnership type</option>
                          <option value="sponsor">Sponsorship</option>
                          <option value="collaboration">Program Collaboration</option>
                          <option value="resource">Resource Sharing</option>
                          <option value="event">Event Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </>
                  )}

                  {selectedPurpose === 'feedback' && (
                    <>
                      <div>
                        <label htmlFor="feedback-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Type of Feedback
                        </label>
                        <select
                          id="feedback-type"
                          name="feedback-type"
                          value={formData['feedback-type']}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select feedback type</option>
                          <option value="suggestion">Suggestion</option>
                          <option value="complaint">Complaint</option>
                          <option value="praise">Praise</option>
                          <option value="question">Question</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Your Feedback
                        </label>
                        <textarea
                          id="suggestion"
                          name="suggestion"
                          value={formData.suggestion}
                          onChange={handleInputChange}
                          rows={4}
                          required
                          placeholder="Please share your feedback..."
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
                    >
                      Submit
                    </motion.button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}