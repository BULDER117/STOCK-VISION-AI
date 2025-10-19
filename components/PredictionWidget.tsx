
import React, { useState } from 'react';
import Card from './ui/Card';
import { MOCK_STOCKS } from '../constants';
import { Stock } from '../types';
import { getPredictionExplanation } from '../services/geminiService';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

interface PredictionWidgetProps {
    onSelectStock: (stock: Stock) => void;
}

const PredictionWidget: React.FC<PredictionWidgetProps> = ({ onSelectStock }) => {
    const [explanation, setExplanation] = useState<{ [key: string]: string | null }>({});
    const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

    const handleExplain = async (e: React.MouseEvent, stock: Stock) => {
        e.stopPropagation(); // Prevent navigation to detail view
        setIsLoading(prev => ({ ...prev, [stock.ticker]: true }));
        setExplanation(prev => ({ ...prev, [stock.ticker]: null }));
        
        const generatedExplanation = await getPredictionExplanation(stock);
        
        setExplanation(prev => ({ ...prev, [stock.ticker]: generatedExplanation }));
        setIsLoading(prev => ({ ...prev, [stock.ticker]: false }));
    };

    return (
        <Card>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">AI Predicted Movers</h2>
            <div className="space-y-4">
                {MOCK_STOCKS.slice(0, 3).map(stock => {
                    const isUp = stock.prediction.direction === 'rise';
                    const color = isUp ? 'text-neon-green' : 'text-neon-red';

                    return (
                        <div 
                            key={stock.ticker} 
                            className="bg-white/5 p-4 rounded-lg cursor-pointer hover:bg-gray-500/10 transition-colors"
                            onClick={() => onSelectStock(stock)}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-lg text-gray-900 dark:text-white">{stock.ticker}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</p>
                                </div>
                                <div className="text-right">
                                    <div className={`flex items-center justify-end gap-2 font-bold text-lg ${color}`}>
                                        {isUp ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                                        <span>{stock.prediction.probability}%</span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{isUp ? 'Chance of Rise' : 'Chance of Drop'}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={(e) => handleExplain(e, stock)}
                                    disabled={isLoading[stock.ticker]}
                                    className="flex items-center gap-2 text-sm text-neon-blue hover:text-white transition-colors disabled:opacity-50 disabled:cursor-wait"
                                >
                                    <Sparkles size={16} />
                                    <span>{isLoading[stock.ticker] ? 'Thinking...' : (explanation[stock.ticker] ? 'Explanation' : 'Explain with AI')}</span>
                                </button>
                                {explanation[stock.ticker] && (
                                    <p className="text-sm mt-2 p-2 bg-blue-500/10 rounded-md border border-blue-500/20 text-gray-700 dark:text-gray-300">
                                        {explanation[stock.ticker]}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default PredictionWidget;
