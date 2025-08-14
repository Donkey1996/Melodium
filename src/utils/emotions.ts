export interface Emotion {
  label: string;
  background: string;
  accent: string;
}

export const EMOTION_DICTIONARY: Record<string, Emotion> = {
  joyful: {
    label: 'Joyful',
    background: 'bg-gradient-to-br from-yellow-100 via-orange-50 to-amber-100',
    accent: 'bg-yellow-500 text-white'
  },
  sad: {
    label: 'Sad',
    background: 'bg-gradient-to-br from-blue-100 via-slate-50 to-indigo-100',
    accent: 'bg-blue-500 text-white'
  },
  nostalgic: {
    label: 'Nostalgic',
    background: 'bg-gradient-to-br from-purple-100 via-violet-50 to-indigo-100',
    accent: 'bg-purple-500 text-white'
  },
  peaceful: {
    label: 'Peaceful',
    background: 'bg-gradient-to-br from-teal-100 via-emerald-50 to-green-100',
    accent: 'bg-teal-500 text-white'
  },
  energetic: {
    label: 'Energetic',
    background: 'bg-gradient-to-br from-orange-100 via-red-50 to-pink-100',
    accent: 'bg-orange-500 text-white'
  },
  romantic: {
    label: 'Romantic',
    background: 'bg-gradient-to-br from-pink-100 via-rose-50 to-red-100',
    accent: 'bg-pink-500 text-white'
  },
  reflective: {
    label: 'Reflective',
    background: 'bg-gradient-to-br from-gray-100 via-slate-50 to-stone-100',
    accent: 'bg-gray-500 text-white'
  },
  excited: {
    label: 'Excited',
    background: 'bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100',
    accent: 'bg-red-500 text-white'
  }
};

export const getEmotionKeys = (): string[] => {
  return Object.keys(EMOTION_DICTIONARY);
};