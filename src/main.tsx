import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';
import App from './App';
import { ThemeProvider } from './hooks/useTheme';

// Add axe-core in development
if (process.env.NODE_ENV !== 'production') {
  import('axe-core').then(axe => {
    axe.default.run().then(results => {
      if (results.violations.length) {
        console.warn('Accessibility violations:', results.violations);
      }
    });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);


