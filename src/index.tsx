import React from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css';  // Ensure Poppins is loaded in this file or index.html
import App from './App';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

// Create the theme with Poppins font
const customTheme = createTheme(theme);

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode >
);
