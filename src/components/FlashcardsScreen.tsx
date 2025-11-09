import { useState } from 'react';
import { Plus, Clock, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CreateFlashcardDialog } from './CreateFlashcardDialog';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  nextReview: Date;
  category: string;
}

export function FlashcardsScreen() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    {
      id: '1',
      front: 'Bonjour',
      back: 'Hello in French',
      nextReview: new Date(Date.now() + 2 * 60 * 60 * 1000),
      category: 'French',
    },
    {
      id: '2',
      front: 'Gracias',
      back: 'Thank you in Spanish',
      nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000),
      category: 'Spanish',
    },
    {
      id: '3',
      front: 'Photosynthesis',
      back: 'Process by which plants convert light energy into chemical energy',
      nextReview: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      category: 'Biology',
    },
  ]);

  const addFlashcard = (card: Omit<Flashcard, 'id'>) => {
    setFlashcards([...flashcards, { ...card, id: Date.now().toString() }]);
  };

  const getDueCards = () => {
    return flashcards.filter(card => card.nextReview <= new Date()).length;
  };

  const formatTimeUntilReview = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (diff < 0) return 'Due now';
    if (days > 0) return `in ${days}d`;
    return `in ${hours}h`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">My Flashcards</h1>
        <p className="text-gray-500">Keep learning, one card at a time ✨</p>
      </div>

      {/* Due Cards Alert */}
      {getDueCards() > 0 && (
        <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-900">
                {getDueCards()} card{getDueCards() > 1 ? 's' : ''} ready to review
              </p>
              <p className="text-sm text-gray-600">Start studying to earn XP!</p>
            </div>
          </div>
        </Card>
      )}

      {/* Create Button */}
      <Button 
        onClick={() => setShowCreateDialog(true)}
        className="w-full bg-purple-600 hover:bg-purple-700 rounded-2xl h-14 gap-2"
      >
        <Plus className="w-5 h-5" />
        Create New Flashcard
      </Button>

      {/* Flashcards List */}
      <div className="space-y-3">
        <h2 className="text-gray-700">All Cards ({flashcards.length})</h2>
        
        {flashcards.map((card) => (
          <Card key={card.id} className="p-4 rounded-2xl shadow-sm border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="text-gray-900">{card.front}</p>
                <p className="text-sm text-gray-500 mt-1">{card.back}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 rounded-lg">
                {card.category}
              </Badge>
              
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{formatTimeUntilReview(card.nextReview)}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <CreateFlashcardDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
        onCreateCard={addFlashcard}
      />
    </div>
  );
}
