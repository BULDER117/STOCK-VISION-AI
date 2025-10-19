import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Brush } from 'recharts';
import { Stock } from '../../types';

type TimeRange = '1M' | '3M' | '6M' | '1Y' | 'ALL';

interface StockChartProps {
    stock: Stock;
    showControls?: boolean;
    height?: number;
}

const timeRangeToDays: Record<TimeRange, number> = {
    '1M': 30,
    '3M': 90,
    '6M': 182,
    '1Y': 365,
    'ALL': Infinity,
};

const StockChart: React.FC<StockChartProps> = ({ stock, showControls = true, height }) => {
    const [timeRange, setTimeRange] = useState<TimeRange>('3M');

    const filteredData = useMemo(() => {
        const days = timeRangeToDays[timeRange];
        if (days === Infinity) {
            return stock.chartData;
        }
        return stock.chartData.slice(-days);
    }, [stock.chartData, timeRange]);

    const isUp = stock.changePercent >= 0;
    const color = isUp ? '#39FF14' : '#FF3131';
    const gradientId = `color-${stock.ticker}`;

    const formatXAxis = (tickItem: string) => {
        const date = new Date(tickItem);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const TimeRangeSelector = () => (
        <div className="flex justify-center gap-2 mb-4">
            {(['1M', '3M', '6M', '1Y', 'ALL'] as TimeRange[]).map((range) => (
                <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                        timeRange === range
                            ? 'bg-neon-blue/20 text-neon-blue'
                            : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                >
                    {range}
                </button>
            ))}
        </div>
    );
    
    const chartHeight = height ?? (showControls ? 300 : 100);

    return (
        <div className="w-full h-full flex flex-col">
            {showControls && <TimeRangeSelector />}
            <div className="flex-grow">
                <ResponsiveContainer width="100%" height={chartHeight}>
                    <AreaChart
                        data={filteredData}
                        margin={{
                            top: 5,
                            right: showControls ? 20 : 0,
                            left: showControls ? -10 : 0,
                            bottom: 5,
                        }}
                    >
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.6} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(20, 20, 20, 0.8)',
                                borderColor: '#555',
                                color: '#fff',
                                borderRadius: '8px',
                            }}
                            itemStyle={{ color: color }}
                            labelFormatter={(label) => new Date(label).toLocaleDateString()}
                        />
                         {showControls && (
                            <>
                                <XAxis 
                                    dataKey="date" 
                                    tickFormatter={formatXAxis} 
                                    fontSize={12} 
                                    tickLine={false} 
                                    axisLine={false} 
                                    dy={10}
                                />
                                <YAxis 
                                    domain={['dataMin', 'dataMax']} 
                                    fontSize={12} 
                                    tickLine={false} 
                                    axisLine={false} 
                                    dx={-10}
                                />
                                <Brush 
                                    dataKey="date" 
                                    height={25} 
                                    stroke={color} 
                                    fill="rgba(128, 128, 128, 0.2)"
                                    tickFormatter={formatXAxis}
                                />
                            </>
                        )}
                        <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fillOpacity={1} fill={`url(#${gradientId})`} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StockChart;