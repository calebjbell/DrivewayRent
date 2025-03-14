import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
  position: relative;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  padding-top: 80px;
  overflow-x: hidden;
`;

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
