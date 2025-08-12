import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface MusicPlayerProps {
  musicUrl: string;
  title?: string;
  artist?: string;
  onClose: () => void;
}

const MusicPlayer = ({ musicUrl, title, artist, onClose }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleExternalLink = () => {
    window.open(musicUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40"
    >
      <div className="glass-effect rounded-2xl p-4 shadow-2xl">
        <audio
          ref={audioRef}
          src={musicUrl}
          onEnded={() => setIsPlaying(false)}
          onError={() => setIsPlaying(false)}
        />
        
        <div className="flex items-center space-x-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors duration-200 shadow-lg"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-neutral-900 truncate">
              {title || 'Unknown Track'}
            </h4>
            <p className="text-sm text-neutral-600 truncate">
              {artist || 'Unknown Artist'}
            </p>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="p-2 text-neutral-600 hover:text-neutral-800 transition-colors duration-200"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* External Link */}
          <button
            onClick={handleExternalLink}
            className="p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-700 transition-colors duration-200"
          >
            <span className="text-lg">×</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
