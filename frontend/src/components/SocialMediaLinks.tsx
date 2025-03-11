import React from 'react';
import { motion } from 'framer-motion';
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaYoutube,
    FaMedium,
    FaDev,
    FaReddit,
    FaInstagram
} from 'react-icons/fa';

const socialLinks = [
    {
        name: 'GitHub',
        icon: <FaGithub />,
        url: 'https://github.com/ravionlab',
        primary: true,
    },
    {
        name: 'LinkedIn',
        icon: <FaLinkedin />,
        url: 'https://www.linkedin.com/company/ravion-lab/about/',
        primary: true,
    },
    {
        name: 'Twitter',
        icon: <FaTwitter />,
        url: 'https://x.com/Ravionlab',
        primary: true,
    },
    {
        name: 'YouTube',
        icon: <FaYoutube />,
        url: 'https://www.youtube.com/@RavionLab',
        primary: true,
    },
    {
        name: 'Medium',
        icon: <FaMedium />,
        url: 'https://medium.com/@ravionlab.tech',
        primary: false,
    },
    {
        name: 'Dev.to',
        icon: <FaDev />,
        url: 'https://dev.to/ravionlab_59442b7cc022fa3',
        primary: false,
    },
    {
        name: 'Reddit',
        icon: <FaReddit />,
        url: 'https://www.reddit.com/user/Glad_Fuel_8002/',
        primary: false,
    },
    {
        name: 'Instagram',
        icon: <FaInstagram />,
        url: 'https://www.instagram.com/ravionlab',
        primary: false,
    },
];

interface SocialMediaLinksProps {
    showAll?: boolean;
    className?: string;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({
    showAll = false,
    className = ''
}) => {
    const displayLinks = showAll ? socialLinks : socialLinks.filter(link => link.primary);

    return (
        <div className={`flex flex-wrap gap-4 ${className}`}>
            {displayLinks.map((link) => (
                <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={`Follow us on ${link.name}`}
                >
                    <span className="text-xl">{link.icon}</span>
                    <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {link.name}
                    </span>
                </motion.a>
            ))}
        </div>
    );
};

export default SocialMediaLinks; 