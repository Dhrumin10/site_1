import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ravion Lab - Innovation in AI & Robotics',
    description: 'Join Ravion Lab, a pioneering community focused on AI, robotics, and innovative technology solutions. Launching soon on Venom blockchain.',
    keywords: 'AI, Robotics, Innovation, Technology, Venom, Blockchain, Community, Projects',
    icons: {
        icon: [
            { url: '/favicon.svg', type: 'image/svg+xml' },
        ],
    },
    openGraph: {
        title: 'Ravion Lab - Innovation in AI & Robotics',
        description: 'Join our community of innovators working on cutting-edge AI and robotics projects.',
        url: 'https://ravionlab.com',
        siteName: 'Ravion Lab',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Ravion Lab',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ravion Lab - Innovation in AI & Robotics',
        description: 'Join our community of innovators working on cutting-edge AI and robotics projects.',
        images: ['/twitter-image.jpg'],
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