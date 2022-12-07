import React from 'react';
import {View, Text, Button} from '@components/core';
import FadeInOut from 'react-native-fade-in-out';
import {observer} from 'mobx-react-lite';
import useGlobalState from '@core/globalState';
import {useRoute} from '@react-navigation/native';
import {InteractionManager} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import HeadComponent from './headComponent';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import FixedHeader from './fixedHeader';
import InnerContent from './innerContent';
import SafeContainer from '@components/safeContainer';

const HEADER_HEIGHT_VALUES = {
  topInset: Math.max(initialWindowMetrics.insets.top, 20),
  header: 50,
  imageSlider: ((initialWindowMetrics.frame.width * 3) / 5) * 0.9,
  pagination: 70,
};
const HEADER_HEIGHT_SUM = Object.values(HEADER_HEIGHT_VALUES).reduce(
  (a, b) => a + b,
  0,
);

const Component = observer(() => {
  const {productDetailState} = useGlobalState();
  const {params} = useRoute().params;
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    /** Stack Mount Animation 이후에, 컴포넌트를 로드합니다. */
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        productDetailState.set({
          productDocument: params.productDocument,
          productReviewSummaryDocument: params.productReviewSummaryDocument,
        });
      }, 0);
    });

    return () => {
      productDetailState.set({
        productDocument: null,
        productReviewSummaryDocument: null,
      });
    };
  }, []);

  return (
    <FadeInOut visible={productDetailState.P003Ready} style={{flex: 1}}>
      <ParallaxScrollView
        backgroundColor="#fff"
        contentBackgroundColor="#fff"
        parallaxHeaderHeight={HEADER_HEIGHT_SUM}
        renderForeground={() => (
          <HeadComponent heightValues={HEADER_HEIGHT_VALUES} />
        )}
        onScroll={event => setScrollY(event.nativeEvent.contentOffset.y)}>
        <InnerContent />
      </ParallaxScrollView>
      {scrollY > HEADER_HEIGHT_SUM && <FixedHeader />}
      <SafeContainer paddingOnBottom>
        <View hor-pad padding-top-10>
          <Button
            title="구독하기"
            onPress={nav => nav.navigate('C000', {key: 'C000'})}
          />
        </View>
      </SafeContainer>
    </FadeInOut>
  );
});

const options = {
  headerShown: false,
};

export default {Component, options};
