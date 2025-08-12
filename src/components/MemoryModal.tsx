import { X, Play, Calendar, Tag, FileText, Image, Video, Mic, ExternalLink } from 'lucide-react';
import { Memory } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { extractYouTubeVideoId, isYouTubeUrl } from '../utils/storage';

interface MemoryModalProps {
  memory: Memory;
  isOpen: boolean;
  onClose: () => void;
  onPlay: (musicUrl: string) => void;
}

const MemoryModal = ({ memory, isOpen, onClose, onPlay }: MemoryModalProps) => {
  const getMediaIcon = () => {
    switch (memory.mediaType) {
      case 'text':
        return <FileText className="w-5 h-5" />;
      case 'image':
        return <Image className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'audio':
        return <Mic className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
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

  const renderMediaContent = () => {
    if (!memory.mediaContent) return null;

    switch (memory.mediaType) {
      case 'text':
        return (
          <div className="bg-neutral-50 rounded-xl p-6">
            <h4 className="font-medium text-neutral-900 mb-3 flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Memory Text</span>
            </h4>
            <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">
              {memory.mediaContent}
            </p>
          </div>
        );

      case 'video':
        if (isYouTubeUrl(memory.mediaContent)) {
          const videoId = extractYouTubeVideoId(memory.mediaContent);
          if (videoId) {
            return (
              <div className="bg-neutral-50 rounded-xl p-6">
                <h4 className="font-medium text-neutral-900 mb-3 flex items-center space-x-2">
                  <Video className="w-4 h-4" />
                  <span>Video</span>
                </h4>
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
          <div className="bg-neutral-50 rounded-xl p-6">
            <h4 className="font-medium text-neutral-900 mb-3 flex items-center space-x-2">
              <Video className="w-4 h-4" />
              <span>Video Link</span>
            </h4>
            <a 
              href={memory.mediaContent} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 flex items-center space-x-2"
            >
              <span>{memory.mediaContent}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        );

      case 'audio':
        return (
          <div className="bg-neutral-50 rounded-xl p-6">
            <h4 className="font-medium text-neutral-900 mb-3 flex items-center space-x-2">
              <Mic className="w-4 h-4" />
              <span>Audio</span>
            </h4>
            {memory.mediaContent.startsWith('http') ? (
              <audio controls className="w-full">
                <source src={memory.mediaContent} />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <div className="text-neutral-600">
                <p>Audio file: {memory.mediaContent}</p>
              </div>
            )}
          </div>
        );

      case 'image':
        return (
          <div className="bg-neutral-50 rounded-xl p-6">
            <h4 className="font-medium text-neutral-900 mb-3 flex items-center space-x-2">
              <Image className="w-4 h-4" />
              <span>Image</span>
            </h4>
            {memory.mediaContent.startsWith('http') ? (
              <img 
                src={memory.mediaContent} 
                alt="Memory"
                className="w-full rounded-lg"
              />
            ) : (
              <div className="text-neutral-600">
                <p>Image file: {memory.mediaContent}</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
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
                  {getMediaIcon()}
                  <span className="text-sm font-medium text-neutral-600 capitalize">
                    {memory.mediaType}
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

              {/* Media Content */}
              {renderMediaContent()}

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