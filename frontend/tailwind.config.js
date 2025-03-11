/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                grotesk: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                // Light mode colors
                primary: {
                    DEFAULT: '#002B5B',
                    light: '#1a3f6f',
                },
                background: {
                    DEFAULT: '#F8F9FA',
                    alt: '#FFFFFF',
                },
                // Dark mode specific colors
                dark: {
                    background: {
                        DEFAULT: '#0F172A',
                        alt: '#1E293B',
                    },
                    text: {
                        DEFAULT: '#F8FAFC',
                        muted: '#94A3B8',
                    },
                },
            },
            animation: {
                blob: "blob 7s infinite",
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.7s ease-out',
                'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                blob: {
                    "0%": {
                        transform: "translate(0px, 0px) scale(1)",
                    },
                    "33%": {
                        transform: "translate(30px, -50px) scale(1.1)",
                    },
                    "66%": {
                        transform: "translate(-20px, 20px) scale(0.9)",
                    },
                    "100%": {
                        transform: "translate(0px, 0px) scale(1)",
                    },
                },
            },
        },
    },
    plugins: [],
} 