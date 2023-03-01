import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Provider from './context/myProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <StrictMode>
      <Provider>
        <App />
      </Provider>
    </StrictMode>,

  );
