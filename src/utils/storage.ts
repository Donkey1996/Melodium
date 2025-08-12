import { Memory } from '../types';

const STORAGE_KEY = 'melodium_memories';

export const saveMemories = (memories: Memory[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  } catch (error) {
    console.error('Failed to save memories:', error);
  }
};

export const loadMemories = (): Memory[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const memories = JSON.parse(stored);
      // Convert date strings back to Date objects
      return memories.map((memory: any) => ({
        ...memory,
        createdAt: new Date(memory.createdAt)
      }));
    }
  } catch (error) {
    console.error('Failed to load memories:', error);
  }
  return [];
};

export const addMemory = (memory: Omit<Memory, 'id' | 'createdAt'>): Memory => {
  const newMemory: Memory = {
    ...memory,
    id: generateId(),
    createdAt: new Date()
  };
  
  const memories = loadMemories();
  memories.unshift(newMemory); // Add to beginning
  saveMemories(memories);
  
  return newMemory;
};

export const deleteMemory = (id: string): void => {
  const memories = loadMemories();
  const filtered = memories.filter(memory => memory.id !== id);
  saveMemories(filtered);
};

export const updateMemory = (id: string, updates: Partial<Memory>): Memory | null => {
  const memories = loadMemories();
  const index = memories.findIndex(memory => memory.id === id);
  
  if (index !== -1) {
    memories[index] = { ...memories[index], ...updates };
    saveMemories(memories);
    return memories[index];
  }
  
  return null;
};

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
