import Link from "next/link";
import { ThemeToggle } from "../components/ThemeToggle";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">DESIST!</Link>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">About</Link>
            <Link href="/join" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">Join</Link>
            <Link href="/community" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">Community</Link>
            <Link href="/resources" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">Resources</Link>
            <Link href="/support" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">Support</Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">Contact</Link>
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-primary-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Learn about our journey, mission, and the values that drive us forward.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">The Story Behind DESIST!</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              DESIST! was born from a simple yet powerful idea: everyone deserves to feel safe and supported. 
              What started as a small community initiative has grown into a global movement, connecting people 
              and organizations dedicated to creating safer spaces for all.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Our journey began when a group of activists, survivors, and allies came together to address 
              the growing need for accessible support and resources in combating harassment. We recognized 
              that while many organizations were doing important work, there was a gap in connecting 
              individuals with the right resources at the right time.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Journey</h2>
          <div className="space-y-12">
            {[
              {
                year: "2020",
                title: "The Beginning",
                description: "DESIST! was founded with a mission to create safer spaces and provide support for those affected by harassment."
              },
              {
                year: "2021",
                title: "Community Growth",
                description: "Our community expanded to over 10,000 members across 50+ cities, creating a network of support and resources."
              },
              {
                year: "2022",
                title: "Mobile App Launch",
                description: "We launched our mobile app, making it easier for people to access support and report incidents on the go."
              },
              {
                year: "2023",
                title: "Global Impact",
                description: "DESIST! established partnerships with organizations worldwide, expanding our reach and impact."
              }
            ].map((milestone, index) => (
              <div key={index} className="flex gap-8">
                <div className="w-24 flex-shrink-0">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{milestone.year}</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Empowerment",
                description: "We believe in empowering individuals to take action and create change in their communities."
              },
              {
                title: "Support",
                description: "We provide comprehensive support to those affected by harassment, ensuring no one faces challenges alone."
              },
              {
                title: "Education",
                description: "We promote awareness and education to prevent harassment and create safer spaces."
              },
              {
                title: "Community",
                description: "We foster a strong, supportive community where everyone's voice is heard and valued."
              }
            ].map((value, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4 bg-primary-600 dark:bg-primary-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
          <p className="text-xl mb-8 opacity-90">
            We envision a world where everyone can live, work, and thrive in safe, supportive environments. 
            Through our collective efforts, we're building a future free from harassment and discrimination.
          </p>
          <Link 
            href="/join"
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            Join Our Movement
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DESIST!</h3>
              <p className="text-gray-400">
                Creating safer spaces for everyone through community action and support.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link href="/resources" className="text-gray-400 hover:text-white">Resources</Link></li>
                <li><Link href="/support" className="text-gray-400 hover:text-white">Support</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} DESIST! All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 