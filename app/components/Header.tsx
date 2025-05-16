"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Join", href: "/join" },
  { name: "Community", href: "/community" },
  { name: "Incidents", href: "/incidents" },
  { name: "Legal Help", href: "/legal-help" },
  { name: "Resources", href: "/resources" },
  { name: "Support", href: "/support" },
  { name: "Contact", href: "/contact" },
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" 
            : "bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Enhanced Logo Section */}
            <Link href="/" className="flex items-center gap-4 group relative">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-300" />
                <div className="relative">
                  <Image 
                    src="/desist-logo.png" 
                    alt="Logo" 
                    width={48} 
                    height={48} 
                    className="rounded-full transition-all duration-300 group-hover:scale-105 shadow-lg" 
                    priority
                  />
                  {/* <div className="absolute inset-0 rounded-full ring-2 ring-purple-500/20 dark:ring-purple-400/20" /> */}
                  <motion.div 
                    className="absolute -inset-2 rounded-full border-2 border-transparent"
                    initial={false}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      borderColor: ['rgba(147, 51, 234, 0)', 'rgba(147, 51, 234, 0.3)', 'rgba(147, 51, 234, 0)']
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl bg-[#2D4059] dark:bg-[#fff] bg-clip-text text-transparent hidden sm:block">
                  DESIST!
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  Community Protection
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-purple-100 dark:bg-purple-900/40 rounded-full -z-10"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </Link>
                );
              })}
              <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-all duration-200"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Toggle menu</span>
                <div className="relative w-6 h-6">
                  <span 
                    className={`absolute left-0 block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                      isMobileMenuOpen ? "rotate-45 top-3" : "top-2"
                    }`}
                  />
                  <span 
                    className={`absolute left-0 block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                      isMobileMenuOpen ? "-rotate-45 top-3" : "top-4"
                    }`}
                  />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-50 lg:hidden"
            >
              <div className="flex flex-col h-full overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                  <span className="font-semibold text-lg">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="flex-1 p-4">
                  <div className="space-y-1">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                            isActive
                              ? "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                              : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}; 