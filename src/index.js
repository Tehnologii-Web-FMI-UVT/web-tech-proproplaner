import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginPage from './Pages/loginpage';
import reportWebVitals from './reportWebVitals';
import MyMeetsPage from './Pages/MyMeets';
import Homepage from './Pages/homepage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {path:'/homepage',
  element: <Homepage/>
},
{path:'/myMeets',
element: <MyMeetsPage/>
}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
