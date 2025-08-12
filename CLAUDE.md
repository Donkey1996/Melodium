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