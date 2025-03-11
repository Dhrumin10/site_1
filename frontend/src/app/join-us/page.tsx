'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { useTheme } from '@/components/ThemeProvider';
import { apiClient } from '@/lib/api';

interface FormData {
    fullName: string;
    email: string;
    background: string;
    interest: string;
    motivation: string;
}

interface IdeaFormData {
    name: string;
    email: string;
    title: string;
    description: string;
    category: string;
}

interface FormErrors {
    [key: string]: string;
}

export default function JoinUsPage() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const [activeTab, setActiveTab] = useState<'application' | 'idea'>('application');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        background: '',
        interest: '',
        motivation: ''
    });
    const [ideaFormData, setIdeaFormData] = useState<IdeaFormData>({
        name: '',
        email: '',
        title: '',
        description: '',
        category: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const validateApplicationForm = () => {
        const newErrors: FormErrors = {};
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.background) {
            newErrors.background = 'Please select your background';
        }
        if (!formData.interest) {
            newErrors.interest = 'Please select your area of interest';
        }
        if (!formData.motivation.trim()) {
            newErrors.motivation = 'Please tell us why you want to join';
        } else if (formData.motivation.length < 50) {
            newErrors.motivation = 'Please provide at least 50 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateIdeaForm = () => {
        const newErrors: FormErrors = {};
        if (!ideaFormData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!ideaFormData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ideaFormData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!ideaFormData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (!ideaFormData.category) {
            newErrors.category = 'Please select a category';
        }
        if (!ideaFormData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (ideaFormData.description.length < 50) {
            newErrors.description = 'Please provide at least 50 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (activeTab === 'application') {
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setIdeaFormData(prev => ({ ...prev, [name]: value }));
        }
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (activeTab === 'application' && !validateApplicationForm()) return;
        if (activeTab === 'idea' && !validateIdeaForm()) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            if (activeTab === 'application') {
                // Send application data to backend API
                await apiClient.createApplication({
                    fullName: formData.fullName,
                    email: formData.email,
                    background: formData.background,
                    areaOfInterest: formData.interest,
                    motivation: formData.motivation
                });

                setFormData({
                    fullName: '',
                    email: '',
                    background: '',
                    interest: '',
                    motivation: ''
                });
            } else {
                // Send idea data to backend API
                await fetch('http://localhost:5000/api/ideas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: ideaFormData.title,
                        description: ideaFormData.description,
                        category: ideaFormData.category,
                        name: ideaFormData.name,
                        email: ideaFormData.email,
                        implementationTimeframe: 'short-term',
                        expectedImpact: 'medium',
                        tags: []
                    })
                });

                setIdeaFormData({
                    name: '',
                    email: '',
                    title: '',
                    description: '',
                    category: ''
                });
            }

            setSubmitStatus('success');
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = `w-full px-4 py-2 rounded-lg border focus:ring-2 transition-colors duration-300 ${theme === 'light'
        ? 'border-gray-300 bg-white text-gray-900 focus:ring-blue-600 focus:border-blue-600'
        : 'border-gray-700 bg-dark-background-alt text-dark-text focus:ring-blue-500 focus:border-blue-500'
        }`;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative min-h-screen bg-gray-50 dark:bg-dark-background transition-colors duration-300"
            >
                <BackgroundAnimation theme={theme} />

                {/* Content Container */}
                <div className="relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-12"
                        >
                            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                                <span className="text-gray-900 dark:text-dark-text">Join </span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                    Ravion Lab
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-dark-text-muted max-w-3xl mx-auto">
                                Take the first step towards being part of our innovative community.
                            </p>
                        </motion.div>

                        {/* Tab Navigation */}
                        <div className="max-w-2xl mx-auto mb-8">
                            <div className="flex rounded-lg overflow-hidden bg-white dark:bg-dark-background-alt shadow-sm">
                                <button
                                    onClick={() => setActiveTab('application')}
                                    className={`flex-1 py-3 px-6 text-center font-medium transition-colors duration-300 ${activeTab === 'application'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    Join Application
                                </button>
                                <button
                                    onClick={() => setActiveTab('idea')}
                                    className={`flex-1 py-3 px-6 text-center font-medium transition-colors duration-300 ${activeTab === 'idea'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    Submit Idea
                                </button>
                            </div>
                        </div>

                        {/* Form Container */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="max-w-2xl mx-auto"
                        >
                            <form onSubmit={handleSubmit} className="rounded-xl overflow-hidden bg-white dark:bg-dark-background-alt shadow-lg">
                                <div className="p-8 space-y-6">
                                    {activeTab === 'application' ? (
                                        <>
                                            {/* Application Form Fields */}
                                            {Object.entries({
                                                fullName: {
                                                    label: 'Full Name',
                                                    type: 'text',
                                                    placeholder: 'Enter your full name'
                                                },
                                                email: {
                                                    label: 'Email',
                                                    type: 'email',
                                                    placeholder: 'Enter your email'
                                                }
                                            }).map(([name, field]) => (
                                                <div key={name}>
                                                    <label
                                                        htmlFor={name}
                                                        className="block text-sm font-medium mb-2 text-gray-700 dark:text-dark-text"
                                                    >
                                                        {field.label}
                                                    </label>
                                                    <input
                                                        type={field.type}
                                                        name={name}
                                                        id={name}
                                                        value={formData[name as keyof FormData]}
                                                        onChange={handleInputChange}
                                                        className={`${inputClasses} ${errors[name] ? 'border-red-500 dark:border-red-500' : ''}`}
                                                        placeholder={field.placeholder}
                                                    />
                                                    <AnimatePresence>
                                                        {errors[name] && (
                                                            <motion.p
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                className="text-red-500 dark:text-red-400 text-sm mt-1"
                                                            >
                                                                {errors[name]}
                                                            </motion.p>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ))}

                                            {/* Background and Interest Selects */}
                                            {Object.entries({
                                                background: {
                                                    label: 'Background',
                                                    options: [
                                                        { value: '', label: 'Select your background' },
                                                        { value: 'Student', label: 'Student' },
                                                        { value: 'Professional', label: 'Professional' },
                                                        { value: 'Researcher', label: 'Researcher' },
                                                        { value: 'Entrepreneur', label: 'Entrepreneur' },
                                                        { value: 'Other', label: 'Other' }
                                                    ]
                                                },
                                                interest: {
                                                    label: 'Area of Interest',
                                                    options: [
                                                        { value: '', label: 'Select your area of interest' },
                                                        { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
                                                        { value: 'Robotics', label: 'Robotics' },
                                                        { value: 'Quantum Computing', label: 'Quantum Computing' },
                                                        { value: 'Machine Learning', label: 'Machine Learning' },
                                                        { value: 'Healthcare AI', label: 'Healthcare AI' },
                                                        { value: 'Sustainability', label: 'Sustainability' }
                                                    ]
                                                }
                                            }).map(([name, field]) => (
                                                <div key={name}>
                                                    <label
                                                        htmlFor={name}
                                                        className="block text-sm font-medium mb-2 text-gray-700 dark:text-dark-text"
                                                    >
                                                        {field.label}
                                                    </label>
                                                    <select
                                                        name={name}
                                                        id={name}
                                                        value={formData[name as keyof FormData]}
                                                        onChange={handleInputChange}
                                                        className={`${inputClasses} ${errors[name] ? 'border-red-500 dark:border-red-500' : ''}`}
                                                    >
                                                        {field.options.map(option => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <AnimatePresence>
                                                        {errors[name] && (
                                                            <motion.p
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                className="text-red-500 dark:text-red-400 text-sm mt-1"
                                                            >
                                                                {errors[name]}
                                                            </motion.p>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ))}

                                            {/* Motivation Text Area */}
                                            <div>
                                                <label
                                                    htmlFor="motivation"
                                                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-dark-text"
                                                >
                                                    Why do you want to join? (minimum 50 characters)
                                                </label>
                                                <textarea
                                                    name="motivation"
                                                    id="motivation"
                                                    value={formData.motivation}
                                                    onChange={handleInputChange}
                                                    rows={4}
                                                    className={`${inputClasses} ${errors.motivation ? 'border-red-500 dark:border-red-500' : ''}`}
                                                    placeholder="Tell us about your motivation to join Ravion Lab..."
                                                />
                                                <AnimatePresence>
                                                    {errors.motivation && (
                                                        <motion.p
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="text-red-500 dark:text-red-400 text-sm mt-1"
                                                        >
                                                            {errors.motivation}
                                                        </motion.p>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Idea Submission Form Fields */}
                                            {Object.entries({
                                                name: {
                                                    label: 'Your Name',
                                                    type: 'text',
                                                    placeholder: 'Enter your name'
                                                },
                                                email: {
                                                    label: 'Email',
                                                    type: 'email',
                                                    placeholder: 'Enter your email'
                                                },
                                                title: {
                                                    label: 'Idea Title',
                                                    type: 'text',
                                                    placeholder: 'Enter your idea title'
                                                }
                                            }).map(([name, field]) => (
                                                <div key={name}>
                                                    <label
                                                        htmlFor={name}
                                                        className="block text-sm font-medium mb-2 text-gray-700 dark:text-dark-text"
                                                    >
                                                        {field.label}
                                                    </label>
                                                    <input
                                                        type={field.type}
                                                        name={name}
                                                        id={name}
                                                        value={ideaFormData[name as keyof IdeaFormData]}
                                                        onChange={handleInputChange}
                                                        className={`${inputClasses} ${errors[name] ? 'border-red-500 dark:border-red-500' : ''}`}
                                                        placeholder={field.placeholder}
                                                    />
                                                    <AnimatePresence>
                                                        {errors[name] && (
                                                            <motion.p
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                className="text-red-500 dark:text-red-400 text-sm mt-1"
                                                            >
                                                                {errors[name]}
                                                            </motion.p>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ))}

                                            {/* Category Select */}
                                            <div>
                                                <label
                                                    htmlFor="category"
                                                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-dark-text"
                                                >
                                                    Category
                                                </label>
                                                <select
                                                    name="category"
                                                    id="category"
                                                    value={ideaFormData.category}
                                                    onChange={handleInputChange}
                                                    className={`${inputClasses} ${errors.category ? 'border-red-500 dark:border-red-500' : ''}`}
                                                >
                                                    <option value="">Select a category</option>
                                                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                                                    <option value="Machine Learning">Machine Learning</option>
                                                    <option value="Robotics">Robotics</option>
                                                    <option value="Healthcare">Healthcare</option>
                                                    <option value="Sustainability">Sustainability</option>
                                                    <option value="Education">Education</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <AnimatePresence>
                                                    {errors.category && (
                                                        <motion.p
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="text-red-500 dark:text-red-400 text-sm mt-1"
                                                        >
                                                            {errors.category}
                                                        </motion.p>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Description Text Area */}
                                            <div>
                                                <label
                                                    htmlFor="description"
                                                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-dark-text"
                                                >
                                                    Description (minimum 50 characters)
                                                </label>
                                                <textarea
                                                    name="description"
                                                    id="description"
                                                    value={ideaFormData.description}
                                                    onChange={handleInputChange}
                                                    rows={4}
                                                    className={`${inputClasses} ${errors.description ? 'border-red-500 dark:border-red-500' : ''}`}
                                                    placeholder="Describe your idea in detail..."
                                                />
                                                <AnimatePresence>
                                                    {errors.description && (
                                                        <motion.p
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="text-red-500 dark:text-red-400 text-sm mt-1"
                                                        >
                                                            {errors.description}
                                                        </motion.p>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </>
                                    )}

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                            } bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500`}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Submitting...
                                            </span>
                                        ) : (
                                            activeTab === 'application' ? 'Submit Application' : 'Submit Idea'
                                        )}
                                    </motion.button>

                                    {/* Status Messages */}
                                    <AnimatePresence>
                                        {submitStatus !== 'idle' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className={`text-center p-4 rounded-lg ${submitStatus === 'success'
                                                    ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800'
                                                    : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
                                                    }`}
                                            >
                                                {submitStatus === 'success'
                                                    ? activeTab === 'application'
                                                        ? 'Application submitted successfully! We\'ll be in touch soon.'
                                                        : 'Thank you! Your idea has been submitted successfully.'
                                                    : activeTab === 'application'
                                                        ? 'There was an error submitting your application. Please try again.'
                                                        : 'There was an error submitting your idea. Please try again.'}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
} 