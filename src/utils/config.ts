/**
 * Configuration file for the DrivewayRent platform
 * Contains animation settings and other global constants
 */

// Animation configuration
export const animationConfig = {
  // Enable/disable animations globally
  enabled: true,
  
  // Feature flags for specific animation types
  features: {
    pageTransitions: true,
    scrollAnimations: true,
    hoverEffects: true,
    loadingStates: true,
    notifications: true,
  },
  
  // Performance settings
  performance: {
    reducedMotion: false, // Will be set to true if user has reduced motion preferences
    lowPowerMode: false, // Will be set to true on low-end devices or battery saving mode
  },
  
  // Timing settings (in seconds)
  timing: {
    fast: 0.2,
    medium: 0.3,
    slow: 0.5,
    extraSlow: 0.8,
  },
  
  // Easing functions
  easing: {
    easeOut: [0.16, 1, 0.3, 1],
    easeIn: [0.67, 0, 0.83, 0],
    easeInOut: [0.65, 0, 0.35, 1],
    spring: [0.34, 1.56, 0.64, 1],
  },
  
  // Intersection observer default settings
  intersectionObserver: {
    threshold: 0.1,
    rootMargin: "0px",
    once: true,
  },
};

// Brand configuration
export const brandConfig = {
  colors: {
    primary: "#3498db",
    secondary: "#2ecc71",
    accent: "#f39c12",
    dark: "#2c3e50",
    light: "#ecf0f1",
    danger: "#e74c3c",
    success: "#27ae60",
    text: "#333333",
    textLight: "#7f8c8d",
    background: "#ffffff",
    shadow: "rgba(0, 0, 0, 0.1)",
  },
  
  fonts: {
    primary: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
    heading: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
    monospace: "'Roboto Mono', monospace",
  },
  
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "12px",
    round: "50%",
  },
  
  shadows: {
    small: "0 2px 5px rgba(0, 0, 0, 0.1)",
    medium: "0 5px 15px rgba(0, 0, 0, 0.1)",
    large: "0 10px 25px rgba(0, 0, 0, 0.1)",
  },
};

// App configuration
export const appConfig = {
  name: "DrivewayRent",
  version: "1.0.0",
  description: "Rent your driveway, earn extra income",
  
  // API endpoints would go here in a real application
  api: {
    baseUrl: "/api",
    timeout: 10000, // 10 seconds
  },
  
  // Feature flags
  features: {
    hostDashboard: true,
    driverDashboard: true,
    messaging: true,
    payments: true,
    reviews: true,
    notifications: true,
  },
  
  // Social media links
  social: {
    facebook: "https://facebook.com/drivewayrent",
    twitter: "https://twitter.com/drivewayrent",
    instagram: "https://instagram.com/drivewayrent",
    linkedin: "https://linkedin.com/company/drivewayrent",
  },
};

// Export default configuration
export default {
  animation: animationConfig,
  brand: brandConfig,
  app: appConfig,
};
