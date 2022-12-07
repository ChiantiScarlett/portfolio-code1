import React from 'react';
import {Image as RNImage} from 'react-native';
import PropTypes from 'prop-types';
import {styleProps} from './commonProps';

const _LocalImage = props => {
  /** width나 height를 불필요하게 설정하여 flex가 꼬이는 일을 막기 위해, 이하의 로직을 추가합니다: */
  let style = {};
  if (props.width) style.width = props.width;
  if (props.height) style.height = props.height;
  style = {...style, ...props.style};

  return <RNImage source={props.source} style={style} />;
};

_LocalImage.propTypes = {
  width: PropTypes.any,
  height: PropTypes.any,
  source: PropTypes.any,
  style: PropTypes.shape(styleProps),
};

_LocalImage.defaultProps = {
  style: {},
};

export default _LocalImage;
