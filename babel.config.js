module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@app': './src/app',
          '@api': './src/api',
          '@services': './src/services',
          '@containers': './src/containers',
          '@components': './src/components',
          '@common': './src/common',
          '@helpers': './src/helpers',
          '@views': './src/views',

          '@screens': './src/screens',
          '@functions': './src/functions',
          '@models': './src/models',
          '@stores': './src/stores',
          '@configurations': './src/configurations',
          '@firebase': './src/firebase',

          '@system': './src/system',
          '@core': './src/core',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
