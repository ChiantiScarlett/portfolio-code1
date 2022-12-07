import PropTypes from 'prop-types';
import {SVG, Text, View} from '@components/core';
import SafeContainer from '@components/safeContainer';
import React from 'react';
import GoBackSVG from './goBack.svg';
import {SCREEN_PADDING} from '@app/static';

const SHOW_PAGE_NAME = true;

const GoBackHeader = props => {
  return (
    <SafeContainer paddingOnTop>
      <View flex-row jc-space-between ai-center border-bottom>
        <View
          onPress={nav => nav.goBack()}
          style={{
            paddingLeft: SCREEN_PADDING,
            paddingBottom: 10,
            width: 80,
            height: 30,
          }}>
          <SVG source={GoBackSVG} width={20} height={20} />
        </View>
        <Text title medium acro6 padding-bottom-10>
          {`${props.title || ''}${
            SHOW_PAGE_NAME ? ` (${props.pageName})` : ''
          }`}
        </Text>
        <View
          onPress={props.onRightButtonPress}
          style={{
            paddingRight: SCREEN_PADDING,
            paddingBottom: 10,
            width: 80,
            height: 30,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <Text bold medium main1>
            {props.rightButtonText}
          </Text>
        </View>
      </View>
    </SafeContainer>
  );
};

GoBackHeader.propTypes = {
  title: PropTypes.string,
  pageName: PropTypes.string,
  onRightButtonPress: PropTypes.func,
  rightButtonText: PropTypes.string,
};

GoBackHeader.defaultProps = {
  rightButtonText: '',
  onRightButtonPress: () => {},
};

export default GoBackHeader;
