
import { GoogleGenAI } from "@google/genai";
import { Stock, ChatMessage } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getPredictionExplanation = async (stock: Stock): Promise<string> => {
    if (!API_KEY) return "AI is not configured. Please set the API_KEY environment variable.";
    try {
        const prompt = `Provide a short, one-sentence explanation for a stock prediction for ${stock.name} (${stock.ticker}). The prediction is an ${stock.prediction.direction} with ${stock.prediction.probability}% probability. Base the reason on this hint: "${stock.prediction.reason}".`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error fetching prediction explanation:", error);
        return "Could not get an explanation from AI at this time.";
    }
};

export const getFundamentalAnalysis = async (stock: Stock): Promise<string> => {
    if (!API_KEY) return "AI is not configured. Please set the API_KEY environment variable.";
    try {
        const prompt = `
            Generate a concise fundamental analysis report for ${stock.name} (${stock.ticker}).
            The company's current stock price is $${stock.price}.
            Key stats:
            - Market Cap: ${stock.marketCap}
            - P/E Ratio: ${stock.peRatio ?? 'N/A'}
            - EPS: ${stock.eps}
            - 52-Week Range: $${stock.week52Low} - $${stock.week52High}

            Based on this data and general knowledge, provide a brief overview covering:
            1.  **Company Health:** A summary of its financial stability and market position.
            2.  **Growth Prospects:** Potential for future growth, considering its industry and innovations.
            3.  **Potential Risks:** Key challenges or risks the company faces.

            The tone should be professional, analytical, and objective. Do not give direct investment advice. Structure the response with clear headings for each section.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error fetching fundamental analysis:", error);
        return "Could not generate an AI analysis at this time. Please check the company's investor relations page for official reports.";
    }
};


export const getChatResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
     if (!API_KEY) return "AI is not configured. Please set the API_KEY environment variable.";
    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "You are a personal financial guide and AI chat mentor for the 'Stock Vision AI' app. Your tone should be helpful, educational, and cautious. Never give direct financial advice like 'you should buy X'. Instead, provide data-backed explanations and educational content. For example, if asked 'Should I buy Tesla today?', respond with data like 'Tesla's recent performance has been driven by strong EV sales, but it faces competition. It's important to consider your own risk tolerance and research further.' Keep responses concise and easy to understand for a beginner.",
            }
        });
        
        // Note: Gemini chat history format is different from our app's format. We'll simplify and just send the new message for this implementation.
        // For a more robust solution, you would map the history to the Gemini format.
        
        const response = await chat.sendMessage({ message: newMessage });

        return response.text;
    } catch (error) {
        console.error("Error fetching chat response:", error);
        return "I am having trouble connecting to my knowledge base. Please try again later.";
    }
};
