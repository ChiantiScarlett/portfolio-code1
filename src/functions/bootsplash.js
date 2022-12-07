import BootSplash from 'react-native-bootsplash';

/**
 * Bootsplash를 숨김처리합니다.
 */
export const hideBootsplash = () => {
  BootSplash.hide({fade: true});
};

export const showBootsplash = () => {
  BootSplash.show({fade: true});
};
