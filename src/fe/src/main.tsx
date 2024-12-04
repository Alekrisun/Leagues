import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/layout/layout.tsx';
import LeagueInfo from './components/leagueInfo/leagueIngo.tsx';
import SignUp from './components/signup/signup.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: '/leagues/:id',
        element: <LeagueInfo />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      // {
      //   path: '/signin',
      //   element: <SignIn />
      // }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
