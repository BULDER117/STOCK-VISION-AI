
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import LearningHub from './components/LearningHub';
import ChatMentor from './components/ChatMentor';
import { BrainCircuit, BookOpen, MessageSquare, BarChart2 } from 'lucide-react';

type View = 'dashboard' | 'learn' | 'chat';
type Theme = 'light' | 'dark';

const IntroAnimation: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-dark-bg text-white">
        <div className="relative">
            <BrainCircuit className="w-24 h-24 text-neon-blue animate-pulse" />
            <div className="absolute inset-0 border-2 border-neon-blue rounded-full animate-ping"></div>
        </div>
        <h1 className="text-4xl font-bold mt-6 tracking-wider" style={{ textShadow: '0 0 10px #00BFFF' }}>Stock Vision AI</h1>
        <p className="text-lg mt-2 text-gray-300">See Beyond the Market.</p>
    </div>
);

const App: React.FC = () => {
    const [theme, setTheme] = useState<Theme>('dark');
    const [activeView, setActiveView] = useState<View>('dashboard');
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowIntro(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    if (showIntro) {
        return <IntroAnimation />;
    }

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
        { id: 'learn', label: 'Learn', icon: BookOpen },
        { id: 'chat', label: 'AI Mentor', icon: MessageSquare },
    ];

    return (
        <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200 bg-light-bg dark:bg-dark-bg transition-colors duration-500">
            <div className="flex flex-col md:flex-row h-screen">
                {/* Sidebar Navigation */}
                <nav className="bg-light-card dark:bg-dark-card border-r border-light-border dark:border-dark-border backdrop-blur-xl p-4 md:p-6 flex md:flex-col justify-around md:justify-start items-center md:items-start md:space-y-8">
                    <div className="flex md:flex-col items-center gap-2 mb-0 md:mb-12">
                         <BrainCircuit className="w-10 h-10 text-neon-blue"/>
                         <h1 className="text-xl font-bold hidden md:block">Stock Vision AI</h1>
                    </div>
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveView(item.id as View)}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 w-full ${activeView === item.id ? 'bg-neon-blue/20 text-neon-blue' : 'hover:bg-gray-500/10'}`}
                        >
                            <item.icon className="w-6 h-6" />
                            <span className="font-semibold hidden md:block">{item.label}</span>
                        </button>
                    ))}
                    <div className="flex-grow hidden md:block"></div>
                    <div className="hidden md:block">
                        <button onClick={toggleTheme} className="p-3 rounded-lg hover:bg-gray-500/10">
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {activeView === 'dashboard' && <Dashboard />}
                    {activeView === 'learn' && <LearningHub />}
                    {activeView === 'chat' && <ChatMentor />}
                </main>
            </div>
        </div>
    );
};

export default App;
