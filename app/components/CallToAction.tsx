import { motion } from "framer-motion";
import Link from "next/link";

interface CallToActionProps {
  title: string;
  description: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  pattern?: boolean;
}

export const CallToAction = ({
  title,
  description,
  primaryAction,
  secondaryAction,
  pattern = true,
}: CallToActionProps) => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-blue-900 dark:bg-blue-900 rounded-2xl p-8 md:p-12"
        >
          {pattern && (
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          )}
          
          <div className="relative z-10 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            >
              {description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href={primaryAction.href}
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                {primaryAction.label}
              </Link>
              {secondaryAction && (
                <Link
                  href={secondaryAction.href}
                  className="inline-flex items-center justify-center px-8 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  {secondaryAction.label}
                </Link>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 