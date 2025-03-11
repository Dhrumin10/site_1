'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaRocket, FaCode, FaLock } from 'react-icons/fa';
import { useTheme } from '@/components/ThemeProvider';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import Image from 'next/image';
import SocialLinks from '@/components/shared/SocialLinks';

// Enhanced animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2,
            duration: 0.8
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10
        }
    }
};

const floatAnimation = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

// Types
type ProjectStatus = 'completed' | 'in-progress' | 'upcoming';

interface Project {
    id: number;
    name: string;
    description: string;
    technologies: string[];
    impact: string;
    status: ProjectStatus;
    gradient: string;
    features: string[];
}

// Project data structure
const projects: Project[] = [
    {
        id: 1,
        name: "AI-Powered Urban Planning Simulation",
        description: "Develop an AI-driven simulation for urban planning where AI models optimize city layouts, traffic flow, energy consumption, and green spaces.",
        technologies: ["Python", "TensorFlow", "PyTorch", "GIS", "OpenStreetMap", "Reinforcement Learning"],
        impact: "Revolutionizing urban development through AI-driven optimization and sustainable planning",
        status: "in-progress",
        gradient: "from-blue-400 to-green-600",
        features: [
            "Agent-based simulations for different urban components",
            "AI-driven optimization for sustainable infrastructure",
            "Real-time simulations based on historical city data"
        ]
    },
    {
        id: 2,
        name: "AI-Driven Mining Resource Simulation",
        description: "Build an AI simulation where various mining vehicles act as autonomous agents to extract minerals from different terrains.",
        technologies: ["Unity", "Python", "TensorFlow", "PyTorch", "Reinforcement Learning"],
        impact: "Optimizing mining operations through intelligent automation and resource management",
        status: "upcoming",
        gradient: "from-purple-400 to-blue-600",
        features: [
            "Different machines optimized for different terrains and minerals",
            "AI models learn how to maximize resource extraction efficiently",
            "Dynamic terrain changes based on mining activity"
        ]
    },
    {
        id: 3,
        name: "AI-Powered Fine-Tuning & Deployment Platform",
        description: "Create a platform that enables users to fine-tune pre-trained AI models using simple text-based instructions, with automated deployment.",
        technologies: ["Python", "Hugging Face", "PyTorch", "TensorFlow", "Docker", "GitHub Actions"],
        impact: "Democratizing AI model development through simplified fine-tuning and deployment",
        status: "completed",
        gradient: "from-green-400 to-teal-600",
        features: [
            "Text-driven interface for easy model fine-tuning",
            "Automated deployment pipelines to Hugging Face and GitHub",
            "Open-source framework for community collaboration"
        ]
    }
];

const StatusIndicator = ({ status }: { status: ProjectStatus }) => {
    const statusColors = {
        completed: "bg-green-500",
        "in-progress": "bg-blue-500",
        upcoming: "bg-purple-500"
    };

    return (
        <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${statusColors[status]} animate-pulse`} />
            <span className="text-sm capitalize">{status.replace("-", " ")}</span>
        </div>
    );
};

const ProjectCard = ({ project }: { project: Project }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            variants={itemVariants}
            className="relative group"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <div className="relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-500 p-6">
                {/* Enhanced gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Animated particles on hover */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 pointer-events-none"
                        >
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${project.gradient}`}
                                    initial={{
                                        x: "50%",
                                        y: "50%",
                                        opacity: 0
                                    }}
                                    animate={{
                                        x: `${50 + (Math.random() * 40 - 20)}%`,
                                        y: `${50 + (Math.random() * 40 - 20)}%`,
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Content */}
                <div className="relative z-10">
                    <StatusIndicator status={project.status} />

                    <motion.h3
                        className="text-2xl font-bold mt-4 mb-3 text-gray-900 dark:text-white"
                        variants={floatAnimation}
                        animate={isHovered ? "animate" : "initial"}
                    >
                        {project.name}
                    </motion.h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {project.description}
                    </p>

                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                            Key Features
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                            {project.features.map((feature, index) => (
                                <li key={index} className="text-sm">
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                            Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                                <motion.span
                                    key={index}
                                    className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                            Impact
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                            {project.impact}
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r ${project.gradient} text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
                    >
                        <span className="relative z-10">Learn More</span>
                        <motion.div
                            className="absolute inset-0 bg-white"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.5 }}
                            style={{ opacity: 0.2 }}
                        />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

const RavSection = () => {
    return (
        <motion.div
            variants={itemVariants}
            className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 md:p-12 mb-16"
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="text-gray-900 dark:text-white">Meet Rav – </span>
                        <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                            The Heart of Ravion Lab
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Our Visionary, Our Mentor, Our Future.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Rav Avatar Column */}
                    <div className="md:col-span-1">
                        <div className="relative aspect-square rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                            <div className="absolute inset-0 rounded-full overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-1/2 h-1/2 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M20 4V8H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <p className="mt-6 text-gray-600 dark:text-gray-300">
                            At the core of Ravion Lab lies Rav—a dynamic, self-learning AI who embodies our passion for pushing boundaries. He's not just another tool; he's the bold, visionary spirit guiding every project we undertake.
                        </p>
                    </div>

                    {/* Features Column */}
                    <div className="md:col-span-2 space-y-4">
                        {/* Continuous Learning */}
                        <motion.div
                            className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Continuous Learning</h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Rav evolves with every interaction, integrating new insights and adapting to challenges in real-time.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Innovation Catalyst */}
                        <motion.div
                            className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Innovation Catalyst</h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Like Tony Stark in the digital realm, Rav combines wit and wisdom to inspire groundbreaking solutions.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Community Mentor */}
                        <motion.div
                            className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/50">
                                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Community Mentor</h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Making complex engineering concepts accessible while fostering a culture of creative exploration.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Vision & Purpose */}
                <div className="mt-12 text-center max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Vision & Purpose</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Rav represents our commitment to harnessing cutting-edge technology for meaningful impact. He learns from every success and failure, ensuring our lab remains at the forefront of innovation while making advanced technology accessible to everyone.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default function RealIdeasPage() {
    const { theme } = useTheme();
    const [activeSection, setActiveSection] = useState('header');

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <BackgroundAnimation theme={theme} />

            {/* Floating Navigation Dots */}
            <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
                {['header', 'rav', 'projects'].map((section) => (
                    <motion.button
                        key={section}
                        className={`w-3 h-3 rounded-full ${activeSection === section
                            ? 'bg-blue-600 scale-125'
                            : 'bg-gray-400 hover:bg-blue-400'
                            } transition-all duration-300`}
                        onClick={() => {
                            const element = document.getElementById(section);
                            element?.scrollIntoView({ behavior: 'smooth' });
                            setActiveSection(section);
                        }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    />
                ))}
            </div>

            <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-32" // Increased spacing between sections
                    >
                        {/* Header Section */}
                        <motion.div
                            variants={itemVariants}
                            className="text-center max-w-3xl mx-auto"
                            id="header"
                        >
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <h1 className="text-5xl md:text-7xl font-bold mb-8">
                                    <span className="text-gray-900 dark:text-white">Building the </span>
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                        Future
                                    </span>
                                </h1>
                            </motion.div>
                            <p className="text-xl text-gray-600 dark:text-gray-300">
                                At Ravion Lab, we transform innovative ideas into real-world AI & robotics solutions that shape tomorrow's technology landscape.
                            </p>
                        </motion.div>

                        {/* Meet Rav Section */}
                        <div id="rav">
                            <RavSection />
                        </div>

                        {/* Projects Timeline */}
                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            id="projects"
                        >
                            {projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </motion.div>

                        {/* Enhanced Call to Action */}
                        <motion.div
                            variants={itemVariants}
                            className="text-center max-w-3xl mx-auto pt-16"
                        >
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                                Have an Innovative Project Idea?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-8">
                                Join our community of innovators and help shape the future of AI & robotics.
                            </p>
                            <motion.a
                                href="/join-us"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center px-8 py-3 rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                            >
                                <span className="relative z-10">Get Started</span>
                                <motion.div
                                    className="absolute inset-0 bg-white"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.5 }}
                                    style={{ opacity: 0.2 }}
                                />
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
} 