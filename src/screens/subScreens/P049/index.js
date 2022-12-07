import React from 'react';
import {View, Text, SVG} from '@components/core';
import ViewContainer from '@components/viewContainer';

import GoBackHeader from '@components/goBackHeader';
import {useRoute} from '@react-navigation/native';
import {STATIC_DATA} from './static';
import EnterInMenu from '@components/enterInMenu';

const Component = () => {
  const {dashboardKey} = useRoute().params;
  const {title, description, thumbnailSVG, submenu} = STATIC_DATA[dashboardKey];

  return (
    <ViewContainer
      HeaderComponent={() => <GoBackHeader pageName="P049" title={title} />}>
      <View main5 padding-top-40 padding-bottom-40>
        <Text
          word-wrap
          word-wrap-line-height={20}
          regular
          medium
          acro6
          word-wrap-center>
          {description}
        </Text>
        <View margin-top-20 ai-center>
          <SVG source={thumbnailSVG} width={200} height={200} />
        </View>
      </View>
      {submenu.map((item, idx) => (
        <EnterInMenu
          key={idx}
          title={item.title}
          onPress={nav =>
            nav.navigate('P050', {
              SVGList: item.SVGList,
              title: item.title,
            })
          }
        />
      ))}
    </ViewContainer>
  );
};

const options = {
  headerShown: false,
};

export default {Component, options};
