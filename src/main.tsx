import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ThemeToggle from './components/ThemeToggle';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div id="theme-wrapper" className="min-h-screen bg-background text-foreground transition-colors">
      <ThemeToggle />
      <App />
    </div>
  </React.StrictMode>
);