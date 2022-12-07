import React from 'react';
import {Text as RNText, View} from 'react-native';
import PropTypes from 'prop-types';
import WrappedText from 'react-native-wrapped-text';
import {
  flex,
  font,
  foregroundColor,
  margin,
  padding,
  styleProps,
} from './commonProps';

const _Text = props => {
  let style = {
    ...foregroundColor.getStylesByProps(props),
    ...font.getStylesByProps(props),
    ...flex.getStylesByProps(props),
    ...margin.getStylesByProps(props),
    ...padding.getStylesByProps(props),
    ...(props.style || {}),
  };

  // [Debug] 만약 글꼴, 크기, 색상 중 하나라도 설정이 안됐을 경우, 마크 남기기:
  if (!style.fontFamily || !style.fontSize || !style.color) {
    return (
      <View style={{backgroundColor: 'coral'}}>
        <RNText>{props.children}</RNText>
      </View>
    );
  }

  // [word-wrap]을 썼을 경우, WrappedText 모듈 사용하기:
  if (props['word-wrap']) {
    return (
      <WrappedText
        containerStyle={
          props['word-wrap-center']
            ? {alignItems: 'center'}
            : {alignItems: 'flex-start'}
        }
        TextComponent={({children}) => (
          <RNText style={{...style, height: props['word-wrap-line-height']}}>
            {children}
          </RNText>
        )}>
        {props.children}
      </WrappedText>
    );
  }

  return <RNText style={style}>{props.children}</RNText>;
};

_Text.propTypes = {
  ...foregroundColor.propTypes,
  ...font.propTypes,
  ...flex.propTypes,
  ...margin.propTypes,
  ...padding.propTypes,

  // 커스텀 스타일 상속:
  style: PropTypes.shape(styleProps),

  // word-wrap 관련 설정:
  'word-wrap': PropTypes.bool,
  'word-wrap-line-height': PropTypes.number,
  'word-wrap-center': PropTypes.bool,
};

_Text.defaultProps = {
  style: {},
  'word-wrap-line-height': 70, // 의도적으로 큰 값을 설정.
};

export default _Text;
