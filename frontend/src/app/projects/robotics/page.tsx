'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';
import PageLayout from '@/components/layout/PageLayout';
import ProjectCard from '@/components/ProjectCard';

interface Project {
    name: string;
    description: string;
    status: 'completed' | 'ongoing' | 'planned';
}

interface Category {
    id: string;
    title: string;
    description: string;
    gradient: string;
    projects: Project[];
}

const roboticsCategories: Category[] = [
    {
        id: 'control-systems',
        title: 'Control Systems',
        description: 'Systems for controlling robot behavior and movement',
        gradient: 'from-cyan-500 to-blue-500',
        projects: [
            {
                name: 'PID Controllers',
                description: 'Balancing a robotic arm using proportional-integral-derivative control.',
                status: 'completed'
            },
            {
                name: 'Kalman Filters',
                description: 'Smoothing sensor data for drones using state estimation.',
                status: 'ongoing'
            },
            {
                name: 'State-Space Control',
                description: 'Stabilizing a quadcopter using modern control theory.',
                status: 'completed'
            },
            {
                name: 'Adaptive Control',
                description: 'Robotic exoskeletons for rehabilitation with adaptive learning.',
                status: 'ongoing'
            },
            {
                name: 'Model Predictive Control',
                description: 'Optimizing energy usage in robotic systems through predictive modeling.',
                status: 'planned'
            }
        ]
    },
    {
        id: 'perception',
        title: 'Perception',
        description: 'Sensors and algorithms for robot perception',
        gradient: 'from-purple-500 to-pink-500',
        projects: [
            {
                name: 'LIDAR Processing',
                description: 'Processing point cloud data for environmental mapping.',
                status: 'completed'
            },
            {
                name: 'Visual SLAM',
                description: 'Simultaneous localization and mapping using visual data.',
                status: 'ongoing'
            },
            {
                name: 'Depth Estimation',
                description: 'Estimating depth from stereo camera images.',
                status: 'ongoing'
            },
            {
                name: 'Sensor Fusion',
                description: 'Combining data from multiple sensors for improved perception.',
                status: 'planned'
            }
        ]
    },
    {
        id: 'manipulation',
        title: 'Manipulation',
        description: 'Robot manipulation and grasping',
        gradient: 'from-orange-500 to-red-500',
        projects: [
            {
                name: 'Inverse Kinematics',
                description: 'Computing joint angles for desired end-effector positions.',
                status: 'completed'
            },
            {
                name: 'Grasp Planning',
                description: 'Planning optimal grasping positions for objects.',
                status: 'ongoing'
            },
            {
                name: 'Force Control',
                description: 'Controlling robot interaction forces during manipulation.',
                status: 'planned'
            }
        ]
    },
    {
        id: 'locomotion',
        title: 'Locomotion',
        description: 'Robot movement and navigation',
        gradient: 'from-green-500 to-teal-500',
        projects: [
            {
                name: 'Path Planning',
                description: 'Finding optimal paths through complex environments.',
                status: 'completed'
            },
            {
                name: 'Dynamic Walking',
                description: 'Implementing dynamic walking gaits for humanoid robots.',
                status: 'ongoing'
            },
            {
                name: 'Obstacle Avoidance',
                description: 'Real-time obstacle avoidance for mobile robots.',
                status: 'ongoing'
            },
            {
                name: 'Multi-Robot Navigation',
                description: 'Coordinated navigation for multiple robots.',
                status: 'planned'
            }
        ]
    }
];

export default function RoboticsPage() {
    const [selectedCategory, setSelectedCategory] = useState<Category>(roboticsCategories[0]);

    return (
        <PageLayout
            gradient={selectedCategory.gradient}
            pattern="circuit"
            className="min-h-screen p-8"
        >
            {/* Hero Section */}
            <section className="container mx-auto mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 mb-6"
                >
                    <FaRobot className="w-8 h-8 text-cyan-500" />
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                        Robotics Projects
                    </h1>
                </motion.div>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
                    {selectedCategory.description}
                </p>
            </section>

            {/* Category Navigation */}
            <nav className="container mx-auto mb-12">
                <div className="flex flex-wrap gap-4">
                    {roboticsCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                                selectedCategory.id === category.id
                                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        >
                            {category.title}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Projects Grid */}
            <motion.section
                key={selectedCategory.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="container mx-auto"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedCategory.projects.map((project) => (
                        <ProjectCard
                            key={project.name}
                            title={project.name}
                            description={project.description}
                            status={project.status}
                            link={`/projects/robotics/${selectedCategory.id}/${project.name.toLowerCase().replace(/\s+/g, '-')}`}
                            gradient={selectedCategory.gradient}
                        />
                    ))}
                </div>
            </motion.section>
        </PageLayout>
    );
} 