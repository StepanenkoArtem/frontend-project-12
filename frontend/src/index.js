import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CurrentUserProvider } from './contexts/CurrentUser';
import './i18n';
import store from './store/index';
import { CurrentSocketProvider } from './contexts/CurrentSocket';

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CurrentUserProvider>
        <CurrentSocketProvider>
          <App />
        </CurrentSocketProvider>
      </CurrentUserProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your ui, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
