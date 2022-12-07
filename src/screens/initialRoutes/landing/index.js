import React from 'react';
import {View, Text, Button, SVG} from '@components/core';
import styles from '@app/styles';
import AppIntroSlider from 'react-native-app-intro-slider';

import Slide1SVG from './slide1.svg';
import Slide2SVG from './slide2.svg';
import Slide3SVG from './slide3.svg';

/** Landing Page (구 P038)
 * 로그아웃 상태에서 어플리케이션을 처음 켰을 때 진입하는 페이지입니다.
 */
const Component = () => {
  const _renderItem = ({item}) => item.component;

  return (
    <View main5 flex-1-0>
      <View flex-1-0>
        <AppIntroSlider
          renderItem={_renderItem}
          data={slideData}
          dotStyle={{backgroundColor: '#abb5f2'}}
          activeDotStyle={{backgroundColor: styles.COLOR_MAIN1}}
          renderDoneButton={() => <></>}
          renderNextButton={() => <></>}
        />
      </View>
      <Button
        isBottomButton
        title="로그인으로 건너뛰기"
        onPress={nav => nav.replace('P039', {key: 'P039'})}
      />
    </View>
  );
};

const slideData = [
  {
    key: '1',
    component: (
      <View ai-center jc-center flex-1-0 hor-pad>
        <SVG width={240} height={240} source={Slide1SVG} />
        <Text margin-top-20 title large acro6 margin-bottom-10>
          {'콘택트 렌즈 구독 서비스'}
        </Text>
        <Text
          regular
          medium
          acro6
          word-wrap
          word-wrap-center
          word-wrap-line-height={20}>
          {'매월 정기 배송 서비스로 편하게 집에서 받아보세요!'}
        </Text>
      </View>
    ),
  },
  {
    key: '2',
    component: (
      <View ai-center jc-center flex-1-0 hor-pad>
        <SVG width={240} height={240} source={Slide2SVG} />
        <Text margin-top-20 title large acro6 margin-bottom-10>
          {'해외 직구 배송비가 무료!'}
        </Text>
        <Text
          regular
          medium
          acro6
          word-wrap
          word-wrap-center
          word-wrap-line-height={20}>
          {'구독은 배송비 무료!\n콘택트 렌즈를 국내 최저가로 구매하세요.'}
        </Text>
      </View>
    ),
  },
  {
    key: '3',
    component: (
      <View ai-center jc-center flex-1-0 hor-pad>
        <SVG width={240} height={240} source={Slide3SVG} />
        <Text margin-top-20 title large acro6 margin-bottom-10>
          {'다양한 원데이 제품 구성'}
        </Text>
        <Text
          regular
          medium
          acro6
          word-wrap
          word-wrap-center
          word-wrap-line-height={20}>
          {
            '스토어에는 국내 판매량 TOP10 제품을 포함해서\n총 20가지의 제품이 준비되어 있으니\n지금 바로 구독 시작하세요!'
          }
        </Text>
      </View>
    ),
  },

  // {key: '1', component: <PreLoginSlide1 />},
  // {key: '2', component: <PreLoginSlide2 />},
  // {key: '3', component: <PreLoginSlide3 />},
];

const options = {
  headerShown: false,
};

export default {Component, options};
