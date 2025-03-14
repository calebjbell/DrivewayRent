import { Variants } from 'framer-motion';

// Animation variants for consistent animations across the app
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

export const scaleIn: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 }
};

export const slideInRight = {
  hidden: { 
    opacity: 0, 
    x: 20 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export const buttonHover = {
  scale: 1.02,
  transition: {
    duration: 0.2,
    ease: "easeInOut"
  }
};

export const cardHover = {
  y: -4,
  transition: {
    duration: 0.2,
    ease: "easeInOut"
  }
};

// Stagger children animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Loading animation
export const loadingSpinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: "linear",
      repeat: Infinity
    }
  }
};

// Notification slide animation
export const notificationSlide = {
  hidden: { 
    opacity: 0, 
    y: -20,
    x: "-50%" 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    x: "-50%",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    x: "-50%",
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

export const slideIn: Variants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 }
};
