
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Trophy, 
  CreditCard, 
  LayoutDashboard, 
  LogOut, 
  Menu,
  X,
  User as UserIcon,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { User } from './types';
import Dashboard from './views/Dashboard';
import TournamentsView from './views/TournamentsView';
import AdminPanel from './views/AdminPanel';
import Profile from './views/Profile';
import Ranking from './views/Ranking';
import Login from './views/Login';
import Register from './views/Register';

const INITIAL_PLAYERS: User[] = [
  { id: '1', fullName: 'Carlos Eduardo', teamName: 'Real Matismo', email: 'carlos@example.com', role: 'player', paymentStatus: 'paid', stats: { points: 45, games: 15, wins: 14, draws: 1, losses: 0, goalsScored: 42, goalsConceded: 10 } },
  { id: '2', fullName: 'Bruno Silva', teamName: 'Inter de Meião', email: 'bruno@example.com', role: 'player', paymentStatus: 'pending', stats: { points: 38, games: 15, wins: 12, draws: 2, losses: 1, goalsScored: 35, goalsConceded: 12 } },
  { id: '3', fullName: 'Felipe Matos', teamName: 'Borussia Me Dá Outra', email: 'felipe@example.com', role: 'player', paymentStatus: 'paid', stats: { points: 36, games: 15, wins: 11, draws: 3, losses: 1, goalsScored: 30, goalsConceded: 15 } },
  { id: 'admin-1', fullName: 'Administrador Master', email: 'admin@arena.com', teamName: 'Arena Master FC', role: 'admin', paymentStatus: 'paid', stats: { points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsScored: 0, goalsConceded: 0 } }
];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [players, setPlayers] = useState<User[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Load players from localStorage or use initial
    const savedPlayers = localStorage.getItem('arena_players');
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    } else {
      setPlayers(INITIAL_PLAYERS);
      localStorage.setItem('arena_players', JSON.stringify(INITIAL_PLAYERS));
    }

    // Load current user
    const savedUser = localStorage.getItem('arena_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
    }
  }, []);

  const updatePlayers = (newPlayers: User[]) => {
    setPlayers(newPlayers);
    localStorage.setItem('arena_players', JSON.stringify(newPlayers));
    
    // If current user is in the list, update them too
    if (currentUser) {
      const updatedMe = newPlayers.find(p => p.id === currentUser.id);
      if (updatedMe) {
        setCurrentUser(updatedMe);
        localStorage.setItem('arena_user', JSON.stringify(updatedMe));
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('arena_user');
    setCurrentUser(null);
  };

  const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    const menuItems = [
      { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
      { path: '/tournaments', label: 'Campeonatos', icon: <Trophy size={20} /> },
      { path: '/ranking', label: 'Ranking Geral', icon: <Zap size={20} /> },
      { path: '/profile', label: 'Meu Perfil', icon: <UserIcon size={20} /> },
    ];

    if (currentUser?.role === 'admin') {
      menuItems.push({ path: '/admin', label: 'Painel Admin', icon: <ShieldCheck size={20} /> });
    }

    return (
      <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
        <header className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <Trophy className="text-emerald-500" />
            <span className="font-bold text-xl tracking-tight text-white">Arena<span className="text-emerald-500">Master</span></span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-400">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        <aside className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-full flex flex-col">
            <div className="p-6 hidden md:flex items-center gap-3">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <Trophy className="text-slate-900" size={24} />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">Arena<span className="text-emerald-500">Master</span></span>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${location.pathname === item.path 
                      ? 'bg-emerald-500/10 text-emerald-500' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}
                  `}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
              <div className="bg-slate-800/50 rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-emerald-500 border border-emerald-500/20">
                    {currentUser?.fullName.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold truncate text-white">{currentUser?.fullName}</p>
                    <p className="text-xs text-slate-500 truncate">{currentUser?.teamName}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Mensalidade</span>
                  <span className={`px-2 py-0.5 rounded-full font-bold ${currentUser?.paymentStatus === 'paid' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500 animate-pulse'}`}>
                    {currentUser?.paymentStatus === 'paid' ? 'PAGA' : 'PENDENTE'}
                  </span>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
              >
                <LogOut size={20} />
                <span className="font-medium">Sair</span>
              </button>
            </div>
          </div>
        </aside>

        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}

        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login onLogin={(u) => { setCurrentUser(u); updatePlayers([...players.filter(p => p.id !== u.id), u]); }} players={players} />} />
        <Route path="/register" element={currentUser ? <Navigate to="/" /> : <Register onRegister={(u) => { setCurrentUser(u); updatePlayers([...players, u]); }} />} />
        <Route 
          path="/*" 
          element={
            currentUser ? (
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard user={currentUser} />} />
                  <Route path="/tournaments" element={<TournamentsView />} />
                  <Route path="/ranking" element={<Ranking players={players} />} />
                  <Route path="/profile" element={<Profile user={currentUser} onUpdate={(u) => updatePlayers(players.map(p => p.id === u.id ? u : p))} />} />
                  {currentUser.role === 'admin' && <Route path="/admin" element={<AdminPanel players={players} setPlayers={updatePlayers} />} />}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
