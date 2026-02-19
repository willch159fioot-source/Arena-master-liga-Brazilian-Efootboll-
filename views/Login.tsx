
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  players: User[];
}

const Login: React.FC<LoginProps> = ({ onLogin, players }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo: match user from the players list
    const foundUser = players.find(p => p.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      localStorage.setItem('arena_user', JSON.stringify(foundUser));
      onLogin(foundUser);
      navigate('/');
    } else {
      setError('Usuário não encontrado. Use o e-mail de cadastro ou admin@arena.com.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-500 rounded-3xl mb-6 shadow-xl shadow-emerald-500/20">
            <Trophy className="text-slate-950" size={48} />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Arena<span className="text-emerald-500">Master</span></h1>
          <p className="text-slate-500 mt-2 font-medium">Faça login para gerenciar seus campeonatos.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-500 text-sm animate-in shake duration-300">
              <AlertCircle size={20} />
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="admin@arena.com"
                  className="w-full bg-slate-800 border-none rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Senha</label>
                <a href="#" className="text-xs text-emerald-500 font-bold hover:underline">Esqueceu?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border-none rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 rounded-2xl shadow-xl shadow-emerald-500/10 flex items-center justify-center gap-2 group transition-all"
            >
              ENTRAR NA ARENA
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 font-medium">
          Ainda não é inscrito? {' '}
          <Link to="/register" className="text-emerald-500 font-bold hover:underline">Criar conta</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
