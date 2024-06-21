import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import App from './App';
import { AppProvider } from './Info/Info';



ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);


