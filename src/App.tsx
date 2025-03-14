import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/theme';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Features from './pages/features/Features';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/features" element={<Layout><Features /></Layout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
