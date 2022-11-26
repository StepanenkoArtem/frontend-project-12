import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider } from '@rollbar/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CurrentUserProvider } from './contexts/CurrentUser';
import './i18n';
import store from './store/index';
import rollbarConfig from './config/rollbar';
import { CurrentSocketProvider } from './contexts/CurrentSocket';
import 'react-toastify/dist/ReactToastify.css';
import { ToasterProvider } from './contexts/Toaster';
import { TOASTER_AUTO_CLOSE_TIME } from './config/constants';

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <React.StrictMode>
    <Suspense fallback="Is loading">
      <RollbarProvider config={rollbarConfig}>
        <Provider store={store}>
          <ToasterProvider>
            <CurrentUserProvider>
              <CurrentSocketProvider>
                <App />
                <ToastContainer
                  pauseOnFocusLoss={false}
                  autoClose={TOASTER_AUTO_CLOSE_TIME}
                />
              </CurrentSocketProvider>
            </CurrentUserProvider>
          </ToasterProvider>
        </Provider>
      </RollbarProvider>
    </Suspense>
  </React.StrictMode>
  ,
);

// If you want to start measuring performance in your ui, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
