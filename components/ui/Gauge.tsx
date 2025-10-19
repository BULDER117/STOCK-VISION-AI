
import React from 'react';

interface GaugeProps {
    value: number; // 0 to 100
    label: string;
}

const Gauge: React.FC<GaugeProps> = ({ value, label }) => {
    const clampedValue = Math.min(Math.max(value, 0), 100);
    const angle = (clampedValue / 100) * 180 - 90;

    const getPath = (radius: number, startAngle: number, endAngle: number) => {
        const start = {
            x: 50 + radius * Math.cos(startAngle * Math.PI / 180),
            y: 50 + radius * Math.sin(startAngle * Math.PI / 180)
        };
        const end = {
            x: 50 + radius * Math.cos(endAngle * Math.PI / 180),
            y: 50 + radius * Math.sin(endAngle * Math.PI / 180)
        };
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
    };
    
    const red = getPath(40, -90, -30);
    const yellow = getPath(40, -30, 30);
    const green = getPath(40, 30, 90);

    return (
        <div className="relative w-full max-w-[200px] mx-auto flex flex-col items-center">
            <svg viewBox="0 0 100 55" className="w-full">
                <path d={red} fill="none" stroke="#FF3131" strokeWidth="10" />
                <path d={yellow} fill="none" stroke="#FFD700" strokeWidth="10" />
                <path d={green} fill="none" stroke="#39FF14" strokeWidth="10" />
                <g transform={`rotate(${angle} 50 50)`}>
                    <path d="M 50 50 L 50 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="3" fill="currentColor" />
                </g>
            </svg>
             <div className="text-center -mt-4">
                 <p className="text-3xl font-bold">{clampedValue}</p>
                 <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            </div>
        </div>
    );
};

export default Gauge;
