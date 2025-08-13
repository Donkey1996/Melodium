import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import MemoryCard from './components/MemoryCard';
import CreateMemoryForm from './components/CreateMemoryForm';
import MusicPlayer from './components/MusicPlayer';
import EmptyState from './components/EmptyState';
import MemoryModal from './components/MemoryModal';
import { Memory, MemoryFormData } from './types';
import { loadMemories, addMemory } from './utils/storage';

function App() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<{
    musicUrl: string;
    title?: string;
    artist?: string;
  } | null>(null);

  useEffect(() => {
    // Load memories from localStorage on app start
    const savedMemories = loadMemories();
    setMemories(savedMemories);
  }, []);

  const handleCreateMemory = (formData: MemoryFormData) => {
    const newMemory = addMemory(formData);
    setMemories(prev => [newMemory, ...prev]);
    setShowCreateForm(false);
  };

  const handlePlayMusic = (musicUrl: string, title?: string, artist?: string) => {
    setCurrentPlayer({ musicUrl, title, artist });
  };

  const handleClosePlayer = () => {
    setCurrentPlayer(null);
  };

  const handleMemoryClick = (memory: Memory) => {
    setSelectedMemory(memory);
  };

  const handleCloseModal = () => {
    setSelectedMemory(null);
  };

  // const handleDeleteMemory = (id: string) => {
  //   setMemories(prev => prev.filter(memory => memory.id !== id));
  //   // Note: In a real app, you'd also call deleteMemory from storage utils
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Create Memory Button */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="text-2xl">+</span>
            <span>Create New Memory</span>
          </button>
        </div>

        {/* Memories Grid */}
        {memories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {memories.map((memory) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  onPlay={(musicUrl) => handlePlayMusic(
                    musicUrl, 
                    memory.musicTitle, 
                    memory.musicArtist
                  )}
                  onClick={() => handleMemoryClick(memory)}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <EmptyState onCreateMemory={() => setShowCreateForm(true)} />
        )}
      </main>

      {/* Create Memory Form Modal */}
      <AnimatePresence>
        {showCreateForm && (
          <CreateMemoryForm
            onSubmit={handleCreateMemory}
            onCancel={() => setShowCreateForm(false)}
          />
        )}
      </AnimatePresence>

      {/* Memory Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <MemoryModal
            memory={selectedMemory}
            isOpen={!!selectedMemory}
            onClose={handleCloseModal}
            onPlay={(musicUrl) => handlePlayMusic(
              musicUrl,
              selectedMemory.musicTitle,
              selectedMemory.musicArtist
            )}
          />
        )}
      </AnimatePresence>

      {/* Music Player */}
      <AnimatePresence>
        {currentPlayer && (
          <MusicPlayer
            musicUrl={currentPlayer.musicUrl}
            title={currentPlayer.title}
            artist={currentPlayer.artist}
            onClose={handleClosePlayer}
          />
        )}
      </AnimatePresence>

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
