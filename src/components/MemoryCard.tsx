import { Play, Calendar, Tag, Heart } from 'lucide-react';
import { Memory } from '../types';
import { motion } from 'framer-motion';
import { EMOTION_DICTIONARY } from '../utils/emotions';

interface MemoryCardProps {
  memory: Memory;
  onPlay: (musicUrl: string) => void;
  onClick: () => void;
}

const MemoryCard = ({ memory, onPlay, onClick }: MemoryCardProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

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

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay(memory.musicUrl);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="memory-card p-6 hover:scale-[1.02] cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            {memory.title}
          </h3>
          <p className="text-neutral-600 text-sm leading-relaxed mb-4">
            {memory.description}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-neutral-500">
          <Heart className="w-4 h-4" />
          <span className="text-xs">{EMOTION_DICTIONARY[memory.primaryEmotion]?.label || memory.primaryEmotion}</span>
        </div>
      </div>

      {/* Music Section */}
      <div className="bg-neutral-50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="font-medium text-neutral-900">
              {memory.musicTitle || 'Unknown Track'}
            </h4>
            <p className="text-sm text-neutral-600">
              {memory.musicArtist || 'Unknown Artist'}
            </p>
          </div>
          <button
            onClick={handlePlayClick}
            className="p-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200"
          >
            <Play className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Emotions Display */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Heart className="w-4 h-4 text-neutral-600" />
          <span className="text-sm font-medium text-neutral-700">Emotions</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getEmotionColor(memory.primaryEmotion)}`}>
            {EMOTION_DICTIONARY[memory.primaryEmotion]?.label || memory.primaryEmotion}
          </span>
          {memory.subEmotions.map((subEmotion, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-neutral-100 text-neutral-600 rounded-full border border-neutral-200"
            >
              {subEmotion}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-neutral-500">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(memory.createdAt)}</span>
        </div>
        
        {memory.tags.length > 0 && (
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4" />
            <div className="flex space-x-1">
              {memory.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              {memory.tags.length > 2 && (
                <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                  +{memory.tags.length - 2}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MemoryCard;
