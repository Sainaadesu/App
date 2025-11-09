import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Trophy, Star, Zap, Award, Medal, Crown } from 'lucide-react';

const badges = [
  { id: 1, name: 'First Steps', icon: Star, earned: true, color: 'text-yellow-500 bg-yellow-100' },
  { id: 2, name: 'Week Warrior', icon: Zap, earned: true, color: 'text-orange-500 bg-orange-100' },
  { id: 3, name: 'Fast Learner', icon: Trophy, earned: true, color: 'text-blue-500 bg-blue-100' },
  { id: 4, name: 'Perfect Score', icon: Award, earned: false, color: 'text-gray-400 bg-gray-100' },
  { id: 5, name: 'Master', icon: Medal, earned: false, color: 'text-gray-400 bg-gray-100' },
  { id: 6, name: 'Champion', icon: Crown, earned: false, color: 'text-gray-400 bg-gray-100' },
];

export function ProfileScreen() {
  const currentLevel = 8;
  const currentXP = 1247;
  const xpForNextLevel = 1500;
  const xpProgress = ((currentXP % 500) / 500) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-500">Your learning journey 🌟</p>
      </div>

      {/* Profile Card */}
      <Card className="p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 border-none text-white">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <span className="text-3xl">👤</span>
          </div>
          <div className="flex-1">
            <h2 className="text-white mb-1">Learning Pro</h2>
            <p className="text-white/80 text-sm">Member since Nov 2024</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              <span>Level {currentLevel}</span>
            </div>
            <span>{currentXP} XP</span>
          </div>
          
          <div>
            <div className="flex justify-between text-sm text-white/80 mb-2">
              <span>Progress to Level {currentLevel + 1}</span>
              <span>{xpForNextLevel - currentXP} XP to go</span>
            </div>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Achievements */}
      <div className="space-y-4">
        <h2 className="text-gray-900">Achievements</h2>
        
        <Card className="p-5 rounded-2xl shadow-sm border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700">Earned Badges</span>
            <Badge className="bg-purple-100 text-purple-700 rounded-full">
              3 / 6
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div 
                  key={badge.id}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl ${
                    badge.earned ? badge.color : 'bg-gray-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    badge.earned ? 'bg-white' : 'bg-gray-200'
                  }`}>
                    <Icon className={`w-6 h-6 ${badge.earned ? badge.color.split(' ')[0] : 'text-gray-400'}`} />
                  </div>
                  <span className={`text-xs text-center ${
                    badge.earned ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {badge.name}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Milestones */}
      <Card className="p-5 rounded-2xl shadow-sm border-gray-100">
        <h2 className="text-gray-900 mb-4">Milestones</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 mb-1">7-Day Streak! 🔥</p>
              <p className="text-sm text-gray-500">Keep it up! Study for 23 more days to earn the "Month Master" badge</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 mb-1">100 Cards Mastered</p>
              <p className="text-sm text-gray-500">You've successfully learned 100 flashcards!</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 mb-1">Accuracy Expert</p>
              <p className="text-sm text-gray-500">Achieved 85% accuracy rate this month</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Study Stats Summary */}
      <Card className="p-5 rounded-2xl shadow-sm border-gray-100">
        <h2 className="text-gray-900 mb-4">Overall Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl text-purple-600 mb-1">342</p>
            <p className="text-sm text-gray-500">Total Cards</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-blue-600 mb-1">28</p>
            <p className="text-sm text-gray-500">Study Sessions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-green-600 mb-1">85%</p>
            <p className="text-sm text-gray-500">Accuracy</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-orange-600 mb-1">4.5h</p>
            <p className="text-sm text-gray-500">Study Time</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
