'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import DarkModeToggle from '../DarkModeToggle';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    const navLinks = [
        { href: '/about', label: 'About Us' },
        { href: '/projects', label: 'Projects' },
        { href: '/real-ideas', label: 'Real Ideas' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-dark-background transition-all duration-300 ${scrolled ? 'shadow-lg' : ''
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <div className="w-10 h-10 relative">
                            <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-300">
                                {/* Main cube structure */}
                                <g>
                                    {/* Outer cube */}
                                    <path d="M4 14L16 6L28 14L16 22L4 14Z"
                                        fill="url(#gradientTop)"
                                        stroke="currentColor"
                                        strokeWidth="0.75" />
                                    <path d="M28 14L16 22V26L28 18V14Z"
                                        fill="url(#gradientRight)"
                                        stroke="currentColor"
                                        strokeWidth="0.75" />
                                    <path d="M4 14L16 22V26L4 18V14Z"
                                        fill="url(#gradientLeft)"
                                        stroke="currentColor"
                                        strokeWidth="0.75" />

                                    {/* Center cube */}
                                    <path d="M13 17L16 15L19 17L16 19L13 17Z"
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeWidth="0.25">
                                        <animate attributeName="fill-opacity"
                                            values="1;0.7;1"
                                            dur="3s"
                                            repeatCount="indefinite" />
                                    </path>
                                </g>

                                {/* Definitions */}
                                <defs>
                                    <linearGradient id="gradientTop" x1="4" y1="6" x2="28" y2="22" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" className="text-primary" stopColor="currentColor" />
                                        <stop offset="100%" className="text-primary-light" stopColor="currentColor" />
                                    </linearGradient>

                                    <linearGradient id="gradientRight" x1="16" y1="14" x2="28" y2="26" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" className="text-primary-light" stopColor="currentColor" />
                                        <stop offset="100%" className="text-primary" stopColor="currentColor" />
                                    </linearGradient>

                                    <linearGradient id="gradientLeft" x1="4" y1="14" x2="16" y2="26" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" className="text-primary" stopColor="currentColor" />
                                        <stop offset="100%" className="text-primary-light" stopColor="currentColor" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <span className="ml-3 text-xl font-bold text-gray-900 dark:text-dark-text">
                            Ravion Lab
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-gray-600 dark:text-dark-text-muted hover:text-gray-900 dark:hover:text-dark-text transition-colors duration-300 ${pathname === link.href ? 'font-semibold text-gray-900 dark:text-dark-text' : ''
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <DarkModeToggle />
                        <Link
                            href="/join-us"
                            className="group relative inline-flex items-center justify-center px-4 py-2 font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg overflow-hidden transition-all duration-300"
                        >
                            <span className="relative z-10">Join Us</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center space-x-4 md:hidden">
                        <DarkModeToggle />
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 dark:text-dark-text-muted hover:text-gray-900 dark:hover:text-dark-text"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white dark:bg-dark-background border-t border-gray-100 dark:border-dark-background-alt"
                    >
                        <div className="px-4 py-4 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block text-gray-600 dark:text-dark-text-muted hover:text-gray-900 dark:hover:text-dark-text transition-colors duration-300 ${pathname === link.href ? 'font-semibold text-gray-900 dark:text-dark-text' : ''
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/join-us"
                                className="block px-4 py-2 text-center font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300"
                            >
                                Join Us
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
} 