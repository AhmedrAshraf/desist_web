import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative flex mt-10">
      {/* Left Content */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-12">
        <div className="max-w-xl space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-orange-700 leading-tight">
            <span className="block animate-slide-down">Raise Your Voice</span>
            <span className="block mt-4 animate-slide-up">Stand For Justice</span>
          </h1>
          <p className="text-xl text-orange-800 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Join the movement to create safer spaces for everyone. Report
            incidents, access support, and be part of the community.
          </p>
          <div className="flex gap-4 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <a
              href="https://apps.apple.com/app/id1656112306"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 transition-opacity transform hover:scale-105 duration-300"
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
              className="hover:opacity-90 transition-opacity transform hover:scale-105 duration-300"
            >
              <img
                src="/Google_Play_Store.webp"
                alt="Get it on Google Play"
                className="h-12 md:h-16 object-contain drop-shadow-lg"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden md:block flex-1 relative">
        <Image
          src="https://plus.unsplash.com/premium_photo-1708938893194-eaa4bf9efffd?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero Image"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-transparent"></div>
      </div>
    </section>
  );
};
