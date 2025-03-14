import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SignInButton, SignOutButton, useUser } from '@clerk/clerk-react';

const Button = styled(motion.button)`
  padding: 0.875rem 2rem;
  background: var(--primary);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-all);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: var(--gray-400);
    cursor: not-allowed;
    transform: none;
  }

  &.loading {
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      animation: loading 1.5s infinite;
    }
  }

  @keyframes loading {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(100%);
    }
  }
`;

const StyledSignInButton = styled(SignInButton)`
  button {
    padding: 0.875rem 2rem;
    background: var(--primary);
    color: var(--white);
    border: none;
    border-radius: var(--border-radius);
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition-all);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
      background: var(--primary-dark);
      transform: translateY(-2px);
    }
  }
`;

const StyledSignOutButton = styled(SignOutButton)`
  button {
    padding: 0.875rem 2rem;
    background: var(--primary);
    color: var(--white);
    border: none;
    border-radius: var(--border-radius);
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition-all);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
      background: var(--primary-dark);
      transform: translateY(-2px);
    }
  }
`;

export const LoginButton = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <Button
        className="loading"
        disabled
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <span>•••</span>
      </Button>
    );
  }

  if (isSignedIn) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <StyledSignOutButton />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <StyledSignInButton mode="modal" />
    </motion.div>
  );
};

export default LoginButton;
