import React from 'react';
import {View} from 'react-native';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {styleProps} from './core';
import PropTypes from 'prop-types';

const max = (a, b) => (a > b ? a : b);

const SafeContainer = props => (
  <SafeAreaInsetsContext.Consumer>
    {insets => (
      <View
        style={[
          {
            backgroundColor: props.backgroundColor,
            paddingTop: props.paddingOnTop
              ? max(insets.top, props.minTopPadding)
              : 0,
            paddingBottom: props.paddingOnBottom
              ? max(insets.bottom, props.minBottomPadding)
              : 0,
          },
          props.style,
        ]}>
        {props.children}
      </View>
    )}
  </SafeAreaInsetsContext.Consumer>
);

SafeContainer.propTypes = {
  style: PropTypes.shape(styleProps),
  paddingOnTop: PropTypes.bool,
  paddingOnBottom: PropTypes.bool,
  minTopPadding: PropTypes.number,
  minBottomPadding: PropTypes.number,
  backgroundColor: PropTypes.string,
};

SafeContainer.defaultProps = {
  minTopPadding: 20,
  minBottomPadding: 20,
  style: {},
  backgroundColor: '#fff',
};

export default SafeContainer;
