import {  GoogleLoginProvider, FacebookLoginProvider, AuthServiceConfig } from 'angular5-social-login';

import { FACEBOOK_APP_ID, GOOGLE_APP_ID } from 'src/environments/social.config';

const getAuthServiceConfigs = () => {
  const config = new AuthServiceConfig (
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider (FACEBOOK_APP_ID)
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider (GOOGLE_APP_ID)
      },
    ]
  );
  return config;
};

export default getAuthServiceConfigs;
