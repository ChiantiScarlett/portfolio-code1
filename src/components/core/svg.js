import React from 'react';
import PropTypes from 'prop-types';
import {Pressable, View} from 'react-native';
import {styleProps} from './commonProps';
import {useNavigation} from '@react-navigation/native';

/**
 * HOC SVG 컴포넌트 정의:
 */
const _SVG = props => {
  if (props.onPress) {
    const navigation = useNavigation();
    return (
      <Pressable
        hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
        onPress={() => {
          props.onPress(navigation);
        }}>
        <View
          style={{width: props.width, height: props.height, ...props.style}}>
          {!!props.source && <props.source width="100%" height="100%" />}
        </View>
      </Pressable>
    );
  }
  return (
    <View style={{width: props.width, height: props.height, ...props.style}}>
      {!!props.source && <props.source width="100%" height="100%" />}
    </View>
  );
};

_SVG.propTypes = {
  width: PropTypes.any, // 가로 길이
  height: PropTypes.any, // 세로 길이
  source: PropTypes.any, // 이미지 파일 (imported SVG)
  style: PropTypes.shape(styleProps), // 커스텀 스타일
  onPress: PropTypes.func, // 클릭 시 실행 함수
};

_SVG.defaultProps = {
  style: {},
};

export default _SVG;
