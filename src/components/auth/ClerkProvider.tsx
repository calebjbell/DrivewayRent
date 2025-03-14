import { ClerkProvider as BaseClerkProvider } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const LoadingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-overlay);
`;

const LoadingSpinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-light);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingScreen = () => (
  <LoadingOverlay
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <LoadingSpinner />
  </LoadingOverlay>
);

export const ClerkProvider = ({ children }: { children: React.ReactNode }) => {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!clerkPubKey) {
    throw new Error('Missing Clerk Publishable Key');
  }

  return (
    <BaseClerkProvider
      publishableKey={clerkPubKey}
      appearance={{
        elements: {
          card: 'bg-white shadow-xl rounded-lg p-6',
          headerTitle: 'text-2xl font-bold text-primary',
          headerSubtitle: 'text-gray-600',
          socialButtonsBlockButton: 'border-2 hover:border-primary transition-all duration-200',
          formButtonPrimary: 'bg-primary hover:bg-primary-dark transition-all duration-200',
          footerActionLink: 'text-primary hover:text-primary-dark',
        },
      }}
    >
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </BaseClerkProvider>
  );
};
