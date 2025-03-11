'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-background border-b border-primary/10 z-50">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-22">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center group">
                                <div className="w-12 h-12 relative">
                                    <Image
                                        src="/logo.svg"
                                        alt="Ravion Lab Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="ml-4 text-xl font-bold text-primary">
                                    Ravion Lab
                                </span>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center sm:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-primary/60 hover:text-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isMobileMenuOpen ? (
                                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:space-x-8">
                            <Link
                                href="/about"
                                className="text-primary/80 hover:text-primary text-base font-medium transition-colors"
                            >
                                About Us
                            </Link>
                            <Link
                                href="/projects"
                                className="text-primary/80 hover:text-primary text-base font-medium transition-colors"
                            >
                                Projects
                            </Link>
                            <Link
                                href="/join-us"
                                className="inline-flex items-center justify-center px-6 py-2.5 text-base font-medium text-background bg-primary rounded-md hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                Join Us
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-b border-primary/10">
                        <Link
                            href="/about"
                            className="block px-3 py-2 rounded-md text-base font-medium text-primary/80 hover:text-primary hover:bg-primary/5"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/projects"
                            className="block px-3 py-2 rounded-md text-base font-medium text-primary/80 hover:text-primary hover:bg-primary/5"
                        >
                            Projects
                        </Link>
                        <Link
                            href="/join-us"
                            className="block px-3 py-2 rounded-md text-base font-medium text-background bg-primary hover:bg-primary-dark"
                        >
                            Join Us
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <main className="flex-grow pt-22 bg-background">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-primary py-18">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 relative">
                                    <Image
                                        src="/logo.svg"
                                        alt="Ravion Lab Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="ml-4 text-xl font-bold text-background">
                                    Ravion Lab
                                </span>
                            </div>
                            <p className="text-lg font-medium text-background/90">
                                Building innovative solutions with modern technology.
                            </p>
                            <p className="text-base text-background/70">
                                Join us in shaping the future through collaborative innovation and cutting-edge technology.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-background mb-6">
                                    Quick Links
                                </h3>
                                <ul className="space-y-4">
                                    <li>
                                        <Link
                                            href="/"
                                            className="text-background/70 hover:text-background text-base transition-colors"
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/about"
                                            className="text-background/70 hover:text-background text-base transition-colors"
                                        >
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/projects"
                                            className="text-background/70 hover:text-background text-base transition-colors"
                                        >
                                            Projects
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/contact"
                                            className="text-background/70 hover:text-background text-base transition-colors"
                                        >
                                            Contact
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/join-us"
                                            className="text-background/70 hover:text-background text-base transition-colors"
                                        >
                                            Join Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-background mb-6">
                                    Connect With Us
                                </h3>
                                <p className="text-background/70 mb-6">
                                    Follow us on social media to stay updated with our latest projects and announcements.
                                </p>
                                <div className="flex space-x-4">
                                    <a
                                        href="https://github.com/ravion-lab"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-background/70 hover:text-background transition-colors p-2 rounded-full hover:bg-background/10"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://linkedin.com/company/ravion-lab"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-background/70 hover:text-background transition-colors p-2 rounded-full hover:bg-background/10"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://twitter.com/ravion_lab"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-background/70 hover:text-background transition-colors p-2 rounded-full hover:bg-background/10"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://youtube.com/@ravion_lab"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-background/70 hover:text-background transition-colors p-2 rounded-full hover:bg-background/10"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-background/10">
                        <p className="text-center text-background/60 text-sm">
                            © {new Date().getFullYear()} Ravion Lab. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
} 