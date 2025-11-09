import { useState } from 'react';
import { FlashcardsScreen } from './components/FlashcardsScreen';
import { TestScreen } from './components/TestScreen';
import { StatsScreen } from './components/StatsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomNav } from './components/BottomNav';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'test' | 'stats' | 'profile'>('flashcards');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[800px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative">
        {/* Status Bar */}
        <div className="h-8 bg-white flex items-center justify-between px-6 pt-2">
          <span className="text-xs">9:41</span>
          <div className="flex gap-1 items-center text-xs">
            <span>5G</span>
            <span>📶</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto pb-20">
          {activeTab === 'flashcards' && <FlashcardsScreen />}
          {activeTab === 'test' && <TestScreen />}
          {activeTab === 'stats' && <StatsScreen />}
          {activeTab === 'profile' && <ProfileScreen />}
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <Toaster />
    </div>
  );
}
