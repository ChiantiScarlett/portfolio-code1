import React from 'react';
import {Animated, InteractionManager, StyleSheet, View} from 'react-native';
import {useFonts} from 'expo-font';

import LogoPNG from './logo.png';
import {hideBootsplash} from '@functions/bootsplash';
import {observer} from 'mobx-react';
import useGlobalState from '@core/globalState';
import {MIN_LOADING_DELAY} from '@app/static';
/**
 * Bootsplash가 끝난 후, 앱이 완전히 로드 되기 전에 로딩화면을 보여주는 래퍼입니다.
 * 필요한 assets을 로드한 후에 비활성화됩니다.
 */
const AnimatedAppLoader = ({children}) => {
  React.useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => hideBootsplash(), 200);
    });
  }, []);

  const [isSplashReady, setSplashReady] = React.useState(false);
  const [fontsLoaded] = useFonts({
    /** 추후 Font File을 동적으로 변경할 시에 사용:  */
    // FF_SCRIPT: require('./fonts/GmarketSansTTFBold.ttf'),
    // FF_TITLE: require('./fonts/Pretendard-ExtraBold.ttf'),
    // FF_BOLD: require('./fonts/NanumSquareEB.ttf'),
    // FF_REGULAR: require('./fonts/NanumSquareR.ttf'),
  });

  React.useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        setSplashReady(true);
      }
    }

    prepare();
  }, [fontsLoaded]);

  if (!isSplashReady) {
    return null;
  }

  return <AnimatedSplashScreen>{children}</AnimatedSplashScreen>;
};

const AnimatedSplashScreen = observer(({children}) => {
  const {
    mainScreenReady,
    postLoginScreenReady,
    landingScreenReady,
    initialRouteName,
  } = useGlobalState();

  const animation = React.useMemo(() => new Animated.Value(1), []);
  const [isSplashAnimationComplete, setAnimationComplete] =
    React.useState(false);

  // 최소한의 로딩 delay를 주기 위한 값입니다.
  const [minDelayFlag, setMinDelayFlag] = React.useState(false);

  // 최소 화면 딜레이를 설정합니다.
  React.useEffect(() => {
    const timeout = setTimeout(() => setMinDelayFlag(true), MIN_LOADING_DELAY);

    return () => clearTimeout(timeout);
  }, []);

  /**
   * 각 route에 대해 initialRouteName이 정해지고 해당 Route가 준비가 되면,
   * 그리고 minDelayFlag가 꺼지면 splashScreen을 숨깁니다.
   */
  React.useEffect(() => {
    if (initialRouteName === 'MAIN' && mainScreenReady && minDelayFlag) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
    if (
      initialRouteName === 'POST_LOGIN' &&
      postLoginScreenReady &&
      minDelayFlag
    ) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
    if (initialRouteName === 'LANDING' && landingScreenReady && minDelayFlag) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [
    initialRouteName,
    mainScreenReady,
    landingScreenReady,
    postLoginScreenReady,
    minDelayFlag,
  ]);

  return (
    <>
      <View style={{flex: 1}}>
        {children}
        {!isSplashAnimationComplete && (
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: '#dee5f6',
                opacity: animation,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Animated.Image
              style={{
                width: 240,
                height: 240,
                resizeMode: 'cover',
                opacity: animation,
              }}
              source={LogoPNG}
            />
            <Animated.View
              style={{
                position: 'absolute',
                width: 240,
                height: 240,
                alignItems: 'center',
                paddingBottom: 60,
                justifyContent: 'flex-end',
              }}>
              <Animated.Text
                style={{
                  color: '#909090',
                  fontFamily: 'Pretendard-ExtraBold',
                  fontSize: 16,
                }}>
                {'당신의 시야를 밝게'}
              </Animated.Text>
            </Animated.View>
          </Animated.View>
        )}
      </View>
    </>
  );
});

export default AnimatedAppLoader;
