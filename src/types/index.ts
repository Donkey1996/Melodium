export interface Memory {
  id: string;
  youtubeUrl: string;
  songTitle?: string;
  artistName?: string;
  emotion: string;
  createdAt: Date;
}

export interface MusicInfo {
  url: string;
  title?: string;
  artist?: string;
  platform?: 'spotify' | 'youtube' | 'apple' | 'other';
}

export interface MemoryFormData {
  youtubeUrl: string;
  emotion: string;
}
