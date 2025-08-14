import { X, Play, Calendar, Tag, Heart, ExternalLink } from 'lucide-react';
import { Memory } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { EMOTION_DICTIONARY } from '../utils/emotions';

interface MemoryModalProps {
  memory: Memory;
  isOpen: boolean;
  onClose: () => void;
  onPlay: (musicUrl: string) => void;
}

const MemoryModal = ({ memory, isOpen, onClose, onPlay }: MemoryModalProps) => {
  const getEmotionColor = (emotion: string) => {
    const colors: Record<string, string> = {
      joyful: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      sad: 'bg-blue-100 text-blue-700 border-blue-200',
      nostalgic: 'bg-purple-100 text-purple-700 border-purple-200',
      peaceful: 'bg-green-100 text-green-700 border-green-200',
      energetic: 'bg-orange-100 text-orange-700 border-orange-200',
      romantic: 'bg-pink-100 text-pink-700 border-pink-200',
      reflective: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      excited: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[emotion] || 'bg-neutral-100 text-neutral-700 border-neutral-200';
  };

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

  const renderEmotions = () => {
    return (
      <div className="bg-neutral-50 rounded-xl p-6">
        <h4 className="font-medium text-neutral-900 mb-4 flex items-center space-x-2">
          <Heart className="w-5 h-5" />
          <span>Emotions</span>
        </h4>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-neutral-600 mb-2">Primary emotion:</p>
            <span className={`inline-block px-4 py-2 text-sm font-medium rounded-full border ${getEmotionColor(memory.primaryEmotion)}`}>
              {EMOTION_DICTIONARY[memory.primaryEmotion]?.label || memory.primaryEmotion}
            </span>
          </div>
          {memory.subEmotions.length > 0 && (
            <div>
              <p className="text-sm text-neutral-600 mb-2">Related emotions:</p>
              <div className="flex flex-wrap gap-2">
                {memory.subEmotions.map((subEmotion, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs bg-neutral-100 text-neutral-600 rounded-full border border-neutral-200"
                  >
                    {subEmotion}
                  </span>
                ))}
              </div>
            </div>
          )}
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
            <div className="flex items-start justify-between p-6 border-b border-neutral-200">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-medium text-neutral-600">
                    {EMOTION_DICTIONARY[memory.primaryEmotion]?.label || memory.primaryEmotion}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  {memory.title}
                </h2>
                <p className="text-neutral-600 leading-relaxed">
                  {memory.description}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors duration-200 ml-4"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Music Section */}
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6">
                <h3 className="font-semibold text-primary-900 mb-4">🎵 Music</h3>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-primary-900">
                      {memory.musicTitle || 'Unknown Track'}
                    </h4>
                    <p className="text-primary-700">
                      {memory.musicArtist || 'Unknown Artist'}
                    </p>
                    <a 
                      href={memory.musicUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-800 flex items-center space-x-1 mt-2"
                    >
                      <span>Open in music app</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <button
                    onClick={() => onPlay(memory.musicUrl)}
                    className="p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors duration-200"
                  >
                    <Play className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Emotions */}
              {renderEmotions()}

              {/* Tags */}
              {memory.tags.length > 0 && (
                <div className="bg-neutral-50 rounded-xl p-6">
                  <h4 className="font-medium text-neutral-900 mb-3 flex items-center space-x-2">
                    <Tag className="w-4 h-4" />
                    <span>Tags</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {memory.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

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