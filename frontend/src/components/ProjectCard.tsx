'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ProjectCardProps {
    title: string;
    description: string;
    status: 'completed' | 'ongoing' | 'planned';
    link: string;
    gradient: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    status,
    link,
    gradient
}) => {
    const statusColors = {
        completed: 'bg-green-900/30 text-green-400 border border-green-800',
        ongoing: 'bg-blue-900/30 text-blue-400 border border-blue-800',
        planned: 'bg-gray-800/40 text-gray-300 border border-gray-700'
    };

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="group relative"
        >
            <Link href={link}>
                <div className="p-6 rounded-xl transition-all duration-300 bg-gray-800/50 shadow-lg hover:shadow-xl border border-gray-700/50 hover:bg-gray-800/70">
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`} />

                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] rounded-xl" />

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                                {title}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-sm capitalize transition-colors duration-300 ${statusColors[status]}`}>
                                {status}
                            </span>
                        </div>

                        <p className="mb-4 text-gray-300 transition-colors duration-300">
                            {description}
                        </p>

                        <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                            <span className="mr-2">Learn more</span>
                            <motion.svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={{ x: 0 }}
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </motion.svg>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProjectCard; 