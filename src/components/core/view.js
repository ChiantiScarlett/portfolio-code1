import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import {Pressable, View as RNView} from 'react-native';

import {
  styleProps,
  backgroundColor,
  border,
  flex,
  margin,
  padding,
} from './commonProps';

const _View = props => {
  let style = {
    ...getStylesByProps(props),
    ...backgroundColor.getStylesByProps(props),
    ...border.getStylesByProps(props),
    ...flex.getStylesByProps(props),
    ...margin.getStylesByProps(props),
    ...padding.getStylesByProps(props),
    ...props.style,
  };

  // Debugging용 샘플 스타일을 정의합니다.
  if (props['sample']) {
    style.width = 80;
    style.height = 80;
    style.borderRadius = 20;
    style.backgroundColor = 'coral';
  }

  // onPress가 주어졌다면, <Pressable>로 감싸기:
  if (props.onPress) {
    const navigation = useNavigation();
    return (
      <Pressable
        style={props.containerStyle}
        hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
        onPress={() => {
          props.onPress(navigation);
        }}>
        <RNView style={{...style, ...props.style}}>{props.children}</RNView>
      </Pressable>
    );
  }
  return <RNView style={{...style, ...props.style}}>{props.children}</RNView>;
};

/**
 * 커스텀 스타일 옵션을 정의합니다.
 */
const getStylesByProps = props => {
  let _styles = {};

  // debugging 용 샘플 스타일을 추가합니다.
  if (props.sample) {
    _styles['backgroundColor'] = 'coral';
    _styles['borderRadius'] = 12;
    _styles['width'] = 80;
    _styles['height'] = 80;
  }

  return _styles;
};

_View.propTypes = {
  ...backgroundColor.propTypes,
  ...border.propTypes,
  ...flex.propTypes,
  ...margin.propTypes,
  ...padding.propTypes,
  style: PropTypes.shape(styleProps),
  containerStyle: PropTypes.shape(styleProps),
  onPress: PropTypes.func,
  sample: PropTypes.bool,
};

_View.defaultProps = {
  style: {},
  containerStyle: {},
  ...border.defaultPropTypes,
  ...flex.defaultPropTypes,
  ...margin.defaultPropTypes,
  ...padding.defaultPropTypes,
  ...backgroundColor.defaultPropTypes,
};

export default _View;
