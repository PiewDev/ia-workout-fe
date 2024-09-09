import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import LandingPage from './pages/home/landing-page/LandingPage.jsx';
import Routine from './pages/routine/Routine.jsx';
import Questionaire from './pages/questionaire/Stepper.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'Routine', element: <Routine /> },
      { path: 'Questions', element: <Stepper />}
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
