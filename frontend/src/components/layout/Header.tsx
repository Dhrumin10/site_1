import Link from 'next/link';
import Image from 'next/image';

const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Real Ideas', href: '/real-ideas' },
    { name: 'Join Us', href: '/join-us' }
];

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-background/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logo.svg"
                                alt="Ravion Lab"
                                width={48}
                                height={48}
                                className="dark:invert"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Rest of the navigation code */}
                </div>
            </nav>
        </header>
    );
} 