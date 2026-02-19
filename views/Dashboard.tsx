
import React, { useEffect, useState } from 'react';
import { Trophy, TrendingUp, Users, Calendar, ArrowUpRight, Zap, CreditCard } from 'lucide-react';
import { User, Tournament, Match } from '../types';
import { getTournamentInsight } from '../services/geminiService';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [insight, setInsight] = useState<string>('Carregando análise do campeonato...');
  
  const mockMatches: Match[] = [
    { id: '1', homeTeam: 'Flamengo', awayTeam: 'Palmeiras', homeScore: 2, awayScore: 1, status: 'finished', tournamentId: 'br', date: '2024-05-20' },
    { id: '2', homeTeam: 'Real Madrid', awayTeam: 'Man City', homeScore: 0, awayScore: 0, status: 'scheduled', tournamentId: 'cl', date: '2024-05-22' },
    { id: '3', homeTeam: 'Brasil', awayTeam: 'Argentina', homeScore: 1, awayScore: 1, status: 'finished', tournamentId: 'wc', date: '2024-05-18' },
  ];

  useEffect(() => {
    const fetchInsight = async () => {
      const text = await getTournamentInsight("Brasileirão Arena Master", 24);
      setInsight(text || "");
    };
    fetchInsight();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Olá, {user.fullName.split(' ')[0]} 👋</h1>
          <p className="text-slate-400">Bem-vindo ao centro de comando do {user.teamName}.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-slate-800 rounded-xl px-4 py-2 border border-slate-700">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Pontos</p>
            <p className="text-xl font-bold text-emerald-500">{user.stats.points}</p>
          </div>
          <div className="bg-slate-800 rounded-xl px-4 py-2 border border-slate-700">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Vitórias</p>
            <p className="text-xl font-bold text-blue-500">{user.stats.wins}</p>
          </div>
        </div>
      </header>

      {/* AI Insight Card */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-emerald-900/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-emerald-400/20 group-hover:scale-110 transition-transform">
          <Trophy size={120} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4 bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
            <Zap size={16} className="text-yellow-300 fill-yellow-300" />
            <span className="text-xs font-bold text-white uppercase tracking-widest">Destaque Arena Master</span>
          </div>
          <p className="text-xl md:text-2xl font-medium leading-relaxed italic">
            "{insight}"
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Standings Preview */}
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="text-emerald-500" size={20} />
              Últimos Resultados
            </h2>
            <button className="text-sm text-emerald-500 font-medium hover:underline">Ver todos</button>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl divide-y divide-slate-800">
            {mockMatches.map((match) => (
              <div key={match.id} className="p-4 md:p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                   <div className="text-right flex-1 font-semibold">{match.homeTeam}</div>
                   <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-lg">
                      <span className={`text-xl font-bold ${match.status === 'scheduled' ? 'text-slate-500' : ''}`}>
                        {match.status === 'scheduled' ? '-' : match.homeScore}
                      </span>
                      <span className="text-slate-600 text-xs">VS</span>
                      <span className={`text-xl font-bold ${match.status === 'scheduled' ? 'text-slate-500' : ''}`}>
                        {match.status === 'scheduled' ? '-' : match.awayScore}
                      </span>
                   </div>
                   <div className="text-left flex-1 font-semibold">{match.awayTeam}</div>
                </div>
                <div className="ml-6 hidden md:block">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${match.status === 'finished' ? 'bg-slate-800 text-slate-400' : 'bg-emerald-500/10 text-emerald-500'}`}>
                    {match.status === 'finished' ? 'FINALIZADO' : 'AGENDADO'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right column */}
        <div className="space-y-8">
          {/* Payment Status Card */}
          <section className={`rounded-3xl p-6 border ${user.paymentStatus === 'paid' ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Situação Financeira</h3>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${user.paymentStatus === 'paid' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                  <CreditCard size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg">R$ 10,00</p>
                  <p className="text-sm text-slate-400">Mensalidade Ativa</p>
                </div>
              </div>
              <div className={`h-3 w-3 rounded-full animate-pulse ${user.paymentStatus === 'paid' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
            </div>
            <p className={`text-sm font-medium ${user.paymentStatus === 'paid' ? 'text-emerald-500' : 'text-rose-500'}`}>
              {user.paymentStatus === 'paid' ? 'Parabéns! Suas obrigações estão em dia.' : 'Atenção: Você possui uma mensalidade pendente.'}
            </p>
          </section>

          {/* Quick Actions / Stats */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Métricas da Equipe</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Aproveitamento</span>
                <span className="font-bold">78%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-800/50 p-3 rounded-2xl">
                  <p className="text-xs text-slate-500">Gols Pró</p>
                  <p className="text-lg font-bold">{user.stats.goalsScored}</p>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-2xl">
                  <p className="text-xs text-slate-500">Gols Contra</p>
                  <p className="text-lg font-bold">{user.stats.goalsConceded}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;