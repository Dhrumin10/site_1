'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBrain } from 'react-icons/fa';

// Get the Machine Learning data from the main projects page
const mlData = {
    title: "Machine Learning",
    description: "Learning from data to make predictions or identify patterns",
    gradient: "from-blue-500 to-purple-500",
    subfields: [
        {
            title: "Supervised Learning",
            description: "Learning from labeled data to make predictions",
            algorithms: [
                {
                    name: "Linear Regression",
                    project: "Predicting house prices",
                    status: "completed"
                },
                {
                    name: "Logistic Regression",
                    project: "Email spam detection",
                    status: "ongoing"
                },
                {
                    name: "Decision Trees",
                    project: "Customer segmentation for e-commerce",
                    status: "completed"
                },
                {
                    name: "Random Forest",
                    project: "Predicting employee attrition",
                    status: "ongoing"
                },
                {
                    name: "Support Vector Machines",
                    project: "Image classification for handwritten digits",
                    status: "completed"
                }
            ]
        },
        {
            title: "Unsupervised Learning",
            description: "Discovering patterns in unlabeled data",
            algorithms: [
                {
                    name: "K-Means Clustering",
                    project: "Customer clustering for marketing",
                    status: "completed"
                },
                {
                    name: "DBSCAN",
                    project: "Anomaly detection in network traffic",
                    status: "ongoing"
                },
                {
                    name: "PCA",
                    project: "Dimensionality reduction for large datasets",
                    status: "completed"
                },
                {
                    name: "Hierarchical Clustering",
                    project: "Grouping similar products in e-commerce",
                    status: "ongoing"
                },
                {
                    name: "Gaussian Mixture Models",
                    project: "Fraud detection in banking",
                    status: "planned"
                }
            ]
        },
        {
            title: "Reinforcement Learning",
            description: "Learning through interaction with an environment",
            algorithms: [
                {
                    name: "Q-Learning",
                    project: "Teaching a robot to navigate a maze",
                    status: "completed"
                },
                {
                    name: "SARSA",
                    project: "Personalized recommendations for users",
                    status: "ongoing"
                },
                {
                    name: "Deep Q-Networks (DQN)",
                    project: "Training an AI to play Pong",
                    status: "completed"
                },
                {
                    name: "Policy Gradient Methods",
                    project: "Optimizing robotic arm movements",
                    status: "planned"
                },
                {
                    name: "Actor-Critic Methods",
                    project: "Dynamic pricing for e-commerce",
                    status: "ongoing"
                }
            ]
        },
        {
            title: "Semi-Supervised Learning",
            description: "Learning from both labeled and unlabeled data",
            algorithms: [
                {
                    name: "Label Propagation",
                    project: "Categorizing partially labeled datasets",
                    status: "completed"
                },
                {
                    name: "Self-Training",
                    project: "Improving spam filters with limited labeled data",
                    status: "ongoing"
                },
                {
                    name: "Co-Training",
                    project: "Classifying images using multiple views",
                    status: "planned"
                },
                {
                    name: "Generative Models (GANs)",
                    project: "Data augmentation for small datasets",
                    status: "completed"
                },
                {
                    name: "Graph-Based Models",
                    project: "Community detection in social networks",
                    status: "ongoing"
                }
            ]
        }
    ]
};

export default function MachineLearningPage() {
    const [selectedSubfield, setSelectedSubfield] = useState(mlData.subfields[0]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 relative z-10">
                    {/* Back Navigation */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8"
                    >
                        <Link href="/projects" className="text-blue-400 hover:text-blue-300 transition-colors">
                            ← Back to Projects
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <div className="flex items-center justify-center mb-6">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                <FaBrain className="w-12 h-12" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Machine Learning Projects
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            {mlData.description}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Subfields Navigation */}
                <div className="flex overflow-x-auto space-x-4 mb-12 pb-4">
                    {mlData.subfields.map((subfield) => (
                        <motion.button
                            key={subfield.title}
                            onClick={() => setSelectedSubfield(subfield)}
                            className={`px-6 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedSubfield.title === subfield.title
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {subfield.title}
                        </motion.button>
                    ))}
                </div>

                {/* Selected Subfield Content */}
                <motion.div
                    key={selectedSubfield.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                >
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            {selectedSubfield.title}
                        </h2>
                        <p className="text-gray-300">
                            {selectedSubfield.description}
                        </p>
                    </div>

                    {/* Algorithms Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedSubfield.algorithms.map((algo, index) => (
                            <motion.div
                                key={algo.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-white">
                                        {algo.name}
                                    </h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${algo.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                                            algo.status === 'ongoing' ? 'bg-blue-500/20 text-blue-300' :
                                                'bg-gray-500/20 text-gray-300'
                                        }`}>
                                        {algo.status.charAt(0).toUpperCase() + algo.status.slice(1)}
                                    </span>
                                </div>
                                <p className="text-gray-300 mb-4">
                                    {algo.project}
                                </p>
                                <div className="mt-4">
                                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                                        Learn more →
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
} 