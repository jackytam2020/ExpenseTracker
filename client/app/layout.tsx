'use client';
import type { Metadata } from 'next';
import Nav from './components/Nav';
import LayoutStyles from './styles/Layout.module.scss';
import './globals.css';

//redux resources
import globalReducer from './state/global';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import { PersistGate } from 'redux-persist/integration/react';

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

const persistConfig = {
  timeout: 100,
  key: 'root',
  storage: sessionStorage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, globalReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={LayoutStyles.layout} suppressHydrationWarning={true}>
        <Provider store={store}>
          <PersistGate
            loading={<div>loading...</div>}
            persistor={persistStore(store)}
          >
            <Nav />
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
