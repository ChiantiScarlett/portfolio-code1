import React from 'react';
import {View, Text, SVG} from '@components/core';
import {prepareP002} from '@screens/initialRoutes/main/P002';
import {prepareP013} from '@screens/initialRoutes/main/P013';
import {observer} from 'mobx-react-lite';
import useGlobalState from '@core/globalState';
import {useNavigation} from '@react-navigation/native';
import {MIN_LOADING_DELAY} from '@app/static';
import LogoSVG from './logo.svg';
import ImageSVG from './image.svg';

const Component = observer(() => {
  const {mainScreenReady, storeState, userState} = useGlobalState();
  // 원만한 UX를 위해, 최소한의 delay를 설정하는 값입니다.
  const [minDelayFlag, setMinDelayFlag] = React.useState(false);
  const navigation = useNavigation();

  // 스토어, 마이페이지의 데이터를 준비합니다.
  React.useEffect(() => {
    const initialize = async () => {
      if (!mainScreenReady) {
        await prepareP002(storeState);
        await prepareP013(userState);
      }
    };

    initialize();
  }, []);

  // 최소 화면 딜레이를 설정합니다.
  React.useEffect(() => {
    const timeout = setTimeout(() => setMinDelayFlag(true), MIN_LOADING_DELAY);

    return () => clearTimeout(timeout);
  }, []);

  // mainScreen 준비가 끝나고, 최소 딜레이도 완료했다면 main 페이지로 넘깁니다.
  React.useEffect(() => {
    if (mainScreenReady && minDelayFlag) {
      navigation.navigate('MAIN', {key: 'MAIN'});
    }
  }, [mainScreenReady, minDelayFlag]);

  return (
    <View flex-1-0 main5 ai-center jc-center>
      <SVG source={LogoSVG} width={80} height={80} />
      <Text large script acro6 margin-top-40>
        {'회원가입을 완료했어요!'}
      </Text>
      <SVG source={ImageSVG} width={200} height={200} style={{marginTop: 40}} />
    </View>
  );
});

const options = {
  headerShown: false,
};

export default {Component, options};
