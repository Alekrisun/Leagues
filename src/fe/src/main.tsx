import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/layout/layout.tsx';
import LeagueInfoPage from './components/leagueInfo/leagueIngo.tsx';
import SignUp from './components/auth/signup/signup.tsx';
import SignIn from './components/auth/signin/signin.tsx';
import store from './store.ts';
import { Provider } from 'react-redux';
import AuthWrapper from './auth/authWrapper.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <AuthWrapper>
            <App />
          </AuthWrapper>
        ),
      },
      {
        path: '/leagues/:id',
        element: (
          <AuthWrapper>
            <LeagueInfoPage />
          </AuthWrapper>
        ),
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
