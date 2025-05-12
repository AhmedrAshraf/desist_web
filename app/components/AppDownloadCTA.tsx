import Image from "next/image";

export const AppDownloadCTA = () => {
  return (
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
                className="hover:opacity-90 transition-opacity transform hover:scale-105 duration-300"
              >
                <Image
                  src="/Download_on_the_App_Store.webp"
                  alt="Download on the App Store"
                  width={160}
                  height={48}
                  className="h-12 md:h-16 w-auto object-contain drop-shadow-lg"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.desist.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-90 transition-opacity transform hover:scale-105 duration-300"
              >
                <Image
                  src="/Google_Play_Store.webp"
                  alt="Get it on Google Play"
                  width={160}
                  height={48}
                  className="h-12 md:h-16 w-auto object-contain drop-shadow-lg"
                />
              </a>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-gray-100 dark:bg-dark-primary rounded-lg p-8 shadow-lg">
              <Image
                src="/banner.jpg"
                alt="App Preview"
                width={600}
                height={400}
                className="aspect-video w-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 