import React, { ReactNode } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { Button, Tooltip } from '@nextui-org/react';

const TENANT_ID = import.meta.env.REACT_APP_MICROSOFT_TENANT_ID;
const CLIENT_ID = import.meta.env.REACT_APP_MICROSOFT_CLIENT_ID;

const msalConfig = {
  auth: {
    clientId: CLIENT_ID,
    authority: `https://login.microsoftonline.com/${TENANT_ID}`,
    redirectUri: window.location.origin,
  },
};

const pca = new PublicClientApplication(msalConfig);

interface MicrosoftLoginButtonProps {
  children?: ReactNode;
}

const MicrosoftLogin = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance
      .loginPopup({
        scopes: ['openid', 'profile', 'User.Read', 'api://<YOUR_API_CLIENT_ID>/access_as_user'],
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className='flex items-center' style={{ maxWidth: '195px', width: '100%' }}>
      <Tooltip content='In Development'>
        <Button
          className='flex-1'
          startContent={
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'
              alt='Microsoft logo'
              className='h-5 w-5'
            />
          }
          onClick={handleLogin}
          disabled
        >
          Microsoft
        </Button>
      </Tooltip>
    </div>
  );
};

export const AppWithMicrosoftLogin: React.FC<MicrosoftLoginButtonProps> = ({ children }) => (
  <MsalProvider instance={pca}>{children}</MsalProvider>
);

export const MicrosoftLoginButton = () => {
  return (
    <AppWithMicrosoftLogin>
      <MicrosoftLogin />
    </AppWithMicrosoftLogin>
  );
};
