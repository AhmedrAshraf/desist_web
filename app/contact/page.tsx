"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AppDownloadCTA } from "../components/AppDownloadCTA";
import { HeroSection } from "../components/HeroSection";
import { CallToAction } from "../components/CallToAction";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus({
        type: "success",
        message: "Message sent successfully! We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to send message",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection
        title="Get in Touch"
        description="Have questions or want to get involved? We're here to help. Reach out to our team and become part of our community."
        imageSrc="/images/community/stories/community-speaker.jpg"
        imageAlt="Community members engaged in conversation"
      >
        <div className="flex gap-4">
          <motion.a
            href="#contact-form"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            Contact Us
          </motion.a>
          <motion.a
            href="#locations"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            Find Local Office
          </motion.a>
        </div>
      </HeroSection>

      {/* Contact Options */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-blue-900 dark:text-blue-100">
                  Send us a Message
                </h2>
                {status.type && (
                  <div
                    className={`p-4 rounded-lg mb-6 ${
                      status.type === "success"
                        ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                        : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                    }`}
                  >
                    {status.message}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your message here..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-6 py-3 rounded-lg text-white font-medium ${
                        isSubmitting
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </motion.button>
                  </div>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold mb-6 text-blue-900 dark:text-blue-100">
                    Other Ways to Reach Us
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Email</h3>
                      <p className="text-gray-700 dark:text-gray-300">support@desist.org</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Phone</h3>
                      <p className="text-gray-700 dark:text-gray-300">1-800-555-0000</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Office</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        123 Movement Street<br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold mb-6 text-blue-900 dark:text-blue-100">
                    Connect with Us
                  </h2>
                  <div className="space-y-4">
                    <a
                      href="#"
                      className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400"
                    >
                      <span className="text-2xl">🐦</span>
                      Twitter
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400"
                    >
                      <span className="text-2xl">📸</span>
                      Instagram
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400"
                    >
                      <span className="text-2xl">👥</span>
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Get Support on the Go
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Download our app to access support features and connect with our community anytime, anywhere.
            </p>
            <AppDownloadCTA />
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction
        title="Get in Touch"
        description="Have questions or need support? Our team is here to help you 24/7."
        primaryAction={{
          label: "Contact Us",
          href: "#contact-form"
        }}
        secondaryAction={{
          label: "Find Local Office",
          href: "#locations"
        }}
        pageType="contact"
      />
    </div>
  );
} 