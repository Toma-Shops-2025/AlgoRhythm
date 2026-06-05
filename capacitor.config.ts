import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "online.myalgorhythm.app",
  appName: "AlgoRhythm",
  webDir: "dist/client",
  server: {
    // Load the live SSR'd site so TanStack Start hydrates correctly inside the
    // native WebView (a static index.html alone cannot hydrate SSR routes).
    url: "https://myalgorhythm.online",
    cleartext: false,
  },
  android: {
    webContentsDebuggingEnabled: true,
  },
  plugins: {
    Keyboard: {
      resize: "native",
      resizeOnFullScreen: true,
    },
  },
};

export default config;
