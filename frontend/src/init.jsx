import React, { Suspense } from 'react';
import './index.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import * as leoProfanity from 'leo-profanity';
import App from './App';
import { CurrentUserProvider } from './contexts/CurrentUser';
import i18n from './i18n';
import store from './store/index';
import rollbarConfig from './config/rollbar';
import { CurrentSocketProvider } from './contexts/CurrentSocket';
import 'react-toastify/dist/ReactToastify.css';
import { ToasterProvider } from './contexts/Toaster';
import { TOASTER_AUTO_CLOSE_TIME } from './config/constants';

export default async (socketInstance) => {
  const russianDictionary = leoProfanity.getDictionary('ru');
  leoProfanity.add(russianDictionary);

  await i18n;

  return (
    <React.StrictMode>
      <Suspense fallback="Is loading">
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <Provider store={store}>
              <ToasterProvider>
                <CurrentUserProvider>
                  <CurrentSocketProvider socket={socketInstance}>
                    <App />
                    <ToastContainer
                      pauseOnFocusLoss={false}
                      autoClose={TOASTER_AUTO_CLOSE_TIME}
                    />
                  </CurrentSocketProvider>
                </CurrentUserProvider>
              </ToasterProvider>
            </Provider>
          </ErrorBoundary>
        </RollbarProvider>
      </Suspense>
    </React.StrictMode>
  );
};
