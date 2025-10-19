import React from 'react';

// FIX: Extend React.HTMLAttributes<HTMLDivElement> to allow passing standard div props like onClick.
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
    return (
        <div
            {...props}
            className={`
                bg-light-card dark:bg-dark-card 
                backdrop-blur-xl 
                border border-light-border dark:border-dark-border 
                rounded-2xl 
                p-6 
                shadow-lg
                transition-all duration-300
                ${className}
            `}
        >
            {children}
        </div>
    );
};

export default Card;
