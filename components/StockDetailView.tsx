import React, { useState, useEffect } from 'react';
import { Stock } from '../types';
import { getFundamentalAnalysis } from '../services/geminiService';
import Card from './ui/Card';
import StockChart from './ui/StockChart';
import Gauge from './ui/Gauge';
import { ArrowLeft, Loader, Newspaper, BarChart, FileText } from 'lucide-react';

interface StockDetailViewProps {
    stock: Stock;
    onBack: () => void;
}

const StockDetailView: React.FC<StockDetailViewProps> = ({ stock, onBack }) => {
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnalysis = async () => {
            setIsLoading(true);
            const result = await getFundamentalAnalysis(stock);
            setAnalysis(result);
            setIsLoading(false);
        };
        fetchAnalysis();
    }, [stock]);

    const isUp = stock.changePercent >= 0;

    return (
        <div className="space-y-6 h-full animate-fade-in-fast">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-500/10 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{stock.name} ({stock.ticker})</h1>
                    <div className="flex items-center gap-4">
                        <p className="text-2xl font-mono">${stock.price.toFixed(2)}</p>
                        <p className={`font-semibold ${isUp ? 'text-green-500' : 'text-red-500'}`}>
                            {isUp ? '+' : ''}{stock.change.toFixed(2)} ({isUp ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="h-96">
                       <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><BarChart size={20}/> Chart</h2>
                       <StockChart stock={stock} />
                    </Card>
                    <Card>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><FileText size={20}/> AI Fundamental Analysis</h2>
                        {isLoading ? (
                            <div className="flex items-center justify-center h-40">
                                <Loader className="animate-spin text-neon-blue" size={32} />
                                <p className="ml-4">Generating AI Report...</p>
                            </div>
                        ) : (
                            <div className="text-sm leading-relaxed whitespace-pre-wrap font-mono bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">{analysis}</div>
                        )}
                    </Card>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <h2 className="text-xl font-bold mb-4">Key Statistics</h2>
                        <ul className="space-y-2 text-sm">
                            <li className="flex justify-between"><span>Market Cap</span> <span className="font-semibold">{stock.marketCap}</span></li>
                            <li className="flex justify-between"><span>P/E Ratio</span> <span className="font-semibold">{stock.peRatio ?? 'N/A'}</span></li>
                            <li className="flex justify-between"><span>EPS</span> <span className="font-semibold">{stock.eps}</span></li>
                            <li className="flex justify-between"><span>Div. Yield</span> <span className="font-semibold">{stock.dividendYield ? `${stock.dividendYield}%` : 'N/A'}</span></li>
                            <li className="flex justify-between"><span>52-Wk High</span> <span className="font-semibold">${stock.week52High.toFixed(2)}</span></li>
                            <li className="flex justify-between"><span>52-Wk Low</span> <span className="font-semibold">${stock.week52Low.toFixed(2)}</span></li>
                        </ul>
                    </Card>
                    <Card>
                       <h2 className="text-xl font-bold mb-4">Sentiment Index</h2>
                        <Gauge value={stock.sentiment} label="Market Sentiment" />
                    </Card>
                    <Card>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Newspaper size={20}/> Recent News</h2>
                        <ul className="space-y-3">
                            {stock.news.map((item, index) => (
                                <li key={index} className="text-sm border-b border-light-border dark:border-dark-border last:border-0 pb-2 last:pb-0">
                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-neon-blue transition-colors">{item.title}</a>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.source} - {item.published}</p>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
             <style>{`
                @keyframes fade-in-fast {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in-fast {
                    animation: fade-in-fast 0.3s forwards;
                }
            `}</style>
        </div>
    );
};

export default StockDetailView;