import { TooltipProvider } from './components/ui/tooltip';
import { UserProvider } from './contexts/user/user-provider';
import './index.css';
import { router } from '@/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { Amplify } from 'aws-amplify';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USERPOOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_USERPOOL_CLIENT_ID,
      loginWith: {
        oauth: {
          domain: import.meta.env.VITE_COGNITO_USERPOOL_DOMAIN,
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: [window.location.origin],
          redirectSignOut: [window.location.origin],
          responseType: 'code',
        },
      },
    },
  },
});

export const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider delayDuration={300} skipDelayDuration={1000}>
          <RouterProvider router={router} />
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>,
);
