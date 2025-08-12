import { Music, Heart } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-xl">
              <Music className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Melodium</h1>
              <p className="text-sm text-neutral-600">Attach memories to music</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
