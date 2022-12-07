import React from 'react';
import {SVG, View, Text} from '@components/core';
import ImageSVG from './image.svg';

const Component = () => {
  return (
    <View flex-1-0 ai-center jc-center margin-bottom-50>
      <SVG source={ImageSVG} width={150} height={150} />
      <Text acro6 regular medium margin-top-20>
        {'해당 페이지는 비활성화 되어있어요!'}
      </Text>
    </View>
  );
};

const options = {
  headerShown: false,
  presentation: 'modal',
};

export default {Component, options};
