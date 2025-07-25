import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { Provider } from 'react-redux';
import { appStore, persistor } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
       <PersistGate loading={null} persistor={persistor}>
        <App />
     </PersistGate>
    </Provider>
  </StrictMode>
);