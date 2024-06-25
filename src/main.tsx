import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';

import './index.css'
import App from './App'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
