import Image from "next/image";

export const Features = () => {
  const features = [
    {
      title: "Secure Reporting",
      description: "Confidential reporting system with immediate support access.",
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
      image: "/banner.jpg",
    },
    {
      title: "Support Resources",
      description: "Comprehensive guides and legal resources for difficult situations.",
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
      image: "/banner.jpg",
    },
    {
      title: "Community Support",
      description: "Connect with others and create safer spaces together.",
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
      image: "/banner.jpg",
    },
  ];

  return (
    <section
      className="relative py-20 px-4"
      style={{
        backgroundImage: "url('/banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/80 dark:bg-dark-primary/80 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-dark-text-primary mb-12 animate-slide-down">
            How We Help
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/90 dark:bg-dark-secondary/90 backdrop-blur-md p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-white/20 dark:border-dark-secondary/50 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="mb-6 animate-bounce-slow">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-dark-text-secondary mb-4">
                  {feature.description}
                </p>
                <div className="aspect-video rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};