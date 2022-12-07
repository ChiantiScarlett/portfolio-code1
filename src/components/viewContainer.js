import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import {styleProps} from './core';

/**
 * 기본적인 Scroll과 Keyboad Overlay Issue를 해결하는 페이지 Wrapper입니다.
 */
const ViewContainer = props => {
  const {HeaderComponent, FooterComponent} = props;
  return (
    <>
      <HeaderComponent />
      <KeyboardAwareScrollView
        ref={props.scrollRef}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        keyboardShouldPersistTaps={props.keyboardShouldPersistTaps}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={props.enableScroll}
        enableOnAndroid={true}
        extraHeight={80}
        contentContainerStyle={props.containerStyle}
        style={[
          {flex: 1, backgroundColor: props.backgroundColor, paddingBottom: 0},
          props.style,
        ]}>
        {props.children}
      </KeyboardAwareScrollView>
      <FooterComponent />
    </>
  );
};

ViewContainer.propTypes = {
  backgroundColor: PropTypes.any,
  enableScroll: PropTypes.bool,
  style: PropTypes.shape(styleProps),
  containerStyle: PropTypes.shape(styleProps),
  keyboardShouldPersistTaps: PropTypes.any,
  scrollRef: PropTypes.any,
  HeaderComponent: PropTypes.any,
  FooterComponent: PropTypes.any,
};

ViewContainer.defaultProps = {
  backgroundColor: '#fff',
  enableScroll: true,
  style: {},
  containerStyle: {},
  keyboardShouldPersistTaps: 'never',
  HeaderComponent: () => <></>,
  FooterComponent: () => <></>,
};

export default ViewContainer;
