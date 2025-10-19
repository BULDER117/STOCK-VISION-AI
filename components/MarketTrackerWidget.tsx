
import React from 'react';
import Card from './ui/Card';
import { MOCK_STOCKS } from '../constants';
import { Stock } from '../types';

interface MarketTrackerWidgetProps {
    onSelectStock: (stock: Stock) => void;
}


const MarketTrackerWidget: React.FC<MarketTrackerWidgetProps> = ({ onSelectStock }) => {
    return (
        <Card>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Market Watch</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-light-border dark:border-dark-border text-sm text-gray-500 dark:text-gray-400">
                            <th className="py-2 px-4">Symbol</th>
                            <th className="py-2 px-4">Price</th>
                            <th className="py-2 px-4">Change</th>
                            <th className="py-2 px-4 hidden sm:table-cell">% Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_STOCKS.map(stock => {
                            const isUp = stock.changePercent >= 0;
                            return (
                                <tr 
                                    key={stock.ticker} 
                                    className="border-b border-light-border dark:border-dark-border last:border-b-0 hover:bg-gray-500/10 cursor-pointer transition-colors"
                                    onClick={() => onSelectStock(stock)}
                                >
                                    <td className="py-3 px-4">
                                        <p className="font-bold text-gray-900 dark:text-white">{stock.ticker}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 hidden md:block">{stock.name}</p>
                                    </td>
                                    <td className="py-3 px-4 font-mono text-gray-900 dark:text-white">${stock.price.toFixed(2)}</td>
                                    <td className={`py-3 px-4 font-mono ${isUp ? 'text-green-500' : 'text-red-500'}`}>
                                        {isUp ? '+' : ''}{stock.change.toFixed(2)}
                                    </td>
                                    <td className={`py-3 px-4 hidden sm:table-cell`}>
                                        <span className={`px-2 py-1 rounded-md text-sm font-semibold ${isUp ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {isUp ? '+' : ''}{stock.changePercent.toFixed(2)}%
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default MarketTrackerWidget;
