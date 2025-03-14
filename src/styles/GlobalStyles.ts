import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Color System - Warm, vintage palette */
    --primary: #8B4513;      /* Saddle Brown */
    --primary-dark: #654321; /* Dark Brown */
    --primary-light: #DEB887; /* Burlywood */
    --secondary: #2F4F4F;    /* Dark Slate Gray */
    --accent: #CD853F;       /* Peru - warm accent */
    
    /* Neutral Colors - Earthy tones */
    --dark: #2C1810;
    --gray-900: #3C2A21;
    --gray-800: #5C4033;
    --gray-700: #7B5544;
    --gray-600: #967259;
    --gray-500: #B08968;
    --gray-400: #C4A484;
    --gray-300: #D4B499;
    --gray-200: #E5C9B3;
    --gray-100: #F5E6D3;
    --white: #FFF8F0;        /* Warm white */
    
    /* Text Colors */
    --text-primary: var(--gray-900);
    --text-secondary: var(--gray-700);
    --text-light: var(--gray-600);
    
    /* Background Colors */
    --bg-primary: var(--white);
    --bg-secondary: var(--gray-100);
    --bg-tertiary: var(--gray-200);
    
    /* Border Colors */
    --border-light: var(--gray-200);
    --border-medium: var(--gray-300);
    
    /* Border Radius - Softer edges */
    --border-radius-sm: 0.25rem;
    --border-radius: 0.375rem;
    --border-radius-md: 0.5rem;
    --border-radius-lg: 0.75rem;
    --border-radius-xl: 1rem;
    --border-radius-2xl: 1.25rem;
    --border-radius-full: 9999px;
    
    /* Shadows - Softer, vintage feel */
    --shadow-sm: 0 2px 4px rgba(44, 24, 16, 0.05);
    --shadow: 0 4px 6px rgba(44, 24, 16, 0.07);
    --shadow-md: 0 6px 12px rgba(44, 24, 16, 0.1);
    --shadow-lg: 0 12px 24px rgba(44, 24, 16, 0.12);
    --shadow-xl: 0 20px 32px rgba(44, 24, 16, 0.15);
    --shadow-inner: inset 0 2px 4px rgba(44, 24, 16, 0.05);
    
    /* Typography - Classic, refined fonts */
    --font-primary: 'Lora', Georgia, serif;
    --font-heading: 'Playfair Display', var(--font-primary);
    
    /* Transitions - Slightly slower for elegance */
    --transition-all: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-transform: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-opacity: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-colors: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.4s cubic-bezier(0.4, 0, 0.2, 1), fill 0.4s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Z-index */
    --z-negative: -1;
    --z-elevate: 1;
    --z-sticky: 100;
    --z-drawer: 200;
    --z-modal: 300;
    --z-popover: 400;
    --z-maximum: 999;
  }

  /* Reset & Base Styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-primary);
    color: var(--text-primary);
    background-color: var(--bg-primary);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
    font-family: var(--font-heading);
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.3;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--gray-900);
  }

  p {
    margin-bottom: 1.5rem;
    color: var(--text-secondary);
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: var(--transition-colors);
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--font-primary);
  }

  /* Utility Classes */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    
    @media (max-width: 768px) {
      padding: 0 1.5rem;
    }
  }

  .section {
    padding: 6rem 0;
    
    @media (max-width: 768px) {
      padding: 4rem 0;
    }
  }

  .text-gradient {
    background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;

export default GlobalStyles;
