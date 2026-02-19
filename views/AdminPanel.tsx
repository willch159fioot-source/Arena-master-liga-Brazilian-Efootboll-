
import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, MoreVertical, DollarSign, Filter } from 'lucide-react';
import { User } from '../types';

interface AdminPanelProps {
  players: User[];
  setPlayers: (players: User[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ players, setPlayers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid'>('all');

  const togglePayment = (id: string) => {
    const updated = players.map(p => {
      if (p.id === id) {
        return { ...p, paymentStatus: p.paymentStatus === 'paid' ? 'pending' : 'paid' } as User;
      }
      return p;
    });
    setPlayers(updated);
  };

  const filteredPlayers = players.filter(p => {
    const matchesSearch = p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.teamName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || p.paymentStatus === filter;
    return matchesSearch && matchesFilter;
  });

  const totalCollected = players.filter(p => p.paymentStatus === 'paid').length * 10;
  const pendingCount = players.filter(p => p.paymentStatus === 'pending').length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Painel de Controle</h1>
          <p className="text-slate-400">Gerencie pagamentos e jogadores da Arena Master.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 flex items-center gap-4">
             <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
               <DollarSign size={24} />
             </div>
             <div>
               <p className="text-xs text-slate-500 font-bold uppercase mb-0.5 tracking-wider">Total Arrecadado</p>
               <p className="text-2xl font-black text-white">R$ {totalCollected.toFixed(2)}</p>
             </div>
           </div>
           <div className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 flex items-center gap-4">
             <div className="p-3 bg-rose-500/10 rounded-xl text-rose-500">
               <XCircle size={24} />
             </div>
             <div>
               <p className="text-xs text-slate-500 font-bold uppercase mb-0.5 tracking-wider">Pendentes</p>
               <p className="text-2xl font-black text-white">{pendingCount}</p>
             </div>
           </div>
        </div>
      </header>

      <section className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nome ou time..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border-none rounded-xl pl-12 pr-4 py-3 text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 transition-all shadow-inner"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-500 mr-2" />
            <div className="flex bg-slate-800 rounded-xl p-1">
              {(['all', 'paid', 'pending'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                    filter === f ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f === 'all' ? 'Todos' : f === 'paid' ? 'Pagos' : 'Pendentes'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/30 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-6 py-4">Jogador / Equipe</th>
                <th className="px-6 py-4">Contato</th>
                <th className="px-6 py-4">Situação Financeira</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredPlayers.length > 0 ? filteredPlayers.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-emerald-500 border border-slate-700 shadow-sm transition-transform group-hover:scale-105">
                        {p.fullName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white text-base">{p.fullName}</div>
                        <div className="text-xs text-emerald-500/80 font-bold uppercase tracking-wider">{p.teamName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-400 text-sm font-medium">
                    {p.email}
                  </td>
                  <td className="px-6 py-5">
                    <button 
                      onClick={() => togglePayment(p.id)}
                      className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                        p.paymentStatus === 'paid' 
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20' 
                          : 'bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20 animate-pulse'
                      }`}
                    >
                      {p.paymentStatus === 'paid' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {p.paymentStatus === 'paid' ? 'PAGO (R$ 10)' : 'PENDENTE (R$ 10)'}
                    </button>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-slate-600 hover:text-white hover:bg-slate-800 rounded-xl transition-all">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="text-slate-600 font-medium">Nenhum jogador encontrado com esses critérios.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
