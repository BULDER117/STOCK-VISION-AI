
import React, { useState, useRef, useEffect } from 'react';
import Card from './ui/Card';
import { ChatMessage } from '../types';
import { getChatResponse } from '../services/geminiService';
import { Send, User, Bot, Loader, Trash2 } from 'lucide-react';
import ConfirmationModal from './ui/ConfirmationModal';

const ChatMentor: React.FC = () => {
    const initialMessage: ChatMessage = { id: 1, text: "Hello! I'm your AI Financial Mentor. Ask me anything about investing, stocks, or market trends.", sender: 'ai' };
    const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
    const [input, setInput] = useState('');
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (input.trim() === '') return;

        const newUserMessage: ChatMessage = { id: Date.now(), text: input, sender: 'user' };
        const loadingMessage: ChatMessage = { id: Date.now() + 1, text: '', sender: 'loading' };

        setMessages(prev => [...prev, newUserMessage, loadingMessage]);
        setInput('');

        const aiResponseText = await getChatResponse(messages, input);
        const newAiMessage: ChatMessage = { id: Date.now() + 2, text: aiResponseText, sender: 'ai' };

        setMessages(prev => {
            const newMessages = prev.filter(msg => msg.sender !== 'loading');
            return [...newMessages, newAiMessage];
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const handleClearChat = () => {
        setMessages([initialMessage]);
    };

    return (
        <>
            <ConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleClearChat}
                title="Clear Chat History"
                message="Are you sure you want to delete this conversation? This action cannot be undone."
            />
            <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Chat Mentor</h1>
                    <button 
                        onClick={() => setIsConfirmOpen(true)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-500 transition-colors"
                        aria-label="Clear chat history"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
                <Card className="flex-grow flex flex-col">
                    <div ref={chatContainerRef} className="flex-grow overflow-y-auto pr-4 -mr-4 space-y-4 mb-4">
                        {messages.map(message => (
                            <div key={message.id} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                                {message.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center flex-shrink-0"><Bot className="w-5 h-5 text-neon-blue"/></div>}
                                
                                <div className={`max-w-md p-3 rounded-2xl ${message.sender === 'user' ? 'bg-neon-blue/20 text-gray-800 dark:text-gray-200 rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 rounded-bl-none text-gray-800 dark:text-gray-200'}`}>
                                    {message.sender === 'loading' ? (
                                        <div className="flex items-center justify-center p-2">
                                            <Loader className="w-5 h-5 animate-spin" />
                                        </div>
                                    ) : (
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                                    )}
                                </div>
                                {message.sender === 'user' && <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center flex-shrink-0"><User className="w-5 h-5"/></div>}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 mt-auto">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask 'Should I buy Tesla today?'"
                            className="flex-grow bg-gray-200 dark:bg-gray-700 border-transparent focus:border-neon-blue focus:ring-0 rounded-full py-3 px-5 outline-none transition-colors"
                        />
                        <button onClick={handleSend} className="bg-neon-blue text-white p-3 rounded-full hover:shadow-neon-blue transition-shadow">
                            <Send className="w-6 h-6" />
                        </button>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default ChatMentor;
