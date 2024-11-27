import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App';
import store from './src/redux/config/configStore.js';
import { Provider } from 'react-redux';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
