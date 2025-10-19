
import React, { useState } from 'react';
import PortfolioWidget from './PortfolioWidget';
import PredictionWidget from './PredictionWidget';
import MarketTrackerWidget from './MarketTrackerWidget';
import StockDetailView from './StockDetailView';
import { Stock } from '../types';

const Dashboard: React.FC = () => {
    const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

    const handleSelectStock = (stock: Stock) => {
        setSelectedStock(stock);
    };

    const handleBackToDashboard = () => {
        setSelectedStock(null);
    };

    if (selectedStock) {
        return <StockDetailView stock={selectedStock} onBack={handleBackToDashboard} />;
    }

    return (
        <div className="space-y-8 h-full">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <PredictionWidget onSelectStock={handleSelectStock} />
                    <MarketTrackerWidget onSelectStock={handleSelectStock} />
                </div>
                <div className="lg:col-span-1">
                    <PortfolioWidget />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
