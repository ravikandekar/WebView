module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-webview|react-native-video)/)',
  ],
  moduleNameMapper: {
    '^react-native-webview$': '<rootDir>/__mocks__/react-native-webview.js',
    '^react-native-video$': '<rootDir>/__mocks__/react-native-video.js',
    '^react-native-elements$': '<rootDir>/__mocks__/react-native-elements.js',
    '^@notifee/react-native$': '<rootDir>/__mocks__/@notifee/react-native.js',
  },
};
