import {Image, SVG, Text, View} from '@components/core';
import SafeContainer from '@components/safeContainer';
import useGlobalState from '@core/globalState';
import React from 'react';

import ActiveNotificationSVG from './activeNotification.svg';
import InactiveNotificationSVG from './inactiveNotification.svg';
import EnterInSVG from './enterIn.svg';
import {SCREEN_PADDING} from '@app/static';
import {observer} from 'mobx-react';

const Header = observer(() => {
  const {common, userState} = useGlobalState();
  const {avatarImageType} = common;
  const {avatarDocument} = userState;

  // 아바타 문서가 완료될 때까지 기다립니다.
  if (avatarDocument === null) return null;

  return (
    <SafeContainer paddingOnTop>
      {/** 닉네임 영역입니다: */}
      <View
        onPress={nav => nav.navigate('C000', {key: 'C000'})}
        flex-row
        jc-space-between
        ai-center
        border-bottom
        style={{paddingBottom: 10}}>
        <View flex-row ai-center flex-1-0 style={{paddingLeft: SCREEN_PADDING}}>
          <Image
            border-all
            sourceURI={avatarImageType[avatarDocument.imageType]}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40,
            }}
            aspectRatio={'square'}
          />
          <Text title large acro6 margin-left-10>
            {`${avatarDocument.username} 님`}
          </Text>
          <SVG
            width={10}
            height={10}
            source={EnterInSVG}
            style={{marginLeft: 5}}
          />
        </View>
        {/** 노티 영역입니다: */}
        <View
          onPress={nav => nav.navigate('C000')}
          style={{
            height: 40,
            paddingRight: SCREEN_PADDING,
            width: 80,
            alignItems: 'flex-end',
          }}>
          <SVG source={ActiveNotificationSVG} width={40} height={40} />
        </View>
        {/* <SVG source={InactiveNotificationSVG} width={30} height={30} /> */}
      </View>
    </SafeContainer>
  );
});

export default Header;
