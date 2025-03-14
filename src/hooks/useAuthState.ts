import { useUser, useClerk } from '@clerk/clerk-react';

export const useAuthState = () => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const login = () => {
    // Login is handled by Clerk's SignInButton component
    return;
  };

  const handleLogout = () => {
    signOut();
  };

  return {
    isAuthenticated: isSignedIn,
    isLoading: false,
    user,
    login,
    logout: handleLogout,
  };
};
