import { Card } from './ui/card';
import { TrendingUp, Target, Award, Flame } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip } from 'recharts';

const weeklyData = [
  { day: 'Mon', cards: 12 },
  { day: 'Tue', cards: 8 },
  { day: 'Wed', cards: 15 },
  { day: 'Thu', cards: 10 },
  { day: 'Fri', cards: 18 },
  { day: 'Sat', cards: 14 },
  { day: 'Sun', cards: 16 },
];

const accuracyData = [
  { date: 'Week 1', accuracy: 65 },
  { date: 'Week 2', accuracy: 72 },
  { date: 'Week 3', accuracy: 78 },
  { date: 'Week 4', accuracy: 85 },
];

export function StatsScreen() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Your Statistics</h1>
        <p className="text-gray-500">Track your learning progress 📊</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 border-purple-200">
          <div className="flex items-start justify-between mb-2">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
          </div>
          <p className="text-gray-900 mb-1">7 days</p>
          <p className="text-sm text-gray-600">Current Streak</p>
        </Card>

        <Card className="p-4 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200">
          <div className="flex items-start justify-between mb-2">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-900 mb-1">85%</p>
          <p className="text-sm text-gray-600">Accuracy Rate</p>
        </Card>

        <Card className="p-4 rounded-2xl bg-gradient-to-br from-green-100 to-green-50 border-green-200">
          <div className="flex items-start justify-between mb-2">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-gray-900 mb-1">93</p>
          <p className="text-sm text-gray-600">Cards This Week</p>
        </Card>

        <Card className="p-4 rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-50 border-yellow-200">
          <div className="flex items-start justify-between mb-2">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-gray-900 mb-1">1,247</p>
          <p className="text-sm text-gray-600">Total XP</p>
        </Card>
      </div>

      {/* Weekly Activity */}
      <Card className="p-5 rounded-2xl shadow-sm border-gray-100">
        <h2 className="text-gray-900 mb-4">Weekly Activity</h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={weeklyData}>
            <XAxis 
              dataKey="day" 
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Bar 
              dataKey="cards" 
              fill="url(#colorGradient)" 
              radius={[8, 8, 0, 0]}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9333EA" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Accuracy Trend */}
      <Card className="p-5 rounded-2xl shadow-sm border-gray-100">
        <h2 className="text-gray-900 mb-4">Accuracy Trend</h2>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={accuracyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #E5E7EB', 
                borderRadius: '12px',
                fontSize: '14px'
              }}
              formatter={(value: number) => [`${value}%`, 'Accuracy']}
            />
            <Line 
              type="monotone" 
              dataKey="accuracy" 
              stroke="#9333EA" 
              strokeWidth={3}
              dot={{ fill: '#9333EA', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Study Summary */}
      <Card className="p-5 rounded-2xl shadow-sm border-gray-100">
        <h2 className="text-gray-900 mb-4">This Month</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Cards Reviewed</span>
            <span className="text-gray-900">342</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Study Sessions</span>
            <span className="text-gray-900">28</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Total Study Time</span>
            <span className="text-gray-900">4h 32m</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Average per Day</span>
            <span className="text-gray-900">11.4 cards</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
