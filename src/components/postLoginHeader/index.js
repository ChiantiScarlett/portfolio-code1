import React from 'react';
import PropTypes from 'prop-types';
import SafeContainer from '@components/safeContainer';
import {View, Text} from '@components/core';
import {SCREEN_PADDING} from '@app/static';

const PostLoginHeader = props => {
  return (
    <SafeContainer paddingOnTop>
      <View border-bottom flex-row>
        <View>
          <View style={{width: 100}} padding-left-20>
            <Text acro6 xsmall regular padding-top-10>
              {`${props.paginationIndex} / 2`}
            </Text>
          </View>
        </View>
        <View flex-1-0 ai-center>
          <Text title medium acro6 padding-top-5>
            {props.title}
          </Text>
        </View>
        <View>
          <View
            ai-flex-end
            onPress={props.onButtonPress}
            padding-top-10
            padding-bottom-20
            style={{paddingRight: SCREEN_PADDING, width: 100}}>
            <Text bold medium acro6>
              {props.buttonText}
            </Text>
          </View>
        </View>
      </View>
    </SafeContainer>
  );
};

PostLoginHeader.propTypes = {
  title: PropTypes.string,
  paginationIndex: PropTypes.number,
  buttonText: PropTypes.string,
  onButtonPress: PropTypes.func,
};

export default PostLoginHeader;
