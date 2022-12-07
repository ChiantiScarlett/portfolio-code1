import React from 'react';
import ReactNativeModal from 'react-native-modal';
import PropTypes from 'prop-types';
import {styleProps} from './commonProps';
import View from './view';
import styles from '@app/styles';
import {initialWindowMetrics} from 'react-native-safe-area-context';

/**
 * Modal 컴포넌트 정의:
 */
const _Modal = props => {
  return (
    <ReactNativeModal
      avoidKeyboard
      backdropOpacity={props.backgroundOpacity}
      isVisible={props.isVisible}
      swipeDirection="down"
      onSwipeComplete={() => {
        props.setVisible(false);
        props.onCloseCallback();
      }}
      style={props.style}
      onBackdropPress={() => {
        props.setVisible(false);
        props.onCloseCallback();
      }}>
      <View
        style={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: props.backgroundColor,
        }}>
        {props.children}
        <View style={{height: initialWindowMetrics.insets.bottom}} />
      </View>
    </ReactNativeModal>
  );
};

_Modal.propTypes = {
  isVisible: PropTypes.bool, // visibility handling
  setVisible: PropTypes.func, // visibility handling
  style: PropTypes.shape(styleProps), // 커스텀 스타일 정의
  backgroundColor: PropTypes.string, // Modal 배경색
  backgroundOpacity: PropTypes.number, // Modal의 투명도 정의
  onCloseCallback: PropTypes.func, // Modal을 닫을 때 실행할 함수 정의
};

_Modal.defaultProps = {
  style: {padding: 0, margin: 0, justifyContent: 'flex-end'},
  backgroundColor: styles.COLOR_ACRO1,
  backgroundOpacity: 0.5,
  onCloseCallback: () => {},
};

export default _Modal;
