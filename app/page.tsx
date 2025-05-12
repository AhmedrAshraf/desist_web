import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-primary">
      {/* Header */}
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

      {/* Hero Section */}
      <section
        className="relative pt-32 pb-20 px-4"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark-primary/95 to-dark-secondary/95"></div>
        <div className="relative container mx-auto max-w-6xl">
          <div className="flex flex-col items-start text-left gap-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Raise Your Voice
              <br />
              <span className="text-white mt-12">Stand For Justice</span>
            </h1>
            <p className="text-xl text-white max-w-2xl">
              Join the movement to create safer spaces for everyone. Report
              incidents, access support, and be part of the community.
            </p>
            <div className="flex gap-4">
              <a
                href="https://apps.apple.com/app/id1656112306"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-90 transition-opacity"
              >
                <img
                  src="/Download_on_the_App_Store.webp"
                  alt="Download on the App Store"
                  className="h-12 md:h-16 object-contain"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.desist.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-90 transition-opacity"
              >
                <img
                  src="/Google_Play_Store.webp"
                  alt="Get it on Google Play"
                  className="h-12 md:h-16 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 bg-white dark:bg-dark-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-dark-text-primary mb-6">
            Mission Statement
          </h2>

          {/* Mission Icons Box */}
          <div className="grid grid-cols-3 gap-8 my-12">
            {[
              {
                title: "Education",
                icon: (
                  <svg
                    className="w-12 h-12 text-dark-accent mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                ),
              },
              {
                title: "Support",
                icon: (
                  <svg
                    className="w-12 h-12 text-dark-accent mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Action",
                icon: (
                  <svg
                    className="w-12 h-12 text-dark-accent mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white dark:bg-dark-primary p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-dark-secondary"
              >
                {item.icon}
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-dark-text-primary">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
          <p className="text-xl text-gray-600 dark:text-dark-text-secondary mb-12">
            We're building a world where everyone can feel safe and supported.
            Through education, community support, and direct action, we're
            creating lasting change in how we address and prevent harassment.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-dark-primary">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-dark-text-primary mb-12">
            How We Help
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Secure Reporting",
                description:
                  "Confidential reporting system with immediate support access.",
                icon: (
                  <svg
                    className="w-12 h-12 text-dark-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
                image:
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
              },
              {
                title: "Support Resources",
                description:
                  "Comprehensive guides and legal resources for difficult situations.",
                icon: (
                  <svg
                    className="w-12 h-12 text-dark-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                ),
                image:
                  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
              },
              {
                title: "Community Support",
                description:
                  "Connect with others and create safer spaces together.",
                icon: (
                  <svg
                    className="w-12 h-12 text-dark-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                image:
                  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dark-secondary p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-dark-secondary"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-dark-text-secondary mb-4">
                  {feature.description}
                </p>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20 px-4 bg-white dark:bg-dark-secondary">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-dark-text-primary mb-6">
                Our Impact
              </h2>
              <p className="text-xl text-gray-600 dark:text-dark-text-secondary mb-8">
                Join thousands of people who have already taken a stand with
                DESIST! to create safer spaces and support each other.
              </p>
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-dark-accent">
                    10K+
                  </div>
                  <div className="text-gray-600 dark:text-dark-text-secondary">
                    Members
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-dark-accent">50+</div>
                  <div className="text-gray-600 dark:text-dark-text-secondary">
                    Cities
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-dark-accent">
                    24/7
                  </div>
                  <div className="text-gray-600 dark:text-dark-text-secondary">
                    Support
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-gray-100 dark:bg-dark-primary rounded-lg p-8">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Community Impact"
                  className="aspect-video w-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Download CTA */}
      <section className="py-20 px-4 bg-dark-accent dark:bg-dark-accent text-gray-900 dark:text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Get the DESIST! App
              </h2>
              <p className="text-xl mb-8 text-gray-700 dark:text-white/90">
                Download our app to access support resources, report incidents,
                and connect with the community on the go.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://apps.apple.com/app/id1656112306"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-90 transition-opacity"
                >
                  <img
                    src="/Download_on_the_App_Store.webp"
                    alt="Download on the App Store"
                    className="h-12 md:h-16 object-contain"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.desist.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-90 transition-opacity"
                >
                  <img
                    src="/Google_Play_Store.webp"
                    alt="Get it on Google Play"
                    className="h-12 md:h-16 object-contain"
                  />
                </a>
              </div>
            </div>
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="App Preview"
                className="w-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white dark:text-dark-accent">
                DESIST!
              </h3>
              <p className="text-white/90 dark:text-dark-text-secondary">
                Creating safer spaces for everyone through community action and
                support.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white dark:text-dark-text-primary">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-white/90 hover:text-white dark:text-dark-text-secondary dark:hover:text-dark-text-primary transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources"
                    className="text-white/90 hover:text-white dark:text-dark-text-secondary dark:hover:text-dark-text-primary transition-colors"
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-white/90 hover:text-white dark:text-dark-text-secondary dark:hover:text-dark-text-primary transition-colors"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white/90 hover:text-white dark:text-dark-text-secondary dark:hover:text-dark-text-primary transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white dark:text-dark-text-primary">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-white/90 hover:text-white dark:text-dark-text-secondary dark:hover:text-dark-text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-white/90 hover:text-white dark:text-dark-text-secondary dark:hover:text-dark-text-primary transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-white/90 hover:text-white dark:text-dark-text-secondary dark:hover:text-dark-text-primary transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white dark:text-dark-text-primary">
                Connect
              </h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-white/90 hover:text-white dark:text-dark-text-secondary dark:hover:text-dark-text-primary transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-white/90 hover:text-white dark:text-dark-text-secondary dark:hover:text-dark-text-primary transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/20 dark:border-dark-secondary text-center text-white/90 dark:text-dark-text-secondary">
            <p>
              &copy; {new Date().getFullYear()} DESIST! All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
