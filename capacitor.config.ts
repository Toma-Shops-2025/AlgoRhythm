import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "online.myalgorhythm.app",
  appName: "AlgoRhythm",
  webDir: "dist",
  server: {
    url: "https://myalgorhythm.online",
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
    webContentsDebuggingEnabled: false,
  },
  plugins: {
    Keyboard: {
      resize: "native",
      resizeOnFullScreen: true,
    },
  },
};

export default config;
