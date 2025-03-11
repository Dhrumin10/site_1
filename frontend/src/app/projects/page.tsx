'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBrain, FaRobot, FaGithub } from 'react-icons/fa';
import PageLayout from '@/components/layout/PageLayout';
import { useTheme } from '@/components/ThemeProvider';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import SocialMediaLinks from '@/components/SocialMediaLinks';

interface GitHubRepo {
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    topics: string[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    },
    exit: { opacity: 0 }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const domains = [
    {
        title: 'Artificial Intelligence',
        icon: <FaBrain className="w-12 h-12" />,
        description: 'Learning from data to make predictions or identify patterns.',
        gradient: 'from-blue-600 to-purple-600',
        githubOrg: 'ravion-ai',
        topics: ['machine-learning', 'deep-learning', 'nlp', 'computer-vision'],
        branches: ['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision'],
        projectCount: 40,
        mainRepoUrl: 'https://github.com/ravionlab/artificial-intelligence-projects'
    },
    {
        title: 'Robotics',
        icon: <FaRobot className="w-12 h-12" />,
        description: 'A field combining AI, mechanics, electronics, and control systems.',
        gradient: 'from-purple-600 to-blue-600',
        githubOrg: 'ravion-robotics',
        topics: ['robotics', 'control-systems', 'perception', 'manipulation'],
        branches: ['Control Systems', 'Perception', 'Manipulation', 'Locomotion'],
        projectCount: 20,
        mainRepoUrl: 'https://github.com/ravionlab/robotics-projects'
    }
];

export default function ProjectsPage() {
    const { theme } = useTheme();
    const [githubProjects, setGithubProjects] = useState<Record<string, GitHubRepo[]>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGithubProjects = async () => {
            const projects: Record<string, GitHubRepo[]> = {};

            for (const domain of domains) {
                try {
                    const response = await fetch(`https://api.github.com/orgs/${domain.githubOrg}/repos`);
                    if (response.ok) {
                        const repos = await response.json();
                        projects[domain.title] = repos.filter((repo: GitHubRepo) =>
                            domain.topics.some(topic => repo.topics?.includes(topic))
                        );
                    }
                } catch (error) {
                    console.error(`Error fetching GitHub repos for ${domain.title}:`, error);
                }
            }

            setGithubProjects(projects);
            setIsLoading(false);
        };

        fetchGithubProjects();
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
                className="relative min-h-screen bg-gray-50 dark:bg-dark-background transition-colors duration-300"
            >
                <BackgroundAnimation theme={theme} />

                {/* Content Container */}
                <div className="relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
                        <motion.div
                            variants={itemVariants}
                            className="text-center mb-16"
                        >
                            <motion.h1
                                className="text-5xl md:text-7xl font-bold mb-6"
                                variants={itemVariants}
                            >
                                <span className="text-gray-900 dark:text-dark-text">Our </span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                    Projects
                                </span>
                            </motion.h1>
                            <motion.p
                                variants={itemVariants}
                                className="text-xl text-gray-600 dark:text-dark-text-muted max-w-3xl mx-auto"
                            >
                                Explore our innovative projects in AI and robotics, pushing the boundaries of technology
                            </motion.p>
                        </motion.div>

                        {/* Domains Grid */}
                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                            {domains.map((domain, index) => (
                                <motion.div
                                    key={domain.title}
                                    variants={itemVariants}
                                    className="relative group"
                                >
                                    <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-dark-background-alt shadow-lg hover:shadow-xl transition-all duration-300">
                                        {/* Card Background with Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 dark:from-blue-600/10 dark:to-purple-600/10" />
                                        <div className={`absolute inset-0 bg-gradient-to-br ${domain.gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300`} />

                                        {/* Card Content */}
                                        <div className="relative p-8">
                                            <div className="flex items-start justify-between mb-6">
                                                <motion.div
                                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                                    transition={{ duration: 0.5 }}
                                                    className={`p-3 rounded-xl bg-gradient-to-r ${domain.gradient} text-white transform group-hover:scale-110 transition-transform duration-300`}
                                                >
                                                    {domain.icon}
                                                </motion.div>
                                                <motion.span
                                                    className="text-sm font-medium px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300 border border-blue-600/20 dark:border-blue-500/30"
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    {githubProjects[domain.title]?.length || 0} Projects
                                                </motion.span>
                                            </div>

                                            <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-dark-text group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                                {domain.title}
                                            </h2>

                                            <p className="text-gray-600 mb-6">
                                                {domain.description}
                                            </p>

                                            {/* GitHub Projects */}
                                            <div className="space-y-4 mb-6">
                                                {isLoading ? (
                                                    <div className="animate-pulse space-y-3">
                                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                                    </div>
                                                ) : githubProjects[domain.title]?.slice(0, 3).map((repo) => (
                                                    <Link
                                                        key={repo.name}
                                                        href={repo.html_url}
                                                        target="_blank"
                                                        className="block group/repo"
                                                    >
                                                        <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-background hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <h3 className="font-medium text-gray-900 dark:text-dark-text group-hover/repo:text-blue-600 dark:group-hover/repo:text-blue-400">
                                                                    {repo.name}
                                                                </h3>
                                                                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                                                                    <span>{repo.stargazers_count} ★</span>
                                                                    {repo.language && (
                                                                        <span className="text-sm">{repo.language}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <p className="text-sm text-gray-600 dark:text-dark-text-muted">
                                                                {repo.description}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>

                                            {/* View All Projects Button */}
                                            <div className="mt-8 space-y-4">
                                                <Link
                                                    href={domain.mainRepoUrl}
                                                    target="_blank"
                                                    className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300"
                                                >
                                                    <FaGithub className="w-5 h-5 mr-2" />
                                                    View Main Repository
                                                </Link>
                                                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                                        Follow us on social media to stay updated:
                                                    </p>
                                                    <SocialMediaLinks showAll={false} className="justify-start gap-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
} 