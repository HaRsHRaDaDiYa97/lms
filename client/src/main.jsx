import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { Provider } from 'react-redux';
import { appStore } from './app/store';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      
        <App />
     
    </Provider>
  </StrictMode>
);