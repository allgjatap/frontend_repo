import { useGoogleAuthentication } from '@/services/Auth';
import { GOOGLE_CLIENT_ID } from '@/utils/constants';
import { Button } from '@nextui-org/react';
import { GoogleOAuthProvider, TokenResponse, useGoogleLogin } from '@react-oauth/google';
import GoogleLogo from '@/assets/icons/google-icon.svg';

export type GoogleTokenResponse = Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>;

export type GoogleLoginButtonProps = {
  onSuccess?: (tokenResponse: GoogleTokenResponse) => void;
  onError?: (errorResponse: Pick<TokenResponse, 'error' | 'error_description' | 'error_uri'>) => void;
};

const GoogleLogin = ({ onSuccess, onError }: GoogleLoginButtonProps) => {
  // useGoogleOneTapLogin({ onSuccess: (res) => console.log('hey', res),  });

  const login = useGoogleLogin({
    onSuccess,
    onError,
  });

  return (
    <Button
      className='flex-1 bg-secondary-50'
      startContent={<img src={GoogleLogo} alt='Google logo' className='mr-2 h-5 w-5' />}
      onClick={() => login()}
    >
      Google
    </Button>
  );
};

export const GoogleLoginButton = (props: GoogleLoginButtonProps) => {
  const { onSuccess, ...restProps } = props;

  const { mutate: googleAuthentication } = useGoogleAuthentication();

  const handleLogin = async (response: GoogleTokenResponse) => {
    googleAuthentication(response.access_token);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleLogin onSuccess={handleLogin} {...restProps} />
    </GoogleOAuthProvider>
  );
};
