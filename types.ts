// FIX: Replaced file content with only type definitions to fix circular dependency and export required types.

export interface NewsItem {
    source: string;
    title: string;
    published: string;
    url: string;
}

export interface ChartDataPoint {
    date: string;
    value: number;
}

export interface Stock {
    ticker: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    prediction: {
        probability: number;
        direction: 'rise' | 'drop';
        reason: string;
    };
    chartData: ChartDataPoint[];
    marketCap: string;
    peRatio: number | null;
    eps: number;
    dividendYield: number | null;
    week52High: number;
    week52Low: number;
    sentiment: number;
    news: NewsItem[];
}

export interface PortfolioItem {
    stock: Stock;
    shares: number;
    avgCost: number;
}

export interface LearningCourse {
    id: string;
    title: string;
    description: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface ChatMessage {
    id: number;
    text: string;
    sender: 'user' | 'ai' | 'loading';
}
