import { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { MemoryFormData } from '../types';
import { motion } from 'framer-motion';
import { EMOTION_DICTIONARY, getEmotionKeys } from '../utils/emotions';

interface CreateMemoryFormProps {
  onSubmit: (data: MemoryFormData) => void;
  onCancel: () => void;
}

const CreateMemoryForm = ({ onSubmit, onCancel }: CreateMemoryFormProps) => {
  const [formData, setFormData] = useState<MemoryFormData>({
    youtubeUrl: '',
    emotion: ''
  });

  const handleInputChange = (field: keyof MemoryFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.youtubeUrl && formData.emotion) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">Create New Memory</h2>
            <button
              onClick={onCancel}
              className="p-2 text-neutral-500 hover:text-neutral-700 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Emotion Section - First */}
            <div className="bg-neutral-50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary-100 rounded-xl">
                  <Heart className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">How do you feel?</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {getEmotionKeys().map((emotionKey) => {
                  const emotion = EMOTION_DICTIONARY[emotionKey];
                  return (
                    <button
                      key={emotionKey}
                      type="button"
                      onClick={() => handleInputChange('emotion', emotionKey)}
                      className={`p-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        formData.emotion === emotionKey
                          ? emotion.accent + ' shadow-lg scale-105'
                          : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200'
                      }`}
                    >
                      {emotion.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* YouTube URL */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                YouTube URL
              </label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
                className="input-field"
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex-1"
              >
                Create Memory
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateMemoryForm;
