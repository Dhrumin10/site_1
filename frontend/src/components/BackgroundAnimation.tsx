'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BackgroundAnimationProps {
    theme?: string;
}

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ theme }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
    const isLight = theme === 'light';

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Gradient Orbs */}
                <motion.div
                    className={`absolute w-[500px] h-[500px] rounded-full filter blur-3xl opacity-30 ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-400'
                        }`}
                    initial={{
                        x: -100,
                        y: -100,
                    }}
                    animate={{
                        x: mousePosition.x * 0.05,
                        y: mousePosition.y * 0.05,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
                <motion.div
                    className={`absolute right-0 w-[500px] h-[500px] rounded-full filter blur-3xl opacity-30 ${theme === 'dark' ? 'bg-purple-600' : 'bg-purple-400'
                        }`}
                    initial={{
                        x: 100,
                        y: 100,
                    }}
                    animate={{
                        x: mousePosition.x * -0.05,
                        y: mousePosition.y * -0.05,
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
            </motion.div>

            {/* Grid Pattern */}
            <div className={`absolute inset-0 bg-grid-pattern ${isLight ? 'opacity-[0.02]' : 'opacity-[0.03]'
                }`} />

            {/* Floating Particles */}
            <div className="absolute inset-0">
                {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full ${isLight
                            ? 'bg-gradient-to-r from-blue-400 to-purple-400 opacity-30'
                            : 'bg-gradient-to-r from-blue-400 to-purple-400 opacity-40'
                            }`}
                        initial={{
                            x: Math.random() * dimensions.width,
                            y: Math.random() * dimensions.height,
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            y: [null, -20, 20],
                            x: [null, -20, 20],
                            scale: [null, 1.2, 0.8],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Animated Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
                {Array.from({ length: 3 }).map((_, i) => (
                    <motion.path
                        key={i}
                        d={`M${-100 + i * 500},0 Q${dimensions.width / 2},${dimensions.height / 2} ${dimensions.width + 100},${dimensions.height}`}
                        stroke={isLight ? "#4F46E5" : "#818CF8"}
                        strokeWidth="1"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 2
                        }}
                    />
                ))}
            </svg>

            {/* Noise Overlay */}
            <div className={`absolute inset-0 bg-noise ${isLight ? 'opacity-[0.02]' : 'opacity-[0.03]'
                } mix-blend-overlay`} />
        </div>
    );
};

export default BackgroundAnimation; 