// import ReactDOM from 'react-dom';
import App  from '../components/App';

// ReactDOM.hydrate(
//     <App />,
//   document.getElementById('root'),
// );

import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
