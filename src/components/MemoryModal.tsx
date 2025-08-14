import { X, Play, Calendar, Heart, ExternalLink } from 'lucide-react';
import { Memory } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { EMOTION_DICTIONARY } from '../utils/emotions';
import { openYouTubeVideo } from '../utils/youtube';

interface MemoryModalProps {
  memory: Memory;
  isOpen: boolean;
  onClose: () => void;
}

const MemoryModal = ({ memory, isOpen, onClose }: MemoryModalProps) => {

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const renderEmotion = () => {
    const emotion = EMOTION_DICTIONARY[memory.emotion];
    return (
      <div className="bg-neutral-50 rounded-xl p-6">
        <h4 className="font-medium text-neutral-900 mb-4 flex items-center space-x-2">
          <Heart className="w-5 h-5" />
          <span>Feeling</span>
        </h4>
        <div className={`inline-block px-6 py-3 text-lg font-medium rounded-full ${emotion?.accent || 'bg-neutral-500 text-white'}`}>
          {emotion?.label || memory.emotion}
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-end p-4">
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Music Section */}
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {memory.songTitle && memory.artistName ? (
                      <div>
                        <h4 className="text-lg font-medium text-primary-900">{memory.songTitle}</h4>
                        <p className="text-primary-700">{memory.artistName}</p>
                      </div>
                    ) : (
                      <div>
                        <h4 className="text-lg font-medium text-primary-900">YouTube Video</h4>
                      </div>
                    )}
                    <a 
                      href={memory.youtubeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-800 flex items-center space-x-1 mt-2"
                    >
                      <span>Open on YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <button
                    onClick={() => openYouTubeVideo(memory.youtubeUrl)}
                    className="p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors duration-200"
                  >
                    <Play className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Emotion */}
              {renderEmotion()}

              {/* Footer */}
              <div className="flex items-center space-x-2 text-sm text-neutral-500 pt-4 border-t border-neutral-200">
                <Calendar className="w-4 h-4" />
                <span>Created on {formatDate(memory.createdAt)}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MemoryModal;