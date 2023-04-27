import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// async function loadItems() {
//   const manufacturerResponse = await fetch('http://localhost:8100/api/manufacturers/');
//   const modelsResponse = await fetch('http://localhost:8100/api/models/');
//   if (manufacturerResponse.ok && modelsResponse.ok) {
//     const data1 = await manufacturerResponse.json();
//     const data2 = await modelsResponse.json();
//     root.render (
//       <React.StrictMode>
//         <App manufacturers={data1.manufacturers} models={data2.models} />
//       </React.StrictMode>
//     );
//   } else {
//     console.error(manufacturerResponse);
//     console.error(modelsResponse);
//   }
// }
// loadItems();
