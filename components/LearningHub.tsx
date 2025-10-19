
import React from 'react';
import Card from './ui/Card';
import { MOCK_COURSES } from '../constants';
import { BookMarked } from 'lucide-react';

const LearningHub: React.FC = () => {
    const levelColors: { [key: string]: string } = {
        'Beginner': 'bg-green-500/20 text-green-400',
        'Intermediate': 'bg-yellow-500/20 text-yellow-400',
        'Advanced': 'bg-red-500/20 text-red-400',
        'Expert': 'bg-purple-500/20 text-purple-400'
    };

    return (
        <div className="space-y-8 h-full">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learning & Knowledge Hub</h1>
            <p className="text-gray-600 dark:text-gray-400">Invest in knowledge first — profits follow discipline.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {MOCK_COURSES.map(course => (
                    <Card key={course.id} className="flex flex-col hover:scale-105 hover:border-neon-blue transition-all duration-300">
                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <BookMarked className="w-10 h-10 text-neon-blue mb-4" />
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${levelColors[course.level]}`}>{course.level}</span>
                            </div>
                            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{course.title}</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{course.description}</p>
                        </div>
                        <button className="mt-6 w-full bg-neon-blue/20 text-neon-blue font-semibold py-2 rounded-lg hover:bg-neon-blue/40 transition-colors">
                            Start Learning
                        </button>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default LearningHub;
