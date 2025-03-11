import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundGradientProps {
    gradient?: string;
    pattern?: 'grid' | 'circuit' | 'dots';
    animate?: boolean;
    opacity?: number;
    className?: string;
}

export default function BackgroundGradient({
    gradient = 'from-primary to-primary-light dark:from-primary-dark dark:to-primary',
    pattern = 'grid',
    animate = true,
    opacity = 0.1,
    className = ''
}: BackgroundGradientProps) {
    const patternClass = {
        grid: 'bg-grid-pattern',
        circuit: 'bg-circuit-pattern',
        dots: 'bg-dots-pattern'
    }[pattern];

    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            {/* Base gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />

            {/* Pattern overlay */}
            <div className={`absolute inset-0 ${patternClass} opacity-[0.15] dark:opacity-[0.02]`} />

            {/* Animated elements */}
            {animate && (
                <>
                    {/* Gradient orbs */}
                    <motion.div
                        className={`absolute -top-1/2 left-0 h-full w-1/2 bg-gradient-to-br ${gradient} blur-3xl opacity-30`}
                        animate={{
                            x: [0, 100, 0],
                            y: [0, 50, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    <motion.div
                        className={`absolute -bottom-1/2 right-0 h-full w-1/2 bg-gradient-to-br ${gradient} blur-3xl opacity-30`}
                        animate={{
                            x: [0, -100, 0],
                            y: [0, -50, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 7.5
                        }}
                    />

                    {/* Circuit lines */}
                    {pattern === 'circuit' && (
                        <div className="absolute inset-0">
                            <motion.div
                                className="absolute inset-0 bg-circuit-pattern opacity-30"
                                animate={{
                                    backgroundPosition: ['0% 0%', '100% 100%']
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        </div>
                    )}

                    {/* Floating particles */}
                    <div className="absolute inset-0">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`absolute w-1 h-1 rounded-full bg-gradient-to-br ${gradient}`}
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, -20, 0],
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Noise overlay */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
        </div>
    );
} 