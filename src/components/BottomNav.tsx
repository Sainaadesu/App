import { BookOpen, Brain, BarChart3, User } from 'lucide-react';

type Tab = 'flashcards' | 'test' | 'stats' | 'profile';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'flashcards' as Tab, icon: BookOpen, label: 'Flashcards' },
    { id: 'test' as Tab, icon: Brain, label: 'Test' },
    { id: 'stats' as Tab, icon: BarChart3, label: 'Stats' },
    { id: 'profile' as Tab, icon: User, label: 'Profile' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 rounded-b-[2.5rem]">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all ${
                isActive ? 'bg-purple-100' : ''
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
