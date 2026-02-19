
import React from 'react';
import { Trophy, Medal, Crown } from 'lucide-react';
import { User } from '../types';

interface RankingProps {
  players: User[];
}

const Ranking: React.FC<RankingProps> = ({ players }) => {
  // Sort players by points
  const sortedPlayers = [...players].sort((a, b) => b.stats.points - a.stats.points);
  
  const topThree = sortedPlayers.slice(0, 3);
  const remaining = sortedPlayers.slice(3);

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Elite <span className="text-emerald-500">Ranking</span></h1>
          <p className="text-slate-400 font-medium">Tabela unificada com os melhores desempenhos individuais e por equipe.</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-2xl flex items-center gap-4 shadow-xl shadow-emerald-500/5">
          <div className="p-2 bg-emerald-500 rounded-lg">
            <Trophy className="text-slate-900" size={24} />
          </div>
          <div>
            <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.2em]">Premiação Acumulada</p>
            <p className="font-black text-2xl text-white">R$ 1.500,00</p>
          </div>
        </div>
      </div>

      {/* Podium Top 3 */}
      {sortedPlayers.length >= 3 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 items-end">
          {/* 2nd Place */}
          <div className="order-2 md:order-1 bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 text-center relative pt-16 hover:border-slate-700 transition-all group">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
               <div className="w-20 h-20 rounded-full bg-slate-400 flex items-center justify-center border-4 border-slate-900 shadow-2xl transition-transform group-hover:scale-110">
                 <span className="text-4xl font-black text-slate-950">2</span>
               </div>
               <Medal className="absolute -bottom-2 -right-2 text-slate-300 fill-slate-300 drop-shadow-lg" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-1 truncate text-white">{topThree[1].fullName}</h3>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">{topThree[1].teamName}</p>
            <div className="text-3xl font-black text-slate-200">{topThree[1].stats.points} <span className="text-sm font-normal text-slate-500">pts</span></div>
          </div>

          {/* 1st Place */}
          <div className="order-1 md:order-2 bg-gradient-to-b from-emerald-500/20 to-slate-900/80 border border-emerald-500/30 rounded-3xl p-10 text-center relative pt-20 transform scale-105 shadow-2xl shadow-emerald-500/10 group">
            <div className="absolute -top-14 left-1/2 -translate-x-1/2">
               <div className="w-28 h-28 rounded-full bg-emerald-500 flex items-center justify-center border-4 border-slate-900 shadow-2xl transition-transform group-hover:scale-110">
                 <span className="text-5xl font-black text-slate-900">1</span>
               </div>
               <Crown className="absolute -top-10 left-1/2 -translate-x-1/2 text-yellow-500 fill-yellow-500 drop-shadow-xl animate-bounce duration-[3000ms]" size={44} />
            </div>
            <h3 className="text-2xl font-black mb-1 truncate text-white">{topThree[0].fullName}</h3>
            <p className="text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-6">{topThree[0].teamName}</p>
            <div className="text-6xl font-black text-white">{topThree[0].stats.points} <span className="text-xl font-normal text-emerald-500/50">pts</span></div>
          </div>

          {/* 3rd Place */}
          <div className="order-3 bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 text-center relative pt-16 hover:border-slate-700 transition-all group">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
               <div className="w-20 h-20 rounded-full bg-amber-700 flex items-center justify-center border-4 border-slate-900 shadow-2xl transition-transform group-hover:scale-110">
                 <span className="text-4xl font-black text-slate-950">3</span>
               </div>
               <Medal className="absolute -bottom-2 -right-2 text-amber-600 fill-amber-600 drop-shadow-lg" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-1 truncate text-white">{topThree[2].fullName}</h3>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">{topThree[2].teamName}</p>
            <div className="text-3xl font-black text-slate-200">{topThree[2].stats.points} <span className="text-sm font-normal text-slate-500">pts</span></div>
          </div>
        </div>
      ) : null}

      {/* Full List */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden mt-8 shadow-inner">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-800/50 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              <th className="px-8 py-5">Pos</th>
              <th className="px-6 py-5">Atleta / Equipe</th>
              <th className="px-6 py-5 hidden md:table-cell">Jogos</th>
              <th className="px-6 py-5 hidden md:table-cell">Vitórias</th>
              <th className="px-6 py-5 text-center">Gols (S)</th>
              <th className="px-8 py-5 text-right">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {sortedPlayers.map((p, idx) => (
              <tr key={p.id} className={`hover:bg-slate-800/30 transition-colors ${idx < 3 ? 'bg-emerald-500/5' : ''}`}>
                <td className="px-8 py-5">
                  <span className={`font-black text-lg ${idx < 3 ? 'text-emerald-500' : 'text-slate-600'}`}>
                    {idx + 1}º
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="font-bold text-slate-100">{p.fullName}</div>
                  <div className="text-[10px] text-emerald-500/70 font-black uppercase tracking-widest">{p.teamName}</div>
                </td>
                <td className="px-6 py-5 hidden md:table-cell font-bold text-slate-400">{p.stats.games}</td>
                <td className="px-6 py-5 hidden md:table-cell font-bold text-emerald-500/80">{p.stats.wins}</td>
                <td className="px-6 py-5 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-lg border border-slate-700">
                    <span className="font-bold text-white">{p.stats.goalsScored}</span>
                    <span className="text-slate-600 font-bold">:</span>
                    <span className="font-medium text-slate-500">{p.stats.goalsConceded}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <span className="text-2xl font-black text-white">{p.stats.points}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranking;
