import { useState, useRef } from 'react';
import { Plus, Music, FileText, Image, Video, Mic, X } from 'lucide-react';
import { MemoryFormData } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface CreateMemoryFormProps {
  onSubmit: (data: MemoryFormData) => void;
  onCancel: () => void;
}

const CreateMemoryForm = ({ onSubmit, onCancel }: CreateMemoryFormProps) => {
  const [formData, setFormData] = useState<MemoryFormData>({
    title: '',
    description: '',
    musicUrl: '',
    musicTitle: '',
    musicArtist: '',
    mediaType: 'text',
    mediaContent: '',
    tags: []
  });

  const [tagInput, setTagInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof MemoryFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      handleInputChange('tags', [...formData.tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // For now, we'll just store the file name as content
      // In a real app, you'd upload to a server and store the URL
      handleInputChange('mediaContent', file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.musicUrl) {
      onSubmit(formData);
    }
  };

  const getMediaIcon = () => {
    switch (formData.mediaType) {
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
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Memory Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="input-field"
                placeholder="What's this memory about?"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="input-field resize-none"
                rows={3}
                placeholder="Tell us more about this memory..."
              />
            </div>

            {/* Music Section */}
            <div className="bg-neutral-50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary-100 rounded-xl">
                  <Music className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">Music</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Music URL
                  </label>
                  <input
                    type="url"
                    value={formData.musicUrl}
                    onChange={(e) => handleInputChange('musicUrl', e.target.value)}
                    className="input-field"
                    placeholder="https://..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Track Title
                  </label>
                  <input
                    type="text"
                    value={formData.musicTitle}
                    onChange={(e) => handleInputChange('musicTitle', e.target.value)}
                    className="input-field"
                    placeholder="Song name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Artist
                  </label>
                  <input
                    type="text"
                    value={formData.musicArtist}
                    onChange={(e) => handleInputChange('musicArtist', e.target.value)}
                    className="input-field"
                    placeholder="Artist name"
                  />
                </div>
              </div>
            </div>

            {/* Media Section */}
            <div className="bg-neutral-50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary-100 rounded-xl">
                  {getMediaIcon()}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">Memory Media</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Media Type
                  </label>
                  <select
                    value={formData.mediaType}
                    onChange={(e) => handleInputChange('mediaType', e.target.value as any)}
                    className="input-field"
                  >
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio Recording</option>
                  </select>
                </div>

                {formData.mediaType === 'text' ? (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Text Content
                    </label>
                    <textarea
                      value={formData.mediaContent}
                      onChange={(e) => handleInputChange('mediaContent', e.target.value)}
                      className="input-field resize-none"
                      rows={4}
                      placeholder="Write your memory here..."
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Upload {formData.mediaType.charAt(0).toUpperCase() + formData.mediaType.slice(1)}
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileUpload}
                      accept={
                        formData.mediaType === 'image' ? 'image/*' :
                        formData.mediaType === 'video' ? 'video/*' :
                        formData.mediaType === 'audio' ? 'audio/*' : '*'
                      }
                      className="input-field"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Tags
              </label>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="input-field flex-1"
                  placeholder="Add a tag..."
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="btn-secondary"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <AnimatePresence>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-primary-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.span>
                    ))}
                  </div>
                )}
              </AnimatePresence>
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
