import React from 'react';
import Card from './ui/Card';
import StockChart from './ui/StockChart';
import { MOCK_PORTFOLIO } from '../constants';

const PortfolioWidget: React.FC = () => {
    const totalValue = MOCK_PORTFOLIO.reduce((acc, item) => acc + item.shares * item.stock.price, 0);
    const totalCost = MOCK_PORTFOLIO.reduce((acc, item) => acc + item.shares * item.avgCost, 0);
    const totalGain = totalValue - totalCost;
    const totalGainPercent = (totalGain / totalCost) * 100;
    const isGain = totalGain >= 0;

    return (
        <Card className="h-full">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Portfolio</h2>
            <div className="my-4 text-center">
                <p className="text-4xl font-bold text-gray-900 dark:text-white">${totalValue.toFixed(2)}</p>
                <p className={`font-semibold ${isGain ? 'text-neon-green' : 'text-neon-red'}`}>
                    {isGain ? '+' : ''}${totalGain.toFixed(2)} ({isGain ? '+' : ''}{totalGainPercent.toFixed(2)}%)
                </p>
            </div>
            <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Your Holdings</h3>
                {MOCK_PORTFOLIO.map(item => {
                    const currentValue = item.shares * item.stock.price;
                    const gain = currentValue - (item.shares * item.avgCost);
                    return (
                        <div key={item.stock.ticker} className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white">{item.stock.ticker}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.shares} shares</p>
                            </div>
                            <div className="w-24 h-[40px]">
                                <StockChart stock={item.stock} showControls={false} height={40}/>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900 dark:text-white">${currentValue.toFixed(2)}</p>
                                <p className={`text-sm ${gain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {gain >= 0 ? '+' : ''}{gain.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    );
};

export default PortfolioWidget;