import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/layout/layout.tsx';
import SignUp from './components/auth/signup/signup.tsx';
import SignIn from './components/auth/signin/signin.tsx';
import store from './store.ts';
import { Provider } from 'react-redux';
import AuthWrapper from './auth/authWrapper.tsx';
import Home from './components/Home/home.tsx';

import LeaguesTournaments from './components/Leagues/leaguesTournaments.tsx';
import LeagueInfoPage from './components/leagueInfo/leagueInfo.tsx';
import TournamentPage from './components/tournamentPage/tournamentPage.tsx';
import TeamPage from './components/TeamPage/teamPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <AuthWrapper>
            <Home />
          </AuthWrapper>
        ),
      },
      {
        path: '/leagues',
        element: (
          <AuthWrapper>
            <LeaguesTournaments instance="leagues" type={[0, 1]} />
          </AuthWrapper>
        ),
      },
      {
        path: '/tournaments',
        element: (
          <AuthWrapper>
            <LeaguesTournaments instance="tournaments" type={[2]} />
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
        path: '/leagues/:leagueId/teams/:teamId',
        
        element: (
          <AuthWrapper>
            <TeamPage />
          </AuthWrapper>
        ),
      },   
      {
        path: '/tournaments/:id',
        element: (
          <AuthWrapper>
            <eventTournamentPage />
          </AuthWrapper>
        ),
      },  
      {
        path: '/tournaments/:leagueId/teams/:teamId',
        element: (
          <AuthWrapper>
            <TeamPage />
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
