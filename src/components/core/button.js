import React from 'react';
import View from './view';
import Text from './text';
import PropTypes from 'prop-types';
import styles from '@app/styles';
import {styleProps} from './commonProps';
import triggerHaptic from '@functions/triggerHaptic';
import {initialWindowMetrics} from 'react-native-safe-area-context';

const _Button = props => {
  if (props.isBottomButton) {
    return (
      <View hor-pad>
        <View
          padding-top-15
          padding-bottom-15
          onPress={nav => {
            if (props.triggerHaptic) triggerHaptic();
            props.onPress(nav);
          }}
          style={{
            backgroundColor: props.enabled
              ? styles.COLOR_MAIN1
              : styles.COLOR_ACRO2,
            ...props.containerStyle,
          }}>
          <Text bold medium style={{...props.textStyle}}>
            {props.title}
          </Text>
        </View>
        <View style={{height: initialWindowMetrics.insets.bottom}} />
      </View>
    );
  }

  return (
    <View
      padding-top-15
      padding-bottom-15
      onPress={nav => {
        if (props.triggerHaptic) triggerHaptic();
        props.onPress(nav);
      }}
      style={{backgroundColor: styles.COLOR_MAIN1, ...props.containerStyle}}>
      <Text bold medium style={{...props.textStyle}}>
        {props.title}
      </Text>
    </View>
  );
};

_Button.propTypes = {
  title: PropTypes.string, // 일반 상황에서 보여질 텍스트
  disabledTitle: PropTypes.string, // 버튼 비활성화 시 보여질 텍스트
  onPress: PropTypes.func, // 클릭 시 실행할 함수 정의
  containerStyle: PropTypes.shape(styleProps), // 버튼 컨테이너 커스텀 스타일
  textStyle: PropTypes.shape(styleProps), // 글자에 대한 커스텀 스타일
  triggerHaptic: PropTypes.bool, // 클릭 시 햅틱 반응 유무
  isBottomButton: PropTypes.bool, // 하단에 SafeInset 추가 유무
  enabled: PropTypes.bool, // 버튼 활성화 상태
};

_Button.defaultProps = {
  title: '',
  onPress: () => {},
  containerStyle: {
    alignItems: 'center',
    borderRadius: 6,
  },
  textStyle: {
    color: styles.COLOR_ACRO1,
  },
  triggerHaptic: true,
  isBottomButton: false,
  enabled: true,
  disabledTitle: '',
};

export default _Button;
