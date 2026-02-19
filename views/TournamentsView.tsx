
import React from 'react';
import { Trophy, Globe, Flag, Star, ChevronRight } from 'lucide-react';
import { Tournament, TournamentType } from '../types';

const TournamentsView: React.FC = () => {
  const tournaments: Tournament[] = [
    { id: '1', name: 'Brasileirão Arena', type: TournamentType.BRASILEIRAO, image: 'https://picsum.photos/seed/br/400/250' },
    { id: '2', name: 'Elite Champions', type: TournamentType.CHAMPIONS, image: 'https://picsum.photos/seed/cl/400/250' },
    { id: '3', name: 'Libertadores Amadora', type: TournamentType.LIBERTADORES, image: 'https://picsum.photos/seed/lib/400/250' },
    { id: '4', name: 'Copa do Mundo Master', type: TournamentType.WORLD_CUP, image: 'https://picsum.photos/seed/wc/400/250' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Campeonatos</h1>
        <p className="text-slate-400 text-lg">Explore e participe das maiores ligas da Arena Master.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tournaments.map((tournament) => (
          <div 
            key={tournament.id}
            className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all hover:shadow-2xl hover:shadow-emerald-500/10"
          >
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>
              <img 
                src={tournament.image} 
                alt={tournament.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-emerald-500 text-slate-900 px-3 py-1 rounded-full text-xs font-black uppercase">
                  {tournament.type}
                </span>
              </div>
            </div>
            
            <div className="p-6 relative z-20">
              <h3 className="text-xl font-bold text-white mb-2">{tournament.name}</h3>
              <div className="flex items-center justify-between text-slate-400 text-sm mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Globe size={14} className="text-emerald-500" />
                    <span>8 Grupos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flag size={14} className="text-emerald-500" />
                    <span>32 Times</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={14} fill="currentColor" />
                  <span className="font-bold">Ranking A</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  Ver Tabela
                  <ChevronRight size={18} />
                </button>
                <button className="px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-white transition-all">
                  <Trophy size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentsView;
