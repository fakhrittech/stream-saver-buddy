
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.a3640b5e2fe34d74ae623b0be96aac37',
  appName: 'stream-saver-buddy',
  webDir: 'dist',
  server: {
    url: 'https://a3640b5e-2fe3-4d74-ae62-3b0be96aac37.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000
    }
  }
};

export default config;
