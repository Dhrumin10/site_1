'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { containerVariants, itemVariants, fadeUpVariants, scaleVariants } from '@/components/animations';
import SocialMediaLinks from '@/components/SocialMediaLinks';
import { useTheme } from '@/components/ThemeProvider';

const values = [
    {
        title: "Innovation",
        description: "Pushing boundaries and exploring new frontiers in AI and robotics.",
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    },
    {
        title: "Learning",
        description: "Growing through hands-on experience and continuous exploration.",
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    },
    {
        title: "Community",
        description: "Building together through collaboration and shared knowledge.",
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    }
];

export default function AboutPage() {
    const { theme } = useTheme();

    return (
        <AnimatePresence mode="wait">
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative min-h-screen bg-gray-50 dark:bg-dark-background"
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
                            <motion.h1
                                className="text-5xl sm:text-6xl font-bold mb-6"
                                variants={itemVariants}
                            >
                                <span className="text-gray-900 dark:text-white">About </span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                    Ravion Lab
                                </span>
                            </motion.h1>
                            <motion.p
                                className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8"
                                variants={itemVariants}
                            >
                                At Ravion Lab, we unite innovators to turn real-world challenges into breakthrough AI and robotics solutions through hands-on learning and open collaboration.
                            </motion.p>
                        </motion.div>

                        {/* Values Grid */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
                            variants={containerVariants}
                        >
                            {values.map((value) => (
                                <motion.div
                                    key={value.title}
                                    variants={itemVariants}
                                    className="bg-white dark:bg-dark-background-alt rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                                >
                                    <motion.div
                                        className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-4 inline-block"
                                        whileHover={{ scale: 1.1, rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            {value.icon}
                                        </svg>
                                    </motion.div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {value.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Call to Action */}
                        <motion.div
                            variants={fadeUpVariants}
                            className="text-center"
                        >
                            <motion.h2
                                variants={itemVariants}
                                className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
                            >
                                Join Our Community
                            </motion.h2>
                            <motion.p
                                variants={itemVariants}
                                className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8"
                            >
                                Be part of a growing community of innovators shaping the future of AI and robotics.
                            </motion.p>
                            <motion.div
                                variants={itemVariants}
                                className="mb-8"
                            >
                                <SocialMediaLinks showAll={true} className="justify-center gap-6" />
                            </motion.div>
                            <motion.div
                                variants={scaleVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="inline-block"
                            >
                                <Link
                                    href="/join-us"
                                    className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
                                >
                                    <span className="relative z-10">Join Us</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.main>
        </AnimatePresence>
    );
} 