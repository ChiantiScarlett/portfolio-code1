import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react-lite';
import {SVG, Text, View} from '@components/core';
import EnterInSVG from './enterIn.svg';

const EnterInMenu = props => {
  const {isFirstItem, title, onPress} = props;
  return (
    <View
      hor-pad
      flex-row
      ai-center
      onPress={onPress}
      style={isFirstItem ? {borderTopWidth: 0.5} : {}}
      border-bottom>
      <View flex-1-0 padding-top-20 padding-bottom-20>
        <Text regular medium acro6>
          {title}
        </Text>
      </View>
      <SVG width={12} height={12} source={EnterInSVG} />
    </View>
  );
};

EnterInMenu.propTypes = {
  isFirstItem: PropTypes.bool,
  title: PropTypes.string,
  onPress: PropTypes.func,
};
EnterInMenu.defaultProps = {
  onPress: nav => {},
};

export default EnterInMenu;
