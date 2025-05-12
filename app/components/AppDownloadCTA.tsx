"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export const AppDownloadCTA = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 ">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Get the DESIST! App
            </h2>
            <p className="text-xl mb-8 leading-relaxed bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Download our app to access support resources, report incidents,
              and connect with the community on the go.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="https://apps.apple.com/app/id1656112306"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <Image
                    src="/Download_on_the_App_Store.webp"
                    alt="Download on the App Store"
                    width={160}
                    height={48}
                    className="h-12 md:h-16 w-auto object-contain drop-shadow-lg"
                  />
                  <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.a>
              <motion.a
                href="https://play.google.com/store/apps/details?id=com.desist.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <Image
                    src="/Google_Play_Store.webp"
                    alt="Get it on Google Play"
                    width={160}
                    height={48}
                    className="h-12 md:h-16 w-auto object-contain drop-shadow-lg"
                  />
                  <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative"
          >
            {/* Phone Frame */}
            <div className="relative w-[280px] h-[580px] mx-auto">
              {/* iPhone Frame */}
              <div className="absolute inset-0 bg-gray-900 rounded-[40px] shadow-2xl border-8 border-gray-800 overflow-hidden">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl" />
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-900 rounded-full" />

                {/* Screen Content */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/mobile2.png"
                    alt="App Preview"
                    fill
                    className="object-cover"
                  />
                  {/* Swipe Gesture Animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                </div>
              </div>

              {/* Android Frame */}
              <motion.div
                className="absolute -right-40 top-0 w-[280px] h-[580px]"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <div className="absolute inset-0 bg-gray-900 rounded-[20px] shadow-2xl border-4 border-gray-800 overflow-hidden">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-800 rounded-b-xl" />

                  {/* Screen Content */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src="/mobile2.png"
                      alt="App Preview"
                      fill
                      className="object-cover"
                    />
                    {/* Swipe Gesture Animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: 1,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};
