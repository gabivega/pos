import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css'
import globalReducer from "./state/state.js"
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';


const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, globalReducer);
const store = configureStore({
  reducer: persistedReducer,
});


// const store = configureStore({
//   reducer: globalReducer
// })
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);