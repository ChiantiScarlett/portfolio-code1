import React from 'react';
import PropTypes from 'prop-types';
import {View} from '@components/core';
import ImageSlider from './imageSlider';

import {initialWindowMetrics} from 'react-native-safe-area-context';
import Header from './header';

/**
 * ParallaxScrollView 상단에 보여질 컴포넌트입니다.
 * safeInset 때문에 통일된 높이를 산출할 수 없다는 점에 주의.
 */
const HeadComponent = props => {
  const {heightValues} = props;

  return (
    <View>
      {/** top-notch 핸들링: */}
      <View style={{height: heightValues.topInset}} />
      {/** 뒤로가기 /찜하기 버튼 */}
      <Header height={heightValues.header} />
      {/** 이미지 슬라이더: */}
      <ImageSlider heightValues={heightValues} />
    </View>
  );
};

HeadComponent.propTypes = {
  heightValues: PropTypes.shape({
    topInset: PropTypes.number,
    header: PropTypes.number,
    imageSlider: PropTypes.number,
    pagination: PropTypes.number,
  }),
};

export default HeadComponent;
