import { Metadata } from 'next';

// Use localhost for development, production URL for production
const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://ravion-lab.com'
    : 'http://localhost:3000';

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: 'Ravion Lab - Building the Future with AI & Robotics',
    description: 'Transform innovative ideas into real-world AI & robotics solutions that shape tomorrow\'s technology landscape.',
    keywords: 'AI, Robotics, Innovation, Technology, Venom, Blockchain, Community, Projects',
    icons: {
        icon: [
            { url: '/favicon.svg', type: 'image/svg+xml' },
        ],
    },
    openGraph: {
        title: 'Ravion Lab - Building the Future with AI & Robotics',
        description: 'Transform innovative ideas into real-world AI & robotics solutions that shape tomorrow\'s technology landscape.',
        url: baseUrl,
        siteName: 'Ravion Lab',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Ravion Lab - Building the Future with AI & Robotics',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ravion Lab - Building the Future with AI & Robotics',
        description: 'Transform innovative ideas into real-world AI & robotics solutions that shape tomorrow\'s technology landscape.',
        images: ['/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
    },
}; 