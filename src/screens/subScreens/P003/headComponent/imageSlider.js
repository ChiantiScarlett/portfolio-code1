import React from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {observer} from 'mobx-react';
import useGlobalState from '@core/globalState';
import {Image, View} from '@components/core';
import styles from '@app/styles';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

/**
 * 이미지 슬라이더와 페이지네이션 버튼을 정의합니다.
 */
const ImageSlider = observer(({heightValues}) => {
  const DEVICE_WIDTH = initialWindowMetrics.frame.width;

  const carouselRef = React.useRef();

  const {productDetailState} = useGlobalState();
  const {productDocument} = productDetailState;
  const [currentIdx, setCurrentIdx] = React.useState(0);

  /** 슬라이더 각각의 컴포넌트를 커스텀 렌더링 하는 함수입니다.  */
  const _renderItem = ({item, index}) => {
    return (
      <Image
        width={DEVICE_WIDTH * 0.9}
        key={index}
        sourceURI={item}
        aspectRatio="wide"
      />
    );
  };

  return (
    <View
      ai-center
      style={{height: heightValues.imageSlider + heightValues.pagination}}>
      <Carousel
        ref={carouselRef}
        layout={'default'}
        data={productDocument?.image.photoList}
        renderItem={_renderItem}
        inactiveSlideOpacity={0.3}
        sliderWidth={DEVICE_WIDTH * 1}
        itemWidth={DEVICE_WIDTH * 0.9}
        onScrollIndexChanged={index => setCurrentIdx(index)}
      />
      <Pagination
        activeDotIndex={currentIdx}
        dotsLength={productDocument?.image.photoList.length}
        inactiveDotScale={1}
        carouselRef={carouselRef}
        dotStyle={{
          backgroundColor: styles.COLOR_MAIN1,
          width: 7,
          height: 7,
          borderRadius: 5,
        }}
        inactiveDotStyle={{
          backgroundColor: styles.COLOR_ACRO4,
        }}
        containerStyle={{height: heightValues.pagination}}
      />
    </View>
  );
});

ImageSlider.propTypes = {
  heightValues: PropTypes.shape({
    topInset: PropTypes.number,
    header: PropTypes.number,
    imageSlider: PropTypes.number,
    pagination: PropTypes.number,
  }),
};

export default ImageSlider;
