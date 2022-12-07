import React from 'react';
import {View, Text, SVG} from '@components/core';

import screenAnimation from '@functions/screenAnimation';
import LogoSVG from './logo.svg';
import GoogleSVG from './google.svg';
import TwitterSVG from './twitter.svg';
import KakaoSVG from './kakao.svg';
import triggerHaptic from '@functions/triggerHaptic';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import useGlobalState from '@core/globalState';
import onUserLogin from '@functions/onUserLogin';

const Component = () => {
  const {pendingScreen} = useGlobalState();

  /** 구글로 로그인 시 실행할 함수입니다. */
  onGooglePress = async nav => {
    triggerHaptic();
    pendingScreen.show();

    try {
      // 구글 아이디로 로그인을 시도합니다:
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      // 성공했을 경우, 유저 정보를 갱신합니다.
      await onUserLogin(nav);
    } catch (err) {
      console.warn(err);
    }

    pendingScreen.hide();
  };

  /** 카카오로 로그인 시 실행할 함수입니다. */
  onKakaoPress = nav => {
    triggerHaptic();
    nav.navigate('C000', {key: 'C000'});
  };

  /** 비회원으로 둘러보기 시 실행할 함수입니다. */
  onAnonymousPress = nav => {
    triggerHaptic();
    nav.navigate('C000', {key: 'C000'});
  };

  return (
    <View main5 flex-1-0 ai-center jc-center>
      <SVG source={LogoSVG} width={100} height={100} />
      <Text margin-top-20 bold large acro5>
        {'해외 직구 콘택트 렌즈 구독 서비스'}
      </Text>
      <View flex-row margin-top-10 ai-flex-end>
        <Text regular medium acro5>
          {'당신의 시야를 밝혀주는 '}
        </Text>
        <Text main1 large bold>
          {'시야'}
        </Text>
        <Text regular medium acro5>
          {' 입니다.'}
        </Text>
      </View>
      <View
        margin-top-50
        flex-row
        border-all
        padding-top-10
        padding-bottom-10
        ai-center
        jc-center
        margin-top-10
        acro1
        style={{width: 240, borderRadius: 6}}
        onPress={onGooglePress}>
        <SVG width={20} height={20} source={GoogleSVG} />
        <Text regular small acro6>
          {'   Google로 시작하기'}
        </Text>
      </View>
      <View
        flex-row
        border-all
        padding-top-10
        padding-bottom-10
        ai-center
        jc-center
        margin-top-10
        style={{width: 240, backgroundColor: '#FEE500'}}
        onPress={onKakaoPress}>
        <SVG width={20} height={20} source={KakaoSVG} />
        <Text regular small acro6>
          {'   카카오로 시작하기'}
        </Text>
      </View>
      <View
        flex-row
        border-all
        padding-top-10
        padding-bottom-10
        ai-center
        jc-center
        margin-top-10
        main1
        style={{width: 240, borderRadius: 6}}
        onPress={onAnonymousPress}>
        <SVG width={0} height={20} source={null} />
        <Text bold small acro1>
          {'비회원으로 먼저 둘러보기'}
        </Text>
      </View>
    </View>
  );
};

const options = {
  headerShown: false,
  ...screenAnimation.fade,
};

export default {Component, options};
