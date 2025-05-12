export const Mission = () => {
  const missionItems = [
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
  ];

  return (
    <section className="py-20 px-4 bg-white dark:bg-dark-secondary">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-dark-text-primary mb-6">
          Mission Statement
        </h2>

        <div className="grid grid-cols-3 gap-8 my-12">
          {missionItems.map((item, index) => (
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
  );
}; 