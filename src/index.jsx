import '@fontsource/fredoka/400.css';
import '@fontsource/fredoka/600.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';
import './styles/tokens.css';
import './styles/global.css';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import ErrorBoundary from './app/ErrorBoundary';

// Global handlers so async/runtime errors surface in the console too.
window.addEventListener('error', (e) => {
  console.error('[Star Board] Uncaught error:', e.error || e.message);
});
window.addEventListener('unhandledrejection', (e) => {
  console.error('[Star Board] Unhandled promise rejection:', e.reason);
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  });
}

const root = createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
