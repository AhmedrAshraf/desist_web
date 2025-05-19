"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect, useCallback, memo, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Community", href: "/community" },
  { name: "Incidents", href: "/incidents" },
  { name: "Legal Help", href: "/legal-help" },
  { name: "Resources", href: "/resources" },
  { name: "Support", href: "/support" },
  { name: "Download", href: "/download" },
  { name: "Contact", href: "/contact" },
] as const;

// Memoized Logo component with preloaded image
export const Logo = memo(() => (
  <Link href="/" className="flex items-center gap-4 group relative" prefetch={false}>
    <div className="relative">
      {/* <div className="absolute -inset-0.5 bg-blue-200 rounded-full blur opacity-40 group-hover:opacity-75 will-change-[opacity] transition-opacity duration-300" /> */}
      <div className="relative">
        <Image 
          src="/desist.png" 
          alt="Logo" 
          width={48} 
          height={48} 
          className="rounded-full will-change-transform transition-transform duration-300 group-hover:scale-105" 
          priority
        />
      </div>
    </div>
    <div className="flex flex-col">
      <span className="font-bold text-2xl text-blue-900 dark:text-blue-100">
        DESIST!
      </span>
      <span className="text-xs text-gray-700 dark:text-gray-300">
        Community Protection
      </span>
    </div>
  </Link>
));
Logo.displayName = 'Logo';

// Optimized navigation item with reduced motion support
const NavItem = memo(({ item, isActive }: { item: typeof navigation[number]; isActive: boolean }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Link
      href={item.href}
      prefetch={false}
      className={`relative px-4 py-2 rounded-full text-sm font-medium will-change-colors transition-colors duration-200 ${
        isActive
          ? "text-blue-900 dark:text-blue-100"
          : "text-gray-700 hover:text-blue-900 dark:text-gray-300 dark:hover:text-blue-100"
      }`}
    >
      {item.name}
      {isActive && !shouldReduceMotion && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-blue-100 dark:bg-blue-900/40 rounded-full -z-10"
          transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
        />
      )}
      {isActive && shouldReduceMotion && (
        <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/40 rounded-full -z-10" />
      )}
    </Link>
  );
});
NavItem.displayName = 'NavItem';

// Optimized mobile menu button
const MenuButton = memo(({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="p-2 rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
    aria-expanded={isOpen}
  >
    <span className="sr-only">Toggle menu</span>
    <div className="relative w-6 h-6">
      <span 
        className={`absolute left-0 block h-0.5 w-6 bg-current will-change-transform transition-transform duration-200 ${
          isOpen ? "rotate-45 top-3" : "top-2"
        }`}
      />
      <span 
        className={`absolute left-0 block h-0.5 w-6 bg-current will-change-transform transition-transform duration-200 ${
          isOpen ? "-rotate-45 top-3" : "top-4"
        }`}
      />
    </div>
  </button>
));
MenuButton.displayName = 'MenuButton';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  // Optimized scroll handler with RAF
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
          setScrolled(currentScrollY > 20);
          lastScrollY.current = currentScrollY;
        }
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const mobileMenuAnimations = {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 }
    },
    menu: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
      transition: shouldReduceMotion 
        ? { duration: 0.2 }
        : { type: "spring", damping: 25, stiffness: 200 }
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 will-change-[background,box-shadow] transition-[background,box-shadow] duration-200 ${
          scrolled 
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" 
            : "bg-white/50 dark:bg-gray-900/50 "
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <NavItem key={item.href} item={item} isActive={pathname === item.href} />
              ))}
              <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              <ThemeToggle />
              <MenuButton isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <>
            <motion.div
              {...mobileMenuAnimations.overlay}
              className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              {...mobileMenuAnimations.menu}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                  <span className="font-semibold text-lg text-blue-900 dark:text-blue-100">Menu</span>
                  <MenuButton isOpen={true} onClick={() => setIsMobileMenuOpen(false)} />
                </div>
                <nav className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-1">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          prefetch={false}
                          className={`block px-4 py-3 rounded-lg text-base font-medium will-change-colors transition-colors duration-200 ${
                            isActive
                              ? "bg-blue-50 text-blue-900 dark:bg-blue-900/30 dark:text-blue-100"
                              : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                          }`}
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