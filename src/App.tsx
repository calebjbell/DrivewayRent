import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/theme';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Features from './pages/features/Features';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ClerkProvider } from './components/auth/ClerkProvider';

function App() {
  return (
    <ClerkProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <AnimatePresence mode="wait">
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/features" element={<Features />} />
                <Route path="/callback" element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </AnimatePresence>
        </Router>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default App;
