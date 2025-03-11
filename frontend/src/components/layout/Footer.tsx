import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SocialMediaLinks from '@/components/SocialMediaLinks';

const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Real Ideas', href: '/real-ideas' },
    { name: 'Join Us', href: '/join-us' }
];

const navigation = {
    main: [
        { name: 'About', href: '/about' },
        { name: 'Projects', href: '/projects' },
        { name: 'Join Us', href: '/join-us' },
        { name: 'Contact', href: '/contact' }
    ],
    // ... rest of the code ...
}

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-dark-background border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo and Description */}
                    <div className="col-span-1">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logo.svg"
                                alt="Ravion Lab Logo"
                                width={40}
                                height={40}
                                className="dark:invert"
                            />
                            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                                Ravion Lab
                            </span>
                        </Link>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">
                            Empowering the future through innovative technology solutions and collaborative development.
                        </p>
                        <div className="mt-4">
                            <p className="text-gray-600 dark:text-gray-400">
                                <a
                                    href="mailto:ravionlab.tech@gmail.com"
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    ravionlab.tech@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect With Us */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Connect With Us
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Follow us on social media to stay updated with our latest projects and announcements.
                        </p>
                        <SocialMediaLinks showAll={true} className="justify-start gap-4" />
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        © {new Date().getFullYear()} Ravion Lab. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
} 