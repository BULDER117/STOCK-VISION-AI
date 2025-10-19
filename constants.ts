// FIX: Populated constants.ts with mock data to resolve module not found errors.

import { Stock, PortfolioItem, LearningCourse, ChartDataPoint } from './types';

// Helper to generate chart data
const generateChartData = (days: number, initialValue: number): ChartDataPoint[] => {
    const data: ChartDataPoint[] = [];
    let value = initialValue;
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        value += Math.random() * (value * 0.02) - (value * 0.01); // small percentage fluctuation
        if (value < 10) value = 10;
        data.push({
            date: date.toISOString().split('T')[0],
            value: parseFloat(value.toFixed(2)),
        });
    }
    return data;
};

export const MOCK_STOCKS: Stock[] = [
    {
        ticker: 'NVDA',
        name: 'NVIDIA Corp',
        price: 120.81,
        change: 1.25,
        changePercent: 1.05,
        prediction: {
            probability: 78,
            direction: 'rise',
            reason: 'Strong demand for AI chips and data center growth.',
        },
        chartData: generateChartData(365, 100),
        marketCap: '3.1T',
        peRatio: 70.5,
        eps: 1.71,
        dividendYield: 0.03,
        week52High: 140.76,
        week52Low: 40.35,
        sentiment: 85,
        news: [
            { source: 'Reuters', title: 'NVIDIA Unveils Next-Gen AI Chips', published: '3 days ago', url: '#' },
            { source: 'Bloomberg', title: 'Data Center Sales Surge for NVIDIA', published: '1 week ago', url: '#' },
        ],
    },
    {
        ticker: 'AAPL',
        name: 'Apple Inc.',
        price: 214.29,
        change: -0.82,
        changePercent: -0.38,
        prediction: {
            probability: 65,
            direction: 'rise',
            reason: 'Anticipation of new AI features in upcoming iPhone models.',
        },
        chartData: generateChartData(365, 180),
        marketCap: '3.28T',
        peRatio: 33.1,
        eps: 6.47,
        dividendYield: 0.46,
        week52High: 220.20,
        week52Low: 164.08,
        sentiment: 72,
        news: [
            { source: 'WSJ', title: 'Apple Intelligence: A New Era of Personal AI', published: '1 day ago', url: '#' },
            { source: 'CNBC', title: 'iPhone 16 Production Ramps Up', published: '5 days ago', url: '#' },
        ],
    },
    {
        ticker: 'TSLA',
        name: 'Tesla, Inc.',
        price: 183.01,
        change: -1.44,
        changePercent: -0.78,
        prediction: {
            probability: 55,
            direction: 'drop',
            reason: 'Increased competition in the EV market and production challenges.',
        },
        chartData: generateChartData(365, 250),
        marketCap: '584B',
        peRatio: 46.5,
        eps: 3.93,
        dividendYield: null,
        week52High: 299.29,
        week52Low: 138.80,
        sentiment: 45,
        news: [
            { source: 'Electrek', title: 'Tesla Delays Cybertruck Deliveries Again', published: '2 days ago', url: '#' },
            { source: 'Reuters', title: 'EV Sales Slowdown Hits Major Automakers', published: '1 week ago', url: '#' },
        ],
    },
    {
        ticker: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 179.63,
        change: 0.40,
        changePercent: 0.22,
        prediction: {
            probability: 72,
            direction: 'rise',
            reason: 'Strong growth in cloud computing and AI research leadership.',
        },
        chartData: generateChartData(365, 150),
        marketCap: '2.2T',
        peRatio: 27.5,
        eps: 6.53,
        dividendYield: 0.45,
        week52High: 181.85,
        week52Low: 116.88,
        sentiment: 80,
        news: [
            { source: 'TechCrunch', title: 'Google Announces Gemini 2.5 Pro', published: '4 days ago', url: '#' },
            { source: 'The Verge', title: 'Google Cloud Posts Record Revenue', published: '2 weeks ago', url: '#' },
        ],
    },
     {
        ticker: 'AMZN',
        name: 'Amazon.com, Inc.',
        price: 185.57,
        change: -3.43,
        changePercent: -1.82,
        prediction: {
            probability: 68,
            direction: 'rise',
            reason: 'Continued dominance in e-commerce and rapid AWS expansion.',
        },
        chartData: generateChartData(365, 160),
        marketCap: '1.93T',
        peRatio: 51.7,
        eps: 3.59,
        dividendYield: null,
        week52High: 191.70,
        week52Low: 118.35,
        sentiment: 75,
        news: [
            { source: 'Forbes', title: 'Amazon Prime Day Dates Announced', published: '6 days ago', url: '#' },
            { source: 'MarketWatch', title: 'AWS Lands Major Government Contract', published: '3 weeks ago', url: '#' },
        ],
    }
];

export const MOCK_PORTFOLIO: PortfolioItem[] = [
    {
        stock: MOCK_STOCKS[0], // NVDA
        shares: 10,
        avgCost: 95.50,
    },
    {
        stock: MOCK_STOCKS[1], // AAPL
        shares: 20,
        avgCost: 170.25,
    },
    {
        stock: MOCK_STOCKS[3], // GOOGL
        shares: 15,
        avgCost: 140.00,
    },
];

export const MOCK_COURSES: LearningCourse[] = [
    {
        id: '1',
        title: 'Introduction to Stock Investing',
        description: 'Learn the fundamentals of the stock market, from basic terminology to opening a brokerage account.',
        level: 'Beginner',
    },
    {
        id: '2',
        title: 'Fundamental Analysis 101',
        description: 'Dive into financial statements and key metrics to evaluate a company\'s intrinsic value.',
        level: 'Intermediate',
    },
    {
        id: '3',
        title: 'Technical Analysis for Traders',
        description: 'Master chart patterns, indicators, and strategies to predict future price movements.',
        level: 'Advanced',
    },
    {
        id: '4',
        title: 'Options Trading Strategies',
        description: 'Explore the world of options, from simple calls and puts to complex multi-leg strategies.',
        level: 'Expert',
    },
    {
        id: '5',
        title: 'Portfolio Management',
        description: 'Understand asset allocation, diversification, and rebalancing to build a resilient portfolio.',
        level: 'Intermediate',
    },
    {
        id: '6',
        title: 'Understanding Market Cycles',
        description: 'Learn to identify and navigate bull and bear markets to your advantage.',
        level: 'Advanced',
    },
];
