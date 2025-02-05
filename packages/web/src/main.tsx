import './index.css';
import { router } from '@/router';
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USERPOOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_USERPOOL_CLIENT_ID,
      loginWith: {
        oauth: {
          domain: import.meta.env.VITE_COGNITO_USERPOOL_DOMAIN, // Your Cognito domain
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: ['http://localhost:5173'], // Your app's redirect URL
          redirectSignOut: ['http://localhost:5173'], // Your app's redirect URL
          responseType: 'token',
        },
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
