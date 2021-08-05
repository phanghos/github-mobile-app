module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@modules': './src/modules',
          '@screens': './src/screens',
          '@hooks': './src/hooks',
          '@services': './src/services',
          '@models': './src/models',
          '@utils': './src/utils',
          '@features': './src/features',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
