# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (runs on http://localhost:5173)
- **Build for production**: `npm run build` (TypeScript compilation + Vite build)
- **Preview production build**: `npm run preview`
- **Lint code**: `npm run lint` (ESLint with TypeScript rules)

## Architecture Overview

Melodium is a minimalist emotion-based YouTube memory tracker built with React + TypeScript. Users select emotions and attach YouTube videos to create visual emotional memories.

### Core Data Flow
- All memories stored in browser localStorage via `src/utils/storage.ts`
- State management uses React hooks (no external state library)
- YouTube metadata automatically extracted via oEmbed API
- Memories sorted by emotion type for consistent grouping

### Key Components Structure
- **App.tsx**: Main container with memory CRUD operations and emotion sorting
- **MemoryCard**: Displays memories with embedded YouTube player and delete functionality
- **CreateMemoryForm**: Simple form with emotion selection + YouTube URL input
- **MemoryModal**: Minimal modal for detailed memory view
- **EmptyState**: Welcome screen when no memories exist

### Data Models
The core data structure is defined in `src/types/index.ts`:
- **Memory**: Main entity with id, youtubeUrl, songTitle, artistName, emotion, createdAt
- **MemoryFormData**: Form structure for creating memories (youtubeUrl + emotion)

### Storage System
All data persistence happens through `src/utils/storage.ts`:
- `loadMemories()`: Retrieves all memories from localStorage
- `addMemory()`: Creates memory with YouTube metadata extraction
- `deleteMemory()`: Removes memory by ID
- `saveMemories()`: Persists memory array to localStorage

### Styling Architecture
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for animations and transitions
- **Emotion-based gradients** via `src/utils/emotions.ts`
- Responsive design with mobile-first approach
- Clean minimalist aesthetic with emotion-driven theming

### Component Patterns
- All components use TypeScript with proper interface definitions
- Cards use AnimatePresence for smooth creation/deletion animations
- Embedded YouTube iframes with hover-revealed delete buttons
- Memory cards expand when playing videos with layout animations
- Confirmation dialogs for destructive actions (delete)

## Development Notes

- The app uses Vite as the build tool with React plugin
- ESLint configured with TypeScript and React hooks rules
- No testing framework currently configured
- YouTube metadata extracted automatically via oEmbed API
- Local storage persistence with automatic save/load
- Vercel Analytics enabled for usage tracking

## Common Tasks

- **Adding new emotions**: Extend the `EMOTION_DICTIONARY` in `src/utils/emotions.ts`
- **Modifying storage**: Update functions in `src/utils/storage.ts`
- **UI changes**: Components use Tailwind classes; emotion gradients in emotions.ts
- **Adding animations**: Use Framer Motion patterns already established in components

## Core Features

### Emotion System
- **8 Primary Emotions**: joyful, excited, energetic, romantic, peaceful, nostalgic, reflective, sad
- **Emotion Dictionary**: `src/utils/emotions.ts` defines labels, gradients, and accent colors
- **Automatic Sorting**: Memory cards sorted by emotion type for visual grouping
- **Gradient Theming**: Each emotion has unique background gradient and accent color

### YouTube Integration
- **URL Support**: All common YouTube URL formats (watch, youtu.be, embed)
- **Metadata Extraction**: Automatic song/artist extraction via YouTube oEmbed API
- **Embedded Player**: Videos play directly in expandable memory cards
- **Fallback Handling**: Graceful handling of videos with embedding restrictions

### Memory Management
- **CRUD Operations**: Create, read, delete memories with confirmation dialogs
- **Local Storage**: Automatic persistence with error handling
- **Hover Interactions**: Delete button revealed on card hover
- **Modal View**: Clean minimal modal for detailed memory viewing

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