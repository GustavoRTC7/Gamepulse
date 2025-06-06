import React, { useState, useCallback, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Trophy, Notebook as Robot, Users, RotateCcw } from 'lucide-react';

const ChessPage: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [gameMode, setGameMode] = useState<'bot' | 'multiplayer' | null>(null);
  const [botDifficulty, setBotDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [moveHistory, setMoveHistory] = useState<string[]>([]);

  // Function to make a move
  const makeMove = useCallback((move: any) => {
    try {
      const result = game.move(move);
      if (result) {
        setGame(new Chess(game.fen()));
        setMoveHistory(prev => [...prev, game.history().slice(-1)[0]]);
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }, [game]);

  // Function to handle piece drop
  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const move = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to queen for simplicity
    });

    // If move is valid and we're playing against bot, make bot move
    if (move && gameMode === 'bot') {
      // Simple bot implementation - random legal moves
      setTimeout(() => {
        const moves = game.moves();
        if (moves.length > 0) {
          const randomMove = moves[Math.floor(Math.random() * moves.length)];
          makeMove(game.move(randomMove));
        }
      }, 300);
    }

    return move;
  };

  // Reset game
  const resetGame = () => {
    setGame(new Chess());
    setMoveHistory([]);
  };

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Chess</h1>
        <p className="text-gray-400">Play chess against a bot or other players</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {!gameMode ? (
                <div className="text-center space-y-4">
                  <h2 className="text-xl font-bold text-white mb-6">Select Game Mode</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      onClick={() => setGameMode('bot')}
                      className="flex items-center justify-center p-6"
                    >
                      <Robot size={24} className="mr-2" />
                      Play vs Bot
                    </Button>
                    <Button
                      onClick={() => setGameMode('multiplayer')}
                      className="flex items-center justify-center p-6"
                    >
                      <Users size={24} className="mr-2" />
                      Play Online
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      {gameMode === 'bot' && (
                        <select
                          value={botDifficulty}
                          onChange={(e) => setBotDifficulty(e.target.value as any)}
                          className="bg-gray-800 text-white rounded-lg px-3 py-2 mr-4"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      onClick={resetGame}
                      className="flex items-center"
                    >
                      <RotateCcw size={16} className="mr-2" />
                      New Game
                    </Button>
                  </div>
                  <Chessboard
                    position={game.fen()}
                    onPieceDrop={onDrop}
                    customBoardStyle={{
                      borderRadius: '4px',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-white flex items-center">
                <Trophy size={20} className="mr-2" />
                Move History
              </h2>
            </CardHeader>
            <CardContent>
              {moveHistory.length > 0 ? (
                <div className="space-y-2">
                  {moveHistory.map((move, index) => (
                    <div key={index} className="flex items-center text-gray-300">
                      <span className="w-8 text-gray-500">{index + 1}.</span>
                      <span>{move}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No moves yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChessPage;