import React from 'react';
import { Trophy, Medal, Award, Clock } from 'lucide-react';
import QuestHeader from './QuestHeader';

interface LeaderboardScreenProps {
  onRestart: () => void;
}

const leaderboardData = [
  { rank: 1, name: 'Ian Rossen Birthday', player: 'Tyler Singer', location: 'Global', points: 0, avatar: 'T' },
  { rank: 2, name: 'Ian Rossen Birthday', player: 'Maelynn Tjongayong', location: 'Global', points: 0, avatar: 'M' },
  { rank: 3, name: 'Ian Rossen Birthday', player: 'Gior Bonela', location: 'Global', points: 0, avatar: 'G' },
  { rank: 4, name: 'Ian Rossen Birthday', player: 'Jada Pieternelle', location: 'Global', points: 0, avatar: 'J' },
  { rank: 5, name: 'Ian Rossen Birthday', player: 'Kaysan Garmers', location: 'Global', points: 0, avatar: 'K' },
  { rank: 6, name: 'Ian Rossen Birthday', player: 't e', location: 'Global', points: 0, avatar: 'T' },
];

export default function LeaderboardScreen({ onRestart }: LeaderboardScreenProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="text-gray-600 font-bold">{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <QuestHeader />
      </div>

      {/* Live Scoreboard Card */}
      <div className="bg-gradient-to-r from-red-400 via-red-500 to-orange-400 rounded-2xl p-6 mb-8 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Live Scoreboard</h1>
          <p className="text-white/90 text-lg">Ian Rossen Birthday</p>
        </div>
      </div>

      {/* Top Teams Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="bg-red-500 text-white p-4">
          <h2 className="text-xl font-bold">Top Teams</h2>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b font-semibold text-gray-700">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">Team</div>
          <div className="col-span-3">Points</div>
          <div className="col-span-3">Progress</div>
        </div>

        {/* Leaderboard Entries */}
        <div className="divide-y divide-gray-100">
          {leaderboardData.map((entry, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors">
              {/* Rank */}
              <div className="col-span-1 flex items-center">
                {getRankIcon(entry.rank)}
              </div>

              {/* Team Info */}
              <div className="col-span-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                  {entry.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{entry.name}</div>
                  <div className="text-sm text-gray-500">{entry.player} • {entry.location}</div>
                </div>
              </div>

              {/* Points */}
              <div className="col-span-3 flex items-center">
                <span className="text-2xl font-bold text-red-500">{entry.points}</span>
              </div>

              {/* Progress */}
              <div className="col-span-3 flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Last Updated */}
        <div className="p-4 bg-gray-50 text-right">
          <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Last updated: 19:50:44</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onRestart}
          className="flex-1 py-4 rounded-xl font-bold text-xl bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Play Again
        </button>
        <button
          onClick={() => window.location.href = '/admin'}
          className="px-8 py-4 rounded-xl font-bold text-xl bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Admin
        </button>
      </div>
    </div>
  );
}