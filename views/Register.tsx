
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, Mail, Lock, User as UserIcon, Shield, ArrowRight, Flag } from 'lucide-react';
import { User } from '../types';

interface RegisterProps {
  onRegister: (user: User) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [fullName, setFullName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      fullName,
      teamName,
      email,
      role: 'player',
      paymentStatus: 'pending',
      stats: { points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsScored: 0, goalsConceded: 0 }
    };
    localStorage.setItem('arena_user', JSON.stringify(newUser));
    onRegister(newUser);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 py-12">
      <div className="w-full max-w-lg space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-500 rounded-3xl mb-6 shadow-xl shadow-emerald-500/20">
            <Trophy className="text-slate-950" size={48} />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Criar <span className="text-emerald-500">Perfil</span></h1>
          <p className="text-slate-500 mt-2 font-medium">Junte-se à maior comunidade de futebol amador.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-slate-800/20">
            <Shield size={100} />
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Nome Completo</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input 
                    type="text" 
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nome completo..."
                    className="w-full bg-slate-800 border-none rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Time no Campeonato</label>
                <div className="relative">
                  <Flag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input 
                    type="text" 
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Nome do seu time..."
                    className="w-full bg-slate-800 border-none rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-slate-800 border-none rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Crie uma senha forte"
                  className="w-full bg-slate-800 border-none rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-2xl flex items-start gap-3 border border-slate-700">
              <Shield className="text-emerald-500 shrink-0" size={24} />
              <div className="text-xs text-slate-400 leading-relaxed">
                Ao se cadastrar, você declara estar ciente da taxa de manutenção de <span className="text-white font-bold">R$ 10,00</span> para o controle de pagamentos e premiações mensais.
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 rounded-2xl shadow-xl shadow-emerald-500/10 flex items-center justify-center gap-2 group transition-all"
            >
              FINALIZAR INSCRIÇÃO
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 font-medium">
          Já tem cadastro? {' '}
          <Link to="/login" className="text-emerald-500 font-bold hover:underline">Faça login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
