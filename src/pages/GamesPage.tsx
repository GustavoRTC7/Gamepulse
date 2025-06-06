import React from 'react';
import { useApp } from '../context/AppContext';
import { Gamepad2 } from 'lucide-react';
import GameCard from '../components/GameCard';

const GamesPage: React.FC = () => {
  const { setActiveTab, games } = useApp();
  
  const handlePlayGame = (gameId: string, mode: 'multiplayer' | 'bot') => {
    // Here you would typically handle the game start logic
    // For now, we'll just navigate to the game page
    setActiveTab(gameId);
  };

  return (
    <div className="px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Available Games</h1>
        <p className="text-gray-400">Choose a game to start playing</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map(game => (
          <GameCard
            key={game.id}
            game={game}
            onPlay={(mode) => handlePlayGame(game.id, mode)}
          />
        ))}
      </div>
    </div>
  );
};

export default GamesPage;