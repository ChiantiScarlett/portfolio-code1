import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import View from './view';
import {styleProps} from './commonProps';
import styles from '@app/styles';

/**
 * FastImage를 활용한 URL 형태의 JPG 또는 PNG 이미지 컴포넌트:
 */
const _Image = props => {
  // 높이를 onLoad 시에 설정합니다:
  const [height, setHeight] = React.useState(1);

  // 이미지의 가로-세로 비율을 정의합니다:
  const ratioMap = {
    wide: 5 / 3,
    square: 1,
    original: props.width / height,
  };

  return (
    <View style={props.containerStyle} onPress={props.onPress}>
      <FastImage
        resizeMode={props.resizeMode}
        onLoad={e =>
          setHeight((e.nativeEvent.height / e.nativeEvent.width) * props.width)
        }
        source={{
          uri: props.sourceURI || props.fallbackURI,
          priority: props.priority,
          cache: props.cache,
        }}
        style={{
          width: props.width,
          aspectRatio: ratioMap[props.aspectRatio],
          ...props.style,
          ...(props['border-all']
            ? {borderWidth: 0.5, borderColor: styles.COLOR_BORDER}
            : {}),
        }}
      />
    </View>
  );
};

_Image.propTypes = {
  width: PropTypes.any, // 가로 길이
  sourceURI: PropTypes.string, // 이미지 Web URI
  cache: PropTypes.oneOf(['immutable', 'web', 'cacheOnly']), // 캐싱 옵션
  priority: PropTypes.oneOf(['high', 'low', 'normal']), // 다운로드 우선 순위
  fallbackURI: PropTypes.string, // fallback 이미지 URI
  resizeMode: PropTypes.oneOf(['center', 'contain', 'cover', 'stretch']), // 이미지 비율 옵션
  aspectRatio: PropTypes.oneOf(['wide', 'square', 'original']), // 이미지 비율 옵션
  containerStyle: PropTypes.shape(styleProps), // 이미지 컨테이너 View 스타일 정의
  style: PropTypes.shape(styleProps), // 커스텀 FastImage 스타일 정의
  'border-all': PropTypes.bool, // 테두리 유무
  onPress: PropTypes.func, // 클릭 시 동작할 함수 정의
};

_Image.defaultProps = {
  cache: 'immutable',
  priority: 'normal',
  resizeMode: 'contain',
  aspectRatio: 'wide',
  containerStyle: {},
  style: {},
};

export default _Image;
