import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import globalReducer from "./state/state.js"
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
  reducer: globalReducer
})

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);