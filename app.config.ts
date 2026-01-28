import 'dotenv/config';
import { ConfigContext, ExpoConfig } from 'expo/config';

// app.config.ts
export default ({ config }: ConfigContext): ExpoConfig => {
  const appEnv = process.env.APP_ENV ?? 'development';
  const isDev = appEnv === 'development';

  return {
    ...config,
    name: isDev ? '멍케쥴 (Dev)' : '멍케쥴',
    slug: 'pet-schedule',

    ios: {
      ...config.ios,
      bundleIdentifier: isDev
        ? 'com.toniandhoward.pet.sechdule.dev'
        : 'com.toniandhoward.pet.sechdule',
      googleServicesFile: isDev
        ? './firebase/dev/GoogleService-Info.plist'
        : './firebase/prod/GoogleService-Info.plist',
    },

    android: {
      ...config.android,
      package: isDev
        ? 'com.toniandhoward.pet.sechdule.dev'
        : 'com.toniandhoward.pet.sechdule',
      googleServicesFile: isDev
        ? './firebase/dev/google-services.json'
        : './firebase/prod/google-services.json',
    },

    extra: {
      ...config.extra,
      appEnv: process.env.APP_ENV ?? 'development',
      baseUrl: process.env.API_BASE_URL ?? 'http://localhost:3000',
      eas: { projectId: process.env.EAS_PROJECT_ID ?? '' },
    },

    plugins: [
      'expo-router',
      'expo-web-browser',
      [
        'expo-notifications',
        {
          icon: './assets/images/notification-icon.png',
          color: '#ffffff',
        },
      ],
    ],
  };
};
