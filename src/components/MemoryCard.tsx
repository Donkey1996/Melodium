import { Play, Calendar, Tag, FileText, Image, Video, Mic } from 'lucide-react';
import { Memory } from '../types';
import { motion } from 'framer-motion';
import { extractYouTubeVideoId, isYouTubeUrl } from '../utils/storage';

interface MemoryCardProps {
  memory: Memory;
  onPlay: (musicUrl: string) => void;
  onClick: () => void;
}

const MemoryCard = ({ memory, onPlay, onClick }: MemoryCardProps) => {
  const getMediaIcon = () => {
    switch (memory.mediaType) {
      case 'text':
        return <FileText className="w-4 h-4" />;
      case 'image':
        return <Image className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'audio':
        return <Mic className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const renderVideoContent = () => {
    if (memory.mediaType !== 'video' || !memory.mediaContent) return null;
    
    if (isYouTubeUrl(memory.mediaContent)) {
      const videoId = extractYouTubeVideoId(memory.mediaContent);
      if (videoId) {
        return (
          <div className="mb-4">
            <div className="aspect-video rounded-lg overflow-hidden bg-neutral-100">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        );
      }
    }
    
    return (
      <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
        <div className="flex items-center space-x-2 text-sm text-neutral-700">
          <Video className="w-4 h-4" />
          <span>Video URL: {memory.mediaContent}</span>
        </div>
      </div>
    );
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
          {getMediaIcon()}
          <span className="text-xs capitalize">{memory.mediaType}</span>
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

      {/* Video Content */}
      {renderVideoContent()}

      {/* Media Content Preview */}
      {memory.mediaContent && memory.mediaType !== 'video' && (
        <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
          <div className="text-sm text-neutral-700">
            {memory.mediaType === 'text' ? (
              <p className="line-clamp-3">{memory.mediaContent}</p>
            ) : (
              <div className="flex items-center space-x-2">
                {getMediaIcon()}
                <span>Media attached</span>
              </div>
            )}
          </div>
        </div>
      )}

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
