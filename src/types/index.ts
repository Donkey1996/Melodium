export interface Memory {
  id: string;
  title: string;
  description: string;
  musicUrl: string;
  musicTitle?: string;
  musicArtist?: string;
  primaryEmotion: string;
  subEmotions: string[];
  createdAt: Date;
  tags: string[];
}

export interface MusicInfo {
  url: string;
  title?: string;
  artist?: string;
  platform?: 'spotify' | 'youtube' | 'apple' | 'other';
}

export interface MemoryFormData {
  title: string;
  description: string;
  musicUrl: string;
  musicTitle: string;
  musicArtist: string;
  primaryEmotion: string;
  subEmotions: string[];
  tags: string[];
}
