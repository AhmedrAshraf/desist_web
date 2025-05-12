import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white/90 dark:bg-dark-primary/90 backdrop-blur-md z-50 border-b border-gray-100 dark:border-dark-secondary">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-dark-accent">DESIST!</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/about"
            className="text-gray-600 hover:text-dark-accent dark:text-dark-text-secondary dark:hover:text-dark-text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/join"
            className="text-gray-600 hover:text-dark-accent dark:text-dark-text-secondary dark:hover:text-dark-text-primary transition-colors"
          >
            Join
          </Link>
          <Link
            href="/community"
            className="text-gray-600 hover:text-dark-accent dark:text-dark-text-secondary dark:hover:text-dark-text-primary transition-colors"
          >
            Community
          </Link>
          <Link
            href="/resources"
            className="text-gray-600 hover:text-dark-accent dark:text-dark-text-secondary dark:hover:text-dark-text-primary transition-colors"
          >
            Resources
          </Link>
          <Link
            href="/support"
            className="text-gray-600 hover:text-dark-accent dark:text-dark-text-secondary dark:hover:text-dark-text-primary transition-colors"
          >
            Support
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-dark-accent dark:text-dark-text-secondary dark:hover:text-dark-text-primary transition-colors"
          >
            Contact
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button className="p-2 text-gray-600 dark:text-dark-text-secondary">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}; 