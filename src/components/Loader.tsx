
import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-dark-300 z-50">
      <div className="text-center">
        <motion.div
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-24 h-24">
            <motion.div
              className="absolute inset-0 border-4 border-transparent border-t-primary-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-3 border-4 border-transparent border-t-accent-500 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
        
        <motion.h1
          className="text-2xl font-bold gradient-text mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Loading Portfolio
        </motion.h1>
        
        <motion.p
          className="text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Preparing something extraordinary...
        </motion.p>
      </div>
    </div>
  );
};

export default Loader;
