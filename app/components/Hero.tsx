import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative flex container mx-auto mt-16">

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center p-8 md:p-12">
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
        <div className="hidden lg:flex flex-1 items-center justify-center animate-float">
          <div className="relative w-[500px] h-[600px] transform hover:scale-105 transition-all duration-300">
            <Image
              src="/mobile1.png"
              alt="DESIST! App Preview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
