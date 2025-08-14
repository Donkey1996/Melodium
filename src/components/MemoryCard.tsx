import { Play, X, Trash2 } from 'lucide-react';
import { Memory } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { EMOTION_DICTIONARY } from '../utils/emotions';
import { extractYouTubeVideoId } from '../utils/youtube';
import { useState } from 'react';

interface MemoryCardProps {
  memory: Memory;
  onClick: () => void;
  onDelete: (id: string) => void;
}

const MemoryCard = ({ memory, onClick, onDelete }: MemoryCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
  };

  const handleCloseVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this memory?')) {
      onDelete(memory.id);
    }
  };

  const currentEmotion = EMOTION_DICTIONARY[memory.emotion];
  const backgroundClass = currentEmotion?.background || 'bg-gradient-to-br from-neutral-100 to-neutral-200';
  const videoId = extractYouTubeVideoId(memory.youtubeUrl);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group ${backgroundClass} rounded-2xl border border-white/50 shadow-lg p-6 hover:scale-[1.02] cursor-pointer transition-all duration-300 relative ${
        isPlaying ? 'col-span-1 md:col-span-2 lg:col-span-2' : ''
      }`}
      onClick={isPlaying ? undefined : onClick}
    >
      {/* Emotion Flag - Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <div className={`px-3 py-1 text-xs font-medium rounded-full ${currentEmotion?.accent || 'bg-neutral-500 text-white'}`}>
          {currentEmotion?.label || memory.emotion}
        </div>
      </div>

      {/* Delete Button - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleDelete}
          className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Close Video Button */}
      {isPlaying && (
        <div className="absolute top-4 right-16 z-10">
          <button
            onClick={handleCloseVideo}
            className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Video Player */}
      <AnimatePresence>
        {isPlaying && videoId && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 mt-12"
          >
            <div className="aspect-video rounded-xl overflow-hidden bg-neutral-900">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Song Info */}
      <div className={`${isPlaying ? 'mt-4' : 'mt-12 mb-6'} pr-16`}>
        <h3 className="text-lg font-bold text-neutral-900 mb-1">
          {memory.songTitle || 'Unknown Song'}
        </h3>
        <p className="text-neutral-700 font-medium">
          {memory.artistName || 'Unknown Artist'}
        </p>
      </div>

      {/* Play Button */}
      {!isPlaying && (
        <div className="flex justify-center">
          <button
            onClick={handlePlayClick}
            className="p-4 bg-white/90 hover:bg-white text-neutral-700 hover:text-neutral-900 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Play className="w-6 h-6" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default MemoryCard;
