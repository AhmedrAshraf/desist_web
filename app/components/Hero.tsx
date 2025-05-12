import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative flex min-h-[300px] overflow-hidden">
      {/* Animated Lines Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Diagonal Lines */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={`diagonal-${i}`}
              className="absolute h-[1px] bg-orange-500"
              style={{
                top: `${20 + i * 15}%`,
                left: `-${i * 20}%`,
                width: '140%',
                transform: 'rotate(45deg)',
                animation: `slide-right 8s linear ${i * 0.5}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Horizontal Lines */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(3)].map((_, i) => (
            <div
              key={`horizontal-${i}`}
              className="absolute h-[1px] bg-orange-500"
              style={{
                top: `${30 + i * 20}%`,
                width: '100%',
                animation: `slide-left 6s linear ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Vertical Lines */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(4)].map((_, i) => (
            <div
              key={`vertical-${i}`}
              className="absolute w-[1px] h-full bg-orange-500"
              style={{
                left: `${20 + i * 20}%`,
                animation: `slide-up 7s linear ${i * 0.4}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Floating Circles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={`circle-${i}`}
              className="absolute rounded-full bg-orange-500/20"
              style={{
                width: `${20 + i * 10}px`,
                height: `${20 + i * 10}px`,
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
                animation: `float ${4 + i}s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-8 md:p-12 gap-8">
        <div className="max-w-xl space-y-8 animate-fade-in transform-gpu">
          <h1 className="text-5xl md:text-7xl font-bold text-orange-900 leading-tight">
            <span className="block animate-slide-down transform">
              Raise Your Voice
            </span>
            <span className="block mt-4 animate-slide-up transform">
              Stand For Justice
            </span>
          </h1>
          <p
            className="text-xl text-orange-900 animate-fade-in transform hover:scale-105 transition-all duration-300 hover:translate-z-10"
            style={{ animationDelay: "200ms" }}
          >
            Join the movement to create safer spaces for everyone. Report
            incidents, access support, and be part of the community.
          </p>
          <div
            className="flex gap-4 animate-slide-up transform hover:scale-105 transition-all duration-300"
            style={{ animationDelay: "400ms" }}
          >
            <a
              href="https://apps.apple.com/app/id1656112306"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:rotate-y-6 hover:translate-z-10"
            >
              <img
                src="/Download_on_the_App_Store.webp"
                alt="Download on the App Store"
                className="h-12 md:h-16 object-contain drop-shadow-lg"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.desist.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:rotate-y-6 hover:translate-z-10"
            >
              <img
                src="/Google_Play_Store.webp"
                alt="Get it on Google Play"
                className="h-12 md:h-16 object-contain drop-shadow-lg"
              />
            </a>
          </div>
        </div>

        {/* Mobile Device Image */}
        <div className="hidden lg:flex items-center justify-center animate-float">
          <div className="relative w-[500px] h-[600px] transform hover:scale-105 transition-all duration-300">
            <Image
              src="/mobile1.png"
              alt="DESIST! App Preview"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
