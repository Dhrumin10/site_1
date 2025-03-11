'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundAnimation from '../BackgroundAnimation';
import { useTheme } from '../ThemeProvider';

interface PageLayoutProps {
    children: React.ReactNode;
    gradient: string;
    pattern?: 'grid' | 'circuit';
    className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
    children,
    gradient,
    pattern = 'grid',
    className = ''
}) => {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`relative min-h-screen transition-colors duration-300 ${
                    isLight ? 'bg-gray-50' : 'bg-gray-900'
                } ${className}`}
            >
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isLight ? 0.03 : 0.05 }}
                        className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
                    />
                    <BackgroundAnimation theme={theme} />
                    {pattern === 'circuit' && (
                        <div className="absolute inset-0">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={`absolute h-px bg-gradient-to-r ${
                                        isLight 
                                            ? 'from-blue-500/10 to-transparent'
                                            : 'from-blue-500/20 to-transparent'
                                    }`}
                                    style={{
                                        top: `${Math.random() * 100}%`,
                                        left: 0,
                                        width: `${30 + Math.random() * 70}%`,
                                    }}
                                    animate={{
                                        scaleX: [0, 1],
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 3 + Math.random() * 2,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "linear",
                                        delay: Math.random() * 2,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                >
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PageLayout; 