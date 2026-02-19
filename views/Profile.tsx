
import React, { useState } from 'react';
import { User as UserIcon, Shield, Mail, Calendar, Edit3, Camera, CheckCircle, AlertCircle, Loader2, Trophy, CreditCard } from 'lucide-react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [isPaying, setIsPaying] = useState(false);

  const handleSimulatePayment = () => {
    setIsPaying(true);
    // Simulating a payment processing delay
    setTimeout(() => {
      const updatedUser: User = { ...user, paymentStatus: 'paid' };
      onUpdate(updatedUser);
      setIsPaying(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-top-4 duration-700">
      <header className="relative h-48 md:h-64 rounded-3xl overflow-hidden mb-12 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-700 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 translate-y-1/2 flex flex-col md:flex-row items-center gap-6">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-slate-900 border-8 border-slate-950 flex items-center justify-center text-5xl font-black text-emerald-500 shadow-2xl overflow-hidden">
               {user.fullName.charAt(0)}
            </div>
            <button className="absolute bottom-2 right-2 p-2.5 bg-emerald-500 rounded-full text-slate-950 border-4 border-slate-950 hover:bg-emerald-400 transition-all shadow-lg">
              <Camera size={20} />
            </button>
          </div>
          <div className="pt-8 md:pt-0 text-center md:text-left flex-1">
            <h1 className="text-3xl font-black text-white mb-1 drop-shadow-md">{user.fullName}</h1>
            <p className="text-emerald-400 font-black uppercase tracking-[0.2em] drop-shadow-sm">{user.teamName}</p>
          </div>
          <div className="pt-4 md:pt-0 md:self-end">
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900/80 backdrop-blur-md hover:bg-slate-800 text-white rounded-2xl font-bold transition-all border border-slate-700 shadow-xl">
              <Edit3 size={18} />
              Editar Dados
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
        <section className="md:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8 shadow-xl">
            <h2 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-tighter">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                <UserIcon size={20} />
              </div>
              Dados da Conta
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-1.5">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Mail size={12} className="text-emerald-500" /> E-mail de Acesso
                </p>
                <p className="text-lg font-bold text-slate-200">{user.email}</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Shield size={12} className="text-emerald-500" /> Nível de Acesso
                </p>
                <p className="text-lg font-bold text-slate-200 uppercase tracking-widest">
                  {user.role === 'admin' ? '👑 Administrador' : '⚽ Jogador'}
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Calendar size={12} className="text-emerald-500" /> Data de Cadastro
                </p>
                <p className="text-lg font-bold text-slate-200">22 de Mai, 2024</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Trophy size={12} className="text-emerald-500" /> Campeonato Atual
                </p>
                <p className="text-lg font-bold text-slate-200">Brasileirão Arena</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-xl relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-2 h-full ${user.paymentStatus === 'paid' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
            
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status Financeiro</h2>
            
            <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center border-4 ${user.paymentStatus === 'paid' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500' : 'border-rose-500/30 bg-rose-500/10 text-rose-500 animate-pulse'}`}>
              {user.paymentStatus === 'paid' ? <CheckCircle size={48} /> : <AlertCircle size={48} />}
            </div>

            <div>
              <p className={`text-2xl font-black uppercase tracking-tighter ${user.paymentStatus === 'paid' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {user.paymentStatus === 'paid' ? 'Mensalidade Paga' : 'Pagamento Pendente'}
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-slate-500 font-bold">Valor:</span>
                <span className="text-white font-black">R$ 10,00</span>
              </div>
            </div>

            {user.paymentStatus === 'pending' && (
              <button 
                onClick={handleSimulatePayment}
                disabled={isPaying}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3"
              >
                {isPaying ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    PROCESSANDO...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />
                    PAGAR MENSALIDADE
                  </>
                )}
              </button>
            )}

            {user.paymentStatus === 'paid' && (
              <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-2xl">
                <p className="text-xs text-emerald-500 font-bold leading-relaxed">
                  Sua conta está em dia. Você tem acesso total ao ranking e premiações!
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;