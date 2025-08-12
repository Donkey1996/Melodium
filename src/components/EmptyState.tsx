import { Music, Plus, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  onCreateMemory: () => void;
}

const EmptyState = ({ onCreateMemory }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-20 px-6"
    >
      <div className="max-w-md mx-auto">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-8"
        >
          <Music className="w-12 h-12 text-primary-600" />
        </motion.div>

        {/* Text */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-neutral-900 mb-4"
        >
          Start Your Musical Journey
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-neutral-600 mb-8 leading-relaxed"
        >
          Attach your cherished memories to your favorite music. 
          Create a personal soundtrack of your life's moments.
        </motion.p>

        {/* Action Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onCreateMemory}
          className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
        >
          <Plus className="w-5 h-5" />
          <span>Create Your First Memory</span>
        </motion.button>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex justify-center space-x-4"
        >
          <div className="flex items-center space-x-2 text-neutral-400">
            <Heart className="w-4 h-4" />
            <span className="text-sm">Text memories</span>
          </div>
          <div className="flex items-center space-x-2 text-neutral-400">
            <Heart className="w-4 h-4" />
            <span className="text-sm">Photo albums</span>
          </div>
          <div className="flex items-center space-x-2 text-neutral-400">
            <Heart className="w-4 h-4" />
            <span className="text-sm">Voice notes</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmptyState;
