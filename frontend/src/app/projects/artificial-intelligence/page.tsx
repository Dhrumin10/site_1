'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBrain } from 'react-icons/fa';
import { useTheme } from '@/components/ThemeProvider';
import PageLayout from '@/components/layout/PageLayout';
import ProjectCard from '@/components/ProjectCard';

interface Algorithm {
    name: string;
    description: string;
    status: 'completed' | 'ongoing' | 'planned';
}

interface Branch {
    id: string;
    title: string;
    description: string;
    gradient: string;
    algorithms: Algorithm[];
}

const aiBranches: Branch[] = [
    {
        id: 'machine-learning',
        title: 'Machine Learning',
        description: 'Classical ML algorithms and statistical learning methods.',
        gradient: 'from-accent-blue to-accent-purple',
        algorithms: [
            { 
                name: 'Linear Regression',
                description: 'Predicting continuous values using linear relationships between variables.',
                status: 'completed'
            },
            { 
                name: 'Random Forests',
                description: 'Ensemble learning method for classification and regression using decision trees.',
                status: 'completed'
            },
            { 
                name: 'Support Vector Machines',
                description: 'Powerful classification algorithm using hyperplanes in high-dimensional space.',
                status: 'ongoing'
            },
            { 
                name: 'K-Means Clustering',
                description: 'Unsupervised learning algorithm for grouping similar data points.',
                status: 'planned'
            }
        ]
    },
    {
        id: 'deep-learning',
        title: 'Deep Learning',
        description: 'Neural networks and deep learning architectures.',
        gradient: 'from-accent-purple to-accent-blue',
        algorithms: [
            { 
                name: 'Convolutional Neural Networks',
                description: 'Deep learning architecture specialized for processing grid-like data, such as images.',
                status: 'completed'
            },
            {
                name: 'Recurrent Neural Networks',
                description: 'Neural networks designed to work with sequence data and time series.',
                status: 'ongoing'
            },
            {
                name: 'Transformers',
                description: 'Advanced architecture using self-attention mechanisms for processing sequential data.',
                status: 'ongoing'
            },
            {
                name: 'GANs',
                description: 'Generative models that can create new, synthetic data similar to training examples.',
                status: 'planned'
            },
            {
                name: 'Autoencoders',
                description: 'Neural networks for learning efficient data encodings and dimensionality reduction.',
                status: 'planned'
            }
        ]
    },
    {
        id: 'nlp',
        title: 'Natural Language Processing',
        description: 'Text analysis and language understanding systems.',
        gradient: 'from-accent-green to-accent-blue',
        algorithms: [
            {
                name: 'Named Entity Recognition',
                description: 'Identifying and classifying named entities (e.g., person names, locations) in text.',
                status: 'completed'
            },
            {
                name: 'Sentiment Analysis',
                description: 'Determining the emotional tone and opinion expressed in text.',
                status: 'ongoing'
            },
            {
                name: 'Machine Translation',
                description: 'Automatically translating text from one language to another.',
                status: 'planned'
            },
            {
                name: 'Question Answering',
                description: 'Systems that can automatically answer questions posed in natural language.',
                status: 'planned'
            }
        ]
    },
    {
        id: 'computer-vision',
        title: 'Computer Vision',
        description: 'Image and video processing algorithms.',
        gradient: 'from-accent-orange to-accent-yellow',
        algorithms: [
            {
                name: 'Object Detection',
                description: 'Identifying and locating objects within images and video streams.',
                status: 'completed'
            },
            {
                name: 'Image Segmentation',
                description: 'Partitioning images into multiple segments or objects.',
                status: 'ongoing'
            },
            {
                name: 'Face Recognition',
                description: 'Identifying and verifying people based on facial features.',
                status: 'ongoing'
            },
            {
                name: 'Pose Estimation',
                description: 'Detecting human body poses and tracking movement in images and video.',
                status: 'planned'
            }
        ]
    }
];

export default function AIProjectsPage() {
    const [selectedBranch, setSelectedBranch] = useState<Branch>(aiBranches[0]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleBranchChange = async (branch: Branch) => {
        setIsLoading(true);
        setError(null);
        try {
            setSelectedBranch(branch);
        } catch (err) {
            setError('Failed to load branch data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const getGradientClasses = (branch: Branch, isActive: boolean) => {
        const [color1, color2] = branch.gradient.split(' ')[1].split('-');
        return isActive
            ? `from-${color1}-500 to-${color2}-500 text-white`
            : `hover:from-${color1}-500/10 hover:to-${color2}-500/10`;
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen transition-colors duration-300 bg-gray-900"
            >
                <PageLayout
                    gradient={`from-${selectedBranch.gradient.split(' ')[1]} to-${selectedBranch.gradient.split(' ')[3]}`}
                    pattern="circuit"
                    className="relative z-10"
                >
                    {/* Hero Section */}
                    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-12"
                        >
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg"
                                >
                                    <FaBrain className="w-12 h-12" />
                                </motion.div>
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                                <span className="text-white transition-colors duration-300">
                                    Artificial{' '}
                                </span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400 transition-colors duration-300">
                                    Intelligence
                                </span>
                            </h1>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
                                Explore our collection of AI projects across different domains, from classical machine learning
                                to cutting-edge deep learning applications.
                            </p>
                        </motion.div>

                        {/* Branch Navigation */}
                        <nav className="mb-16">
                            <div className="flex flex-wrap justify-center gap-4">
                                {aiBranches.map((branch) => (
                                    <motion.button
                                        key={branch.id}
                                        onClick={() => handleBranchChange(branch)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`px-6 py-3 rounded-lg transition-all duration-300 relative overflow-hidden 
                                            bg-gray-800 hover:bg-gray-700 shadow-md hover:shadow-lg text-white
                                            ${
                                                selectedBranch.id === branch.id
                                                    ? `bg-gradient-to-r ${getGradientClasses(branch, true)}`
                                                    : `hover:bg-gradient-to-r ${getGradientClasses(branch, false)}`
                                            }`}
                                    >
                                        {selectedBranch.id === branch.id && (
                                            <motion.div
                                                layoutId="active-indicator"
                                                className={`absolute inset-0 bg-gradient-to-r from-${branch.gradient.split(' ')[1]}/20 to-${branch.gradient.split(' ')[3]}/20`}
                                                initial={false}
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{branch.title}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </nav>

                        {/* Error Message */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-center mb-8 text-red-400"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Content Section */}
                        <motion.section
                            key={selectedBranch.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="container mx-auto"
                        >
                            {isLoading ? (
                                <div className="flex justify-center items-center min-h-[300px]">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                                    />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {selectedBranch.algorithms.map((algorithm, index) => (
                                        <motion.div
                                            key={algorithm.name}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ y: -5 }}
                                            className="group"
                                        >
                                            <ProjectCard
                                                title={algorithm.name}
                                                description={algorithm.description}
                                                status={algorithm.status}
                                                link={`/projects/artificial-intelligence/${selectedBranch.id}/${algorithm.name.toLowerCase().replace(/\s+/g, '-')}`}
                                                gradient={selectedBranch.gradient}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.section>
                    </section>
                </PageLayout>
            </motion.div>
        </AnimatePresence>
    );
} 