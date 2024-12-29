import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';

import App from './App.tsx';

import { store, persistor } from './store/store.ts';

import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#f50909',
              colorInfo: '#f50909',
              colorLink: '#000000',
              fontSize: 20,
              red: '#f50909',
              fontFamily: 'Inter',
            },
            components: {
              Modal: {
                borderRadiusLG: 30,
                paddingMD: 30,
                paddingContentHorizontalLG: 30,
              },
            },
          }}
          locale={ruRU}
        >
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </ConfigProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
