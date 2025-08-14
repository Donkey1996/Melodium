# Melodium ♪

A minimalist emotion-based memory tracker for YouTube music. Attach feelings to your favorite YouTube videos and create a visual emotional soundtrack of your life.

## ✨ Features

- **Emotion-Based Memories**: Choose from 8 emotions (joyful, excited, romantic, peaceful, etc.)
- **YouTube Integration**: Paste any YouTube URL with automatic song/artist extraction
- **Embedded Player**: Watch videos directly in expandable memory cards
- **Emotion Sorting**: Cards automatically grouped by emotion type
- **Memory Management**: Create, view, and delete memories with confirmation
- **Gradient Backgrounds**: Emotion-based visual theming for each memory
- **Responsive Design**: Beautiful on desktop and mobile

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

1. Click "Create New Memory"
2. Select your emotion (8 options available)
3. Paste a YouTube URL
4. Click "Create Memory" - song/artist auto-extracted

### Interacting with Memories

- **Play**: Click play button to watch embedded video
- **Delete**: Hover card, click trash icon (with confirmation)
- **View Details**: Click card to open modal with YouTube link
- **Automatic Sorting**: Cards grouped by emotion type

### Memory Management

- Local browser storage with automatic save
- Emotion-based gradient backgrounds for visual organization
- Responsive grid layout with smooth animations

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
│   ├── MemoryCard.tsx  # Memory cards with embedded YouTube player
│   ├── CreateMemoryForm.tsx # Emotion + YouTube URL form
│   ├── MemoryModal.tsx # Detailed memory view
│   └── EmptyState.tsx  # Empty state display
├── utils/              # Utility functions
│   ├── emotions.ts     # Emotion dictionary & gradients
│   ├── youtube.ts      # YouTube metadata extraction
│   └── storage.ts      # Local storage management
├── types/              # TypeScript definitions
├── App.tsx             # Main application
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

**Melodium** - Your emotional YouTube memory tracker ♪