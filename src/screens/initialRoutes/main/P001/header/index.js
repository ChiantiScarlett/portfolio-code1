import {SCREEN_PADDING} from '@app/static';
import {SVG, View} from '@components/core';
import SafeContainer from '@components/safeContainer';
import React from 'react';
import ActiveNotificationSVG from './activeNotification.svg';
import InactiveNotificationSVG from './inactiveNotification.svg';
import LogoSVG from './logo.svg';

const Header = () => {
  return (
    <SafeContainer paddingOnTop>
      <View flex-row jc-space-between border-bottom ai-center padding-bottom-10>
        <SVG
          source={LogoSVG}
          width={40}
          height={40}
          style={{marginLeft: SCREEN_PADDING}}
        />
        <View style={{paddingRight: SCREEN_PADDING}}>
          <SVG
            onPress={nav => nav.navigate('C000', {key: 'C000'})}
            source={ActiveNotificationSVG}
            width={40}
            height={40}
          />
        </View>
      </View>
    </SafeContainer>
  );
};

export default Header;
