'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { containerVariants, itemVariants, fadeUpVariants, scaleVariants } from '@/components/animations';
import { useTheme } from '@/components/ThemeProvider';

const features = [
    {
        title: "Learn & Innovate",
        description: "Dive into cutting-edge AI and robotics through immersive, hands-on projects that push boundaries.",
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        title: "Build the Future",
        description: "Create revolutionary solutions that tackle real-world challenges and shape tomorrow's technology.",
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />,
        gradient: "from-purple-500 to-pink-500"
    },
    {
        title: "Grow Together",
        description: "Join an elite community of innovators, collaborate on groundbreaking projects, and accelerate your growth.",
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
        gradient: "from-green-500 to-teal-500"
    }
];

export default function HomePage() {
    const { theme } = useTheme();

    return (
        <AnimatePresence mode="wait">
            <motion.main
                className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
            >
                <BackgroundAnimation theme={theme} />

                {/* Content Container */}
                <div className="relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                        {/* Hero Section */}
                        <motion.div
                            variants={fadeUpVariants}
                            className="text-center mb-20"
                        >
                            <motion.div
                                className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium"
                                variants={scaleVariants}
                            >
                                Welcome to the Future of Innovation
                            </motion.div>
                            <motion.h1
                                className="text-5xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-primary to-primary-dark dark:from-blue-400 dark:to-purple-500 mb-6"
                                variants={itemVariants}
                            >
                                Transform Ideas Into Reality
                            </motion.h1>
                            <motion.p
                                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
                                variants={itemVariants}
                            >
                                Embark on a journey of innovation where AI meets robotics, and possibilities become achievements.
                            </motion.p>
                            <motion.div
                                className="flex flex-wrap justify-center gap-4"
                                variants={itemVariants}
                            >
                                <Link href="/projects" className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                                    Explore Projects
                                </Link>
                                <Link href="/real-ideas" className="px-8 py-4 rounded-lg border-2 border-primary dark:border-blue-400 text-primary dark:text-blue-400 font-semibold hover:bg-primary hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transform hover:-translate-y-1 transition-all duration-300">
                                    Learn More
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Features Grid */}
                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    variants={itemVariants}
                                    className="relative p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                                >
                                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-5`} />
                                    <div className="relative">
                                        <div className="h-12 w-12 mb-4 text-gray-900 dark:text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                {feature.icon}
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.main>
        </AnimatePresence>
    );
} 