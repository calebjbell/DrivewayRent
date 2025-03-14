import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const HeaderWrapper = styled.header<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: var(--z-sticky);
  padding: ${props => props.isScrolled ? '1rem 0' : '1.5rem 0'};
  background: ${props => props.isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.isScrolled ? 'var(--shadow)' : 'none'};
  transition: var(--transition-all);
`;

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  
  svg {
    width: 32px;
    height: 32px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 3rem;
  
  @media (max-width: 992px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  font-weight: 500;
  color: ${props => props.$active ? 'var(--primary)' : 'var(--text-secondary)'};
  text-decoration: none;
  transition: var(--transition-colors);
  
  &:hover {
    color: var(--primary);
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LoginButton = styled(Link)`
  font-weight: 600;
  color: var(--primary);
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius-full);
  transition: var(--transition-all);
  text-decoration: none;
  
  &:hover {
    background: rgba(139, 69, 19, 0.05);
  }
`;

const SignUpButton = styled(Link)`
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius-full);
  transition: var(--transition-all);
  box-shadow: var(--shadow-md);
  text-decoration: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
  transition: var(--transition-all);
  
  @media (max-width: 992px) {
    display: flex;
  }
  
  &:hover {
    background: var(--gray-100);
  }
  
  svg {
    width: 24px;
    height: 24px;
    color: var(--text-secondary);
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 300px;
  height: 100vh;
  background: var(--bg-primary);
  padding: 2rem;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: var(--z-drawer);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MobileNavLink = styled(Link)`
  font-weight: 500;
  color: var(--text-secondary);
  padding: 0.75rem;
  border-radius: var(--border-radius);
  transition: var(--transition-all);
  text-decoration: none;
  
  &:hover {
    background: var(--gray-100);
    color: var(--primary);
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: var(--z-drawer);
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <HeaderWrapper isScrolled={isScrolled}>
        <HeaderContainer>
          <Logo to="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            DrivewayRent
          </Logo>
          
          <Nav>
            <NavLink to="/" $active={location.pathname === '/'}>
              Home
            </NavLink>
            <NavLink to="/features" $active={location.pathname === '/features'}>
              Features
            </NavLink>
            <NavLink to="/dashboard" $active={location.pathname === '/dashboard'}>
              Explore
            </NavLink>
          </Nav>

          <NavButtons>
            <LoginButton to="/login">Log In</LoginButton>
            <SignUpButton to="/signup">Sign Up</SignUpButton>
            <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </MobileMenuButton>
          </NavButtons>
        </HeaderContainer>
      </HeaderWrapper>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileMenu
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <MobileNav>
                <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </MobileNavLink>
                <MobileNavLink to="/features" onClick={() => setIsMobileMenuOpen(false)}>
                  Features
                </MobileNavLink>
                <MobileNavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  Explore
                </MobileNavLink>
                <MobileNavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  Log In
                </MobileNavLink>
                <MobileNavLink to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign Up
                </MobileNavLink>
              </MobileNav>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
