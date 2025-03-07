module.exports = {
  name: "nfc-home-assistant",
  slug: "nfc-home-assistant",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "haydan",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.haydn.morris.nfc-home-assistant",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.haydn.morris.nfc_home_assistant",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
    [
      "react-native-nfc-manager",
      {
        nfcPermission: "Custom permission message",
        selectIdentifiers: ["A0000002471001"],
        systemCodes: ["8008"],
        includeNdefEntitlement: false,
      },
    ],
    [
      "expo-secure-store",
      {
        configureAndroidBackup: true,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "98c27b25-2f83-4a11-ba66-b79df65661b6",
    },
  },
};
