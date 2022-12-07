import React from 'react';
import {View, Text} from '@components/core';
import ViewContainer from '@components/viewContainer';
import {DASHBOARD_KEY} from '../P049/static';

import GoBackHeader from '@components/goBackHeader';
import EnterInMenu from '@components/enterInMenu';

const Component = () => {
  return (
    <ViewContainer
      HeaderComponent={() => <GoBackHeader pageName="P048" title="게시판" />}>
      <View main5 style={{height: 10}} />
      <EnterInMenu
        title={'구독 서비스 안내'}
        onPress={nav => {
          nav.navigate('P049', {
            key: 'P049',
            dashboardKey: DASHBOARD_KEY.SUBSCRIPTION_INTRO,
          });
        }}
        isFirstItem
      />
      <EnterInMenu
        title={'교환 규정'}
        onPress={nav => {
          nav.navigate('P049', {
            key: 'P049',
            dashboardKey: DASHBOARD_KEY.REFUND_POLICY,
          });
        }}
      />
      <EnterInMenu
        title={'FAQ (자주 묻는 질문)'}
        onPress={nav => {
          nav.navigate('P049', {
            key: 'P049',
            dashboardKey: DASHBOARD_KEY.FAQ,
          });
        }}
      />
      <EnterInMenu
        title={'렌즈 관리 및 착용법'}
        onPress={nav => {
          nav.navigate('P049', {
            key: 'P049',
            dashboardKey: DASHBOARD_KEY.LENS,
          });
        }}
      />
      <EnterInMenu
        title={'SEEYA (캐릭터 소개)'}
        onPress={nav => {
          nav.navigate('P051', {
            key: 'P051',
          });
        }}
      />
    </ViewContainer>
  );
};

const options = {
  headerShown: false,
};

export default {Component, options};
