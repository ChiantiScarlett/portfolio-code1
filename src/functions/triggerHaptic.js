import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const triggerHaptic = () => {
  ReactNativeHapticFeedback.trigger('impactLight', {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: true,
  });
};

export default triggerHaptic;
