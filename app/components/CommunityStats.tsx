export const CommunityStats = () => {
  return (
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
  );
}; 