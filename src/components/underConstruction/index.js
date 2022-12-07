import React from 'react';
import PropTypes from 'prop-types';
import {SVG, View, Text} from '@components/core';
import ImageSVG from './image.svg';

/**
 * 임시 비활성화를 위한 컴포넌트입니다.
 */
const UnderConstruction = props => {
  return (
    <View ai-center jc-center>
      <SVG source={ImageSVG} width={150} height={150} />
      <Text regular medium acro5 style={{paddingTop: 10}}>
        {props.text}
      </Text>
    </View>
  );
};

UnderConstruction.propTypes = {
  text: PropTypes.string,
};

UnderConstruction.defaultProps = {
  text: '아직 준비중이에요.',
};

export default UnderConstruction;
