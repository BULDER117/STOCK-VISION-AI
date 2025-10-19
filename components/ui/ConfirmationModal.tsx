
import React from 'react';
import Card from './Card';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <Card className="w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
                <div className="flex justify-end gap-4">
                    <button 
                        onClick={onClose} 
                        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                        Confirm
                    </button>
                </div>
            </Card>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s forwards;
                }
            `}</style>
        </div>
    );
};

export default ConfirmationModal;
