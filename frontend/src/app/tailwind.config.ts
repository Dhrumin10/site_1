import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#002B5B',  // Deep navy blue from the heading
                    light: '#1a3f6f',    // Slightly lighter for hover
                    dark: '#001f42',     // Darker for active states
                },
                text: {
                    DEFAULT: '#4A5568',  // Softer color for body text
                    light: '#718096',    // Even softer for secondary text
                },
                background: {
                    DEFAULT: '#FFFFFF',   // Pure white
                    alt: '#F8F9FA',      // Very light gray from image
                    subtle: '#F3F4F6',   // Slightly darker for hover states
                }
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
            },
            maxWidth: {
                '8xl': '88rem',
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'fade-in-up': {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                blob: {
                    '0%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                    '33%': {
                        transform: 'translate(30px, -50px) scale(1.1)',
                    },
                    '66%': {
                        transform: 'translate(-20px, 20px) scale(0.9)',
                    },
                    '100%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                }
            },
            animation: {
                'fade-in': 'fade-in 0.5s ease-out',
                'slide-up': 'slide-up 0.7s ease-out',
                'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
                'blob': 'blob 7s infinite',
            },
            transitionDelay: {
                '2000': '2000ms',
                '4000': '4000ms',
            }
        },
    },
    plugins: [],
};

export default config; 