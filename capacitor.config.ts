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
    SystemBars: {
      insetsHandling: "css",
      initialViewportFitValueHint: "cover",
      style: "DARK",
    },
    Keyboard: {
      resize: "native",
      resizeOnFullScreen: false,
    },
  },
};

export default config;
