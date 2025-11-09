import { useState } from 'react';
import { ArrowLeft, RotateCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { toast } from 'sonner@2.0.3';

interface FlipCardTestProps {
  onBack: () => void;
}

const sampleCards = [
  { front: 'Bonjour', back: 'Hello in French', category: 'French' },
  { front: 'Gracias', back: 'Thank you in Spanish', category: 'Spanish' },
  { front: 'Photosynthesis', back: 'Process by which plants convert light energy into chemical energy', category: 'Biology' },
];

export function FlipCardTest({ onBack }: FlipCardTestProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  const currentCard = sampleCards[currentIndex];

  const handleRating = (difficulty: 'easy' | 'medium' | 'hard') => {
    const xp = difficulty === 'easy' ? 15 : difficulty === 'medium' ? 10 : 5;
    setEarnedXP(prev => prev + xp);
    
    if (currentIndex < sampleCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      toast.success(`Session complete! You earned ${earnedXP + xp} XP 🎉`);
      setTimeout(() => onBack(), 2000);
    }
  };

  return (
    <div className="p-6 space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onBack}
          className="rounded-xl"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-gray-900">Flip Card Mode</h2>
          <p className="text-sm text-gray-500">
            Card {currentIndex + 1} of {sampleCards.length}
          </p>
        </div>
        <div className="text-purple-600">
          +{earnedXP} XP
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / sampleCards.length) * 100}%` }}
        />
      </div>

      {/* Flashcard */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <Card 
            className={`p-8 rounded-3xl shadow-lg border-2 min-h-[280px] flex items-center justify-center cursor-pointer transition-all duration-300 ${
              isFlipped ? 'bg-gradient-to-br from-purple-100 to-blue-100 border-purple-200' : 'bg-white border-gray-200'
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="text-center space-y-4">
              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {currentCard.category}
              </span>
              <p className={`text-gray-900 ${isFlipped ? 'text-base' : ''}`}>
                {isFlipped ? currentCard.back : currentCard.front}
              </p>
              {!isFlipped && (
                <div className="flex items-center justify-center gap-2 text-gray-400 mt-4">
                  <RotateCw className="w-4 h-4" />
                  <span className="text-sm">Tap to flip</span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Rating Buttons */}
      {isFlipped && (
        <div className="space-y-3">
          <p className="text-sm text-center text-gray-500">How well did you know this?</p>
          <div className="flex gap-3">
            <Button 
              onClick={() => handleRating('hard')}
              variant="outline"
              className="flex-1 rounded-xl border-red-200 text-red-600 hover:bg-red-50 h-12"
            >
              Hard
              <span className="text-xs ml-2">+5 XP</span>
            </Button>
            <Button 
              onClick={() => handleRating('medium')}
              variant="outline"
              className="flex-1 rounded-xl border-yellow-200 text-yellow-600 hover:bg-yellow-50 h-12"
            >
              Medium
              <span className="text-xs ml-2">+10 XP</span>
            </Button>
            <Button 
              onClick={() => handleRating('easy')}
              variant="outline"
              className="flex-1 rounded-xl border-green-200 text-green-600 hover:bg-green-50 h-12"
            >
              Easy
              <span className="text-xs ml-2">+15 XP</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
