export interface EmotionGroup {
  label: string;
  subEmotions: string[];
}

export const EMOTION_DICTIONARY: Record<string, EmotionGroup> = {
  joyful: {
    label: 'Joyful',
    subEmotions: ['ecstatic', 'elated', 'cheerful', 'content', 'blissful', 'euphoric']
  },
  sad: {
    label: 'Sad',
    subEmotions: ['melancholy', 'sorrowful', 'heartbroken', 'gloomy', 'blue', 'dejected']
  },
  nostalgic: {
    label: 'Nostalgic',
    subEmotions: ['wistful', 'reminiscent', 'bittersweet', 'yearning', 'longing', 'sentimental']
  },
  peaceful: {
    label: 'Peaceful',
    subEmotions: ['serene', 'calm', 'tranquil', 'relaxed', 'centered', 'meditative']
  },
  energetic: {
    label: 'Energetic',
    subEmotions: ['pumped', 'motivated', 'invigorated', 'dynamic', 'vibrant', 'alive']
  },
  romantic: {
    label: 'Romantic',
    subEmotions: ['passionate', 'tender', 'loving', 'intimate', 'affectionate', 'devoted']
  },
  reflective: {
    label: 'Reflective',
    subEmotions: ['contemplative', 'thoughtful', 'introspective', 'pensive', 'meditative', 'philosophical']
  },
  excited: {
    label: 'Excited',
    subEmotions: ['thrilled', 'enthusiastic', 'anticipating', 'eager', 'exhilarated', 'electrified']
  }
};

export const getEmotionKeys = (): string[] => {
  return Object.keys(EMOTION_DICTIONARY);
};

export const getSubEmotions = (emotionKey: string): string[] => {
  return EMOTION_DICTIONARY[emotionKey]?.subEmotions || [];
};