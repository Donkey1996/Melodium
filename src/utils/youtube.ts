export interface YouTubeMetadata {
  title: string;
  author: string;
  videoId: string;
}

export const extractYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
};

export const isYouTubeUrl = (url: string): boolean => {
  return extractYouTubeVideoId(url) !== null;
};

export const getYouTubeMetadata = async (url: string): Promise<YouTubeMetadata | null> => {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;

  try {
    // Use YouTube oEmbed API to get metadata
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const response = await fetch(oembedUrl);
    
    if (!response.ok) throw new Error('Failed to fetch metadata');
    
    const data = await response.json();
    
    // Parse title to extract song and artist if possible
    const title = data.title || 'Unknown Title';
    const author = data.author_name || 'Unknown Artist';
    
    // Try to extract song and artist from title
    // Common patterns: "Artist - Song", "Song by Artist", "Artist: Song"
    let songTitle = title;
    let artistName = author;
    
    const patterns = [
      /^(.+?)\s*-\s*(.+)$/, // "Artist - Song"
      /^(.+?)\s*:\s*(.+)$/, // "Artist: Song"
      /^(.+?)\s+by\s+(.+)$/i, // "Song by Artist"
    ];
    
    for (const pattern of patterns) {
      const match = title.match(pattern);
      if (match) {
        artistName = match[1].trim();
        songTitle = match[2].trim();
        break;
      }
    }
    
    return {
      title: songTitle,
      author: artistName,
      videoId
    };
  } catch (error) {
    console.error('Error fetching YouTube metadata:', error);
    return {
      title: 'Unknown Song',
      author: 'Unknown Artist',
      videoId
    };
  }
};

export const openYouTubeVideo = (url: string): void => {
  window.open(url, '_blank', 'noopener,noreferrer');
};