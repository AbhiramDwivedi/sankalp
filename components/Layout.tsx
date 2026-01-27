
import React from 'react';
import { BookOpen, BarChart3, Settings, Home, Users } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  brandingName?: string;
  onSwitch?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, brandingName = "Sankalpa", onSwitch }) => {
  const navItems = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Overview' },
    { id: 'curriculum', icon: <BookOpen size={20} />, label: 'Learning Path' },
    { id: 'progress', icon: <BarChart3 size={20} />, label: 'Analytics' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-sans text-slate-900">
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-100 shadow-2xl z-20">
        <div className="p-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-600 rounded-[1.2rem] flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-orange-100">स</div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">{brandingName}</h1>
        </div>
        
        <nav className="flex-1 px-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-5 rounded-[1.5rem] transition-all ${
                activeTab === item.id 
                ? 'bg-orange-600 text-white font-black shadow-xl shadow-orange-100' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-800 font-bold'
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
            className="w-full flex items-center justify-center gap-3 py-5 bg-slate-900 text-white font-black rounded-[1.5rem] shadow-xl hover:bg-black transition-all"
          >
            <Users size={20} /> Switch Student
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto pb-32 md:pb-0">
        <div className="max-w-6xl mx-auto p-6 md:p-12">
          {children}
        </div>
      </main>

      {/* MOBILE NAV */}
      <nav className="fixed bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-xl rounded-[2.5rem] flex justify-around p-4 md:hidden z-50 shadow-2xl border border-white/10">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 p-3 transition-all ${
              activeTab === item.id ? 'text-orange-500 scale-125' : 'text-slate-400'
            }`}
          >
            {item.icon}
          </button>
        ))}
        <button onClick={onSwitch} className="flex flex-col items-center gap-1 p-3 text-white">
          <Users size={20} />
        </button>
      </nav>
    </div>
  );
};
