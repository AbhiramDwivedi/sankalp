
import React from 'react';
import { BookOpen, Settings, Home, Users, ClipboardList, Flag, Calendar, Layers } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  brandingName?: string;
  onSwitch?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  brandingName = 'Sankalp',
  onSwitch,
}) => {
  const navItems = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { id: 'library', icon: <BookOpen size={20} />, label: 'Library' },
    { id: 'capstones', icon: <Flag size={20} />, label: 'Capstones' },
    { id: 'flashcards', icon: <Layers size={20} />, label: 'Flashcards' },
    { id: 'plan', icon: <Calendar size={20} />, label: 'Plan' },
    { id: 'rubric', icon: <ClipboardList size={20} />, label: 'Rubric' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-sans text-slate-900">
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-100 shadow-2xl z-20 no-print">
        <div className="p-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-600 rounded-[1.2rem] flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-orange-200">
            स
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{brandingName}</h1>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
              FCPS Hindi · 3-credit prep
            </p>
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.25rem] transition-all ${
                activeTab === item.id
                  ? 'bg-orange-600 text-white font-black shadow-xl shadow-orange-100'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-bold'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-8">
          <button
            onClick={onSwitch}
            className="w-full flex items-center justify-center gap-3 py-4 bg-slate-900 text-white font-black rounded-[1.25rem] shadow-xl hover:bg-black transition-all"
          >
            <Users size={18} /> Switch Student
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto pb-32 md:pb-0">
        <div className="max-w-6xl mx-auto p-6 md:p-12">{children}</div>
      </main>

      <nav className="fixed bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-xl rounded-[2rem] flex justify-around p-3 md:hidden z-50 shadow-2xl border border-white/10 no-print">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 p-3 transition-all ${
              activeTab === item.id ? 'text-orange-400 scale-125' : 'text-slate-400'
            }`}
            aria-label={item.label}
          >
            {item.icon}
          </button>
        ))}
        <button onClick={onSwitch} className="flex flex-col items-center gap-1 p-3 text-white">
          <Users size={18} />
        </button>
      </nav>
    </div>
  );
};
