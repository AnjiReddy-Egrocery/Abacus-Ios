import type { CapacitorConfig } from '@capacitor/cli';

export const config: CapacitorConfig = {
  appId: 'com.dst.abacustrainer',
  appName: 'AbacusTrainer',
  webDir: 'www',

  plugins: {
    SplashScreen: {
     launchShowDuration: 0,
     launchAutoHide: false,
    }
  }
};
