/**
 * Animation utility for consistent animations across the DrivewayRent platform
 */

// Animation timing constants
export const timing = {
  fast: 0.2,
  medium: 0.3,
  slow: 0.5,
  extraSlow: 0.8,
};

// Easing functions
export const easing = {
  easeOut: [0.16, 1, 0.3, 1],
  easeIn: [0.67, 0, 0.83, 0],
  easeInOut: [0.65, 0, 0.35, 1],
  spring: [0.34, 1.56, 0.64, 1],
};

// Reusable animation variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: timing.medium,
      ease: easing.easeOut
    }
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: timing.medium,
      ease: easing.easeOut
    }
  },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: timing.medium,
      ease: easing.easeOut
    }
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: timing.medium,
      ease: easing.easeOut
    }
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: timing.medium,
      ease: easing.easeOut
    }
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: timing.medium,
      ease: easing.spring
    }
  },
};

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  },
};

// Button animations
export const buttonHover = {
  scale: 1.05,
  transition: { 
    duration: timing.fast,
    ease: easing.easeInOut
  }
};

export const buttonTap = {
  scale: 0.95,
  transition: { 
    duration: timing.fast,
    ease: easing.easeInOut
  }
};

// Card animations
export const cardHover = {
  y: -10,
  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
  transition: { 
    duration: timing.medium,
    ease: easing.easeInOut
  }
};

// Scroll-based animations
export const scrollFadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: timing.slow,
      ease: easing.easeOut
    }
  },
};

// Loading animations
export const loadingPulse = {
  scale: [1, 1.05, 1],
  opacity: [0.7, 1, 0.7],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: easing.easeInOut
  }
};

export const loadingSpin = {
  rotate: 360,
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: "linear"
  }
};

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: timing.medium,
      ease: easing.easeOut
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: timing.fast,
      ease: easing.easeIn
    }
  }
};

// Notification animations
export const notificationSlideIn = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      duration: timing.medium,
      ease: easing.spring
    }
  },
  exit: { 
    x: 100, 
    opacity: 0,
    transition: { 
      duration: timing.fast,
      ease: easing.easeIn
    }
  }
};

// Utility function to create custom stagger animations
export const createStaggerAnimation = (delay = 0.1, childDelay = 0.2) => ({
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: delay,
      delayChildren: childDelay,
    }
  },
});

// Intersection observer utility for scroll-based animations
export const useScrollAnimation = (
  threshold = 0.1,
  once = true,
  rootMargin = "0px"
) => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: { once, threshold, rootMargin }
});
