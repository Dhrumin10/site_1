import { Variants } from 'framer-motion';

// Smooth page transitions
export const pageTransition = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: {
        duration: 0.4,
        ease: [0.645, 0.045, 0.355, 1.0], // Cubic bezier for smooth motion
    }
};

// Stagger children animations
export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
            ease: [0.645, 0.045, 0.355, 1.0],
        }
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
            ease: [0.645, 0.045, 0.355, 1.0],
        }
    }
};

// Individual item animations
export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.645, 0.045, 0.355, 1.0],
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            ease: [0.645, 0.045, 0.355, 1.0],
        }
    }
};

// Fade up animation
export const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.645, 0.045, 0.355, 1.0],
        }
    }
};

// Scale animation for interactive elements
export const scaleVariants = {
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.3,
            ease: [0.645, 0.045, 0.355, 1.0],
        }
    },
    tap: {
        scale: 0.95,
        transition: {
            duration: 0.15,
            ease: [0.645, 0.045, 0.355, 1.0],
        }
    }
}; 