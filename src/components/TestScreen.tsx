import { useState } from 'react';
import { Timer, RotateCw, CheckCircle2, XCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { FlipCardTest } from './FlipCardTest';
import { QuizModeTest } from './QuizModeTest';

export function TestScreen() {
  const [selectedMode, setSelectedMode] = useState<'flip' | 'quiz' | null>(null);

  if (selectedMode === 'flip') {
    return <FlipCardTest onBack={() => setSelectedMode(null)} />;
  }

  if (selectedMode === 'quiz') {
    return <QuizModeTest onBack={() => setSelectedMode(null)} />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Test Yourself</h1>
        <p className="text-gray-500">Choose your learning mode 🧠</p>
      </div>

      {/* Study Stats */}
      <Card className="bg-gradient-to-br from-blue-100 to-purple-100 border-none p-5 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700">Today's Progress</span>
          <span className="text-purple-600">3/8 cards</span>
        </div>
        
        <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all"
            style={{ width: '37.5%' }}
          />
        </div>
      </Card>

      {/* Test Modes */}
      <div className="space-y-4">
        <h2 className="text-gray-700">Select Test Mode</h2>

        {/* Flip Card Mode */}
        <Card 
          className="p-5 rounded-2xl shadow-sm border-gray-100 hover:shadow-md transition-all cursor-pointer"
          onClick={() => setSelectedMode('flip')}
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <RotateCw className="w-7 h-7 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">Flashcard Flip Mode</h3>
              <p className="text-sm text-gray-500 mb-3">
                Classic mode - flip cards to reveal answers and rate your recall
              </p>
              <div className="flex gap-2">
                <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  Self-paced
                </span>
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  8 cards ready
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Quiz Mode */}
        <Card 
          className="p-5 rounded-2xl shadow-sm border-gray-100 hover:shadow-md transition-all cursor-pointer"
          onClick={() => setSelectedMode('quiz')}
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Timer className="w-7 h-7 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">Timed Quiz Mode</h3>
              <p className="text-sm text-gray-500 mb-3">
                Challenge yourself - answer questions before time runs out
              </p>
              <div className="flex gap-2">
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  30 sec per card
                </span>
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  +10 XP bonus
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Results */}
      <div className="space-y-3">
        <h2 className="text-gray-700">Recent Sessions</h2>
        
        <Card className="p-4 rounded-2xl shadow-sm border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-900">French Vocabulary</span>
            <span className="text-sm text-gray-500">2h ago</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm text-green-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>12 correct</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-red-500">
              <XCircle className="w-4 h-4" />
              <span>3 wrong</span>
            </div>
            <div className="ml-auto text-sm text-purple-600">+45 XP</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
