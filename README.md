# Melodium 🎵

A minimal, calming webapp that allows you to attach cherished memories to your favorite music. Create a personal soundtrack of your life's moments with text, images, videos, and audio recordings.

## ✨ Features

- **Memory Creation**: Attach multimedia content (text, images, videos, audio) to music
- **Music Integration**: Link to any music URL (Spotify, YouTube, Apple Music, etc.)
- **Beautiful UI**: Modern, minimalist design with calming color palette
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Local Storage**: Your memories are saved locally in your browser
- **Smooth Animations**: Elegant transitions and micro-interactions
- **Music Player**: Built-in player for your linked music

## 🎨 Design Philosophy

- **Minimalist**: Clean, uncluttered interface that focuses on content
- **Calming**: Soft colors and smooth animations for a peaceful experience
- **Modern**: Contemporary design patterns and smooth interactions
- **Accessible**: Clear typography and intuitive navigation

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd melodium
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
# or
yarn build
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Hooks + Local Storage

## 📱 Usage

### Creating a Memory

1. Click the "Create New Memory" button
2. Fill in the memory details:
   - Title and description
   - Music URL (any playable link)
   - Track title and artist (optional)
   - Choose media type (text, image, video, audio)
   - Add tags for organization
3. Click "Create Memory"

### Playing Music

- Click the play button on any memory card
- Use the built-in music player at the bottom of the screen
- Control volume and playback
- Open music in a new tab for external playback

### Managing Memories

- Memories are automatically saved to your browser's local storage
- View all memories in a beautiful grid layout
- Each memory displays its media type and creation date

## 🎯 Supported Media Types

- **Text**: Write your memories directly in the app
- **Images**: Upload and attach photos
- **Videos**: Link to video content
- **Audio**: Record or upload audio clips

## 🔧 Customization

### Colors
The app uses a calming color palette defined in `tailwind.config.js`. You can customize:
- Primary colors (blues)
- Neutral colors (grays)
- Background gradients

### Styling
- Custom CSS classes in `src/index.css`
- Component-specific styles using Tailwind utilities
- Responsive breakpoints for different screen sizes

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # App header
│   ├── MemoryCard.tsx  # Individual memory display
│   ├── CreateMemoryForm.tsx # Memory creation form
│   ├── MusicPlayer.tsx # Music playback controls
│   └── EmptyState.tsx  # Empty state display
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by the connection between music and memories
- Built with modern web technologies for the best user experience
- Designed with accessibility and usability in mind

---

**Melodium** - Where memories meet music 🎵✨