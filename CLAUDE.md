# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (runs on http://localhost:5173)
- **Build for production**: `npm run build` (TypeScript compilation + Vite build)
- **Preview production build**: `npm run preview`
- **Lint code**: `npm run lint` (ESLint with TypeScript rules)

## Architecture Overview

Melodium is a React + TypeScript webapp that allows users to attach memories to music. The application follows a component-based architecture with local storage persistence.

### Core Data Flow
- All memories are stored in browser localStorage via `src/utils/storage.ts`
- State management uses React hooks (no external state library)
- The main `App.tsx` component orchestrates all interactions between components

### Key Components Structure
- **App.tsx**: Main container managing memory state and modals
- **MemoryCard**: Displays individual memories with play functionality
- **CreateMemoryForm**: Modal form for creating new memories
- **MusicPlayer**: Bottom player component for music playback
- **EmptyState**: Welcome screen when no memories exist

### Data Models
The core data structure is defined in `src/types/index.ts`:
- **Memory**: Main entity with id, title, description, music info, media content, and metadata
- **MemoryFormData**: Form structure for creating memories
- **MusicInfo**: Music platform and metadata structure

### Storage System
All data persistence happens through `src/utils/storage.ts`:
- `loadMemories()`: Retrieves all memories from localStorage
- `addMemory()`: Creates new memory with generated ID and timestamp
- `saveMemories()`: Persists memory array to localStorage
- Memory deletion is handled but not fully wired (see App.tsx:42)

### Styling Architecture
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for animations and transitions
- Custom CSS classes defined in `src/index.css`
- Responsive design with mobile-first approach
- Consistent color palette: neutral grays with blue accents

### Component Patterns
- All components use TypeScript with proper interface definitions
- Modals use AnimatePresence for smooth enter/exit animations
- Music player state is lifted to App level for global control
- Form validation and submission handled within CreateMemoryForm

## Development Notes

- The app uses Vite as the build tool with React plugin
- ESLint configured with TypeScript and React hooks rules
- No testing framework currently configured
- Media files are stored as File objects (not persisted in localStorage)
- Music URLs support any platform (Spotify, YouTube, Apple Music, etc.)

## Common Tasks

- **Adding new memory types**: Extend the `mediaType` union in `src/types/index.ts`
- **Modifying storage**: Update functions in `src/utils/storage.ts`
- **UI changes**: Components use Tailwind classes; global styles in `src/index.css`
- **Adding animations**: Use Framer Motion patterns already established in components

## YouTube Integration

The app now supports YouTube video URLs in memory cards:

### Features
- **YouTube URL Detection**: `isYouTubeUrl()` and `extractYouTubeVideoId()` utilities in `src/utils/storage.ts`
- **Embedded Playback**: YouTube videos render as embedded iframes in memory cards
- **URL Format Support**: Supports all common YouTube URL formats:
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
  - `https://www.youtube.com/embed/VIDEO_ID`

### Implementation Details
- When creating a memory with `mediaType: 'video'`, paste a YouTube URL in the media content field
- `MemoryCard` component automatically detects YouTube URLs and renders iframe embeds
- Non-YouTube video URLs display as plain text links
- Videos use responsive `aspect-video` Tailwind class for proper 16:9 ratio

## Deployment & Growth To-Do List

### Production Deployment (Vercel)
- [x] Connect GitHub repository to Vercel account
- [x] Configure automatic deployments from master branch
- [x] Optimize build configuration with manual chunks for better performance
- [ ] Set up custom domain (optional)
- [ ] Test production build functionality
- [ ] Monitor deployment logs and performance

### SEO & Technical Enhancements
- [ ] Add meta tags and Open Graph tags for social sharing
- [ ] Implement PWA features (service worker, app manifest)
- [ ] Add Google Analytics or Plausible for usage tracking
- [ ] Set up error tracking with Sentry
- [ ] Optimize bundle size and loading performance

### User Acquisition Strategies
- [ ] Launch on Product Hunt for developer/music communities
- [ ] Share on social media platforms (Twitter, Reddit r/webdev, r/music)
- [ ] Post in music-focused Discord servers and Facebook groups
- [ ] Write blog posts about music + memory psychology
- [ ] Create technical content about the React/TypeScript stack used

### Growth Features (Future)
- [ ] Spotify/Apple Music API integration for richer music data
- [ ] Memory sharing capabilities between users
- [ ] Export memories as shareable playlists
- [ ] Social features (following friends' memories)
- [ ] Mobile app version (React Native or PWA)
- [ ] Advanced search and filtering for memories
- [ ] Backup/sync functionality beyond localStorage