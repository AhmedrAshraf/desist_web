"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

export const Hero = () => {
  const heroRef = useRef(null);

  // Add mouse move effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      heroRef.current.style.setProperty('--mouse-x', x);
      heroRef.current.style.setProperty('--mouse-y', y);
    };

    heroRef.current.addEventListener('mousemove', handleMouseMove);
    return () => {
      heroRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      className="relative flex min-h-[300px] overflow-hidden bg-gradient-to-br from-blue-50 to-white"
      ref={heroRef}
      style={{
        '--mouse-x': 0.5,
        '--mouse-y': 0.5,
      }}
    >
      {/* Animated Particles Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-blue-200/50"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.6 + 0.2,
              transform: `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`,
            }}
          />
        ))}
      </div>

      {/* Animated Lines Background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {/* Diagonal Lines */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={`diagonal-${i}`}
              className="absolute h-[1px] bg-gradient-to-r from-blue-400 to-blue-600"
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
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={`horizontal-${i}`}
              className="absolute h-[1px] bg-gradient-to-r from-blue-400 to-blue-600"
              style={{
                top: `${30 + i * 20}%`,
                width: '100%',
                animation: `slide-left 6s linear ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Vertical Lines */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div
              key={`vertical-${i}`}
              className="absolute w-[1px] h-full bg-gradient-to-b from-blue-400 to-blue-600"
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
              className="absolute rounded-full bg-blue-300/30 backdrop-blur-sm"
              style={{
                width: `${20 + i * 10}px`,
                height: `${20 + i * 10}px`,
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
                animation: `float ${4 + i}s ease-in-out ${i * 0.2}s infinite`,
                filter: 'blur(1px)',
              }}
            />
          ))}
        </div>

        {/* Animated Grid */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10">
          {[...Array(12 * 12)].map((_, i) => (
            <div
              key={`grid-${i}`}
              className="border border-blue-200"
              style={{
                animation: `pulse ${Math.random() * 5 + 3}s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Light Beam Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), rgba(255,255,255,0.2) 0%, transparent 70%)`,
          transition: 'background 0.3s ease-out',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-8 md:p-12 gap-8">
        <div className="max-w-xl space-y-8 animate-fade-in transform-gpu">
          <h1 className="text-5xl md:text-7xl font-bold text-blue-900 leading-tight">
            <span 
              className="block animate-slide-down transform hover:scale-105 transition-transform duration-300"
              style={{ textShadow: '0 2px 10px rgba(37, 99, 235, 0.2)' }}
            >
              Raise Your Voice
            </span>
            <span 
              className="block mt-4 animate-slide-up transform hover:scale-105 transition-transform duration-300"
              style={{ textShadow: '0 2px 10px rgba(37, 99, 235, 0.2)' }}
            >
              Stand For Justice
            </span>
          </h1>
          <p
            className="text-xl text-blue-800 animate-fade-in transform hover:scale-105 transition-all duration-300 hover:translate-z-10 backdrop-blur-sm bg-white/30 p-4 rounded-lg"
            style={{ 
              animationDelay: "200ms",
              boxShadow: '0 4px 20px rgba(37, 99, 235, 0.1)'
            }}
          >
            Join the movement to create safer spaces for everyone. Report
            incidents, access support, and be part of the community.
          </p>
          <div
            className="flex gap-4 animate-slide-up"
            style={{ animationDelay: "400ms" }}
          >
            <a
              href="https://apps.apple.com/app/id1656112306"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 transition-all duration-300 transform hover:scale-105"
            >
              <img
                src="/Download_on_the_App_Store.webp"
                alt="Download on the App Store"
                className="h-8 md:h-12 object-contain drop-shadow-lg hover:drop-shadow-xl transition-all"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.desist.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 transition-all duration-300 transform hover:scale-105"
            >
              <img
                src="/Google_Play_Store.webp"
                alt="Get it on Google Play"
                className="h-8 md:h-12 object-contain drop-shadow-lg hover:drop-shadow-xl transition-all"
              />
            </a>
          </div>
        </div>

        {/* Mobile Device Image - Removed waving animation */}
        <div className="hidden lg:flex items-center justify-center">
          <div 
            className="relative w-[500px] h-[600px] transform transition-all duration-300"
            style={{
              filter: 'drop-shadow(0 20px 30px rgba(37, 99, 235, 0.3))',
            }}
          >
            <div className="absolute inset-0 bg-blue-100 rounded-[60px] opacity-20 blur-xl -z-10" />
            <Image
              src="/mobile1.png"
              alt="DESIST! App Preview"
              fill
              className="object-contain"
              priority
            />
            {/* Screen glow effect */}
            <div 
              className="absolute inset-0 rounded-[40px] overflow-hidden pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 60px rgba(255, 255, 255, 0.6)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes slide-right {
          0% { transform: rotate(45deg) translateX(-100%); }
          100% { transform: rotate(45deg) translateX(100%); }
        }
        @keyframes slide-left {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes slide-up {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
        @keyframes pulse {
          0% { opacity: 0.1; }
          100% { opacity: 0.3; }
        }
        @keyframes slide-down {
          0% { transform: translateY(-30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes slide-up {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </section>
  );
};