import React from 'react';
import {View, SVG} from '@components/core';
import ViewContainer from '@components/viewContainer';
import GoBackHeader from '@components/goBackHeader';
import {useRoute} from '@react-navigation/native';

const Component = () => {
  const {SVGList, title} = useRoute().params;
  return (
    <ViewContainer
      HeaderComponent={() => <GoBackHeader pageName="P050" title={title} />}>
      {SVGList.map((item, idx) => (
        <View
          margin-top-20
          margin-bottom-50
          key={idx}
          style={{paddingLeft: 40, paddingRight: 40}}>
          <SVG source={item.image} style={{aspectRatio: item.aspectRatio}} />
        </View>
      ))}
    </ViewContainer>
  );
};

const options = {
  headerShown: false,
};

export default {Component, options};
