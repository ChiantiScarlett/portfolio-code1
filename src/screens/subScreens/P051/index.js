import React from 'react';
import ViewContainer from '@components/viewContainer';

import GoBackHeader from '@components/goBackHeader';

import Image1JPG from './images/image1.jpg';
import Image2JPG from './images/image2.jpg';
import Image3JPG from './images/image3.jpg';
import FastImage from 'react-native-fast-image';

const Component = () => {
  return (
    <ViewContainer
      HeaderComponent={() => (
        <GoBackHeader pageName="P051" title="캐릭터 소개" />
      )}>
      <FastImage
        style={{width: '100%', aspectRatio: 880 / 1334}}
        resizeMode={'cover'}
        source={Image1JPG}
      />
      <FastImage
        style={{width: '100%', aspectRatio: 880 / 2178}}
        resizeMode={'cover'}
        source={Image2JPG}
      />
      <FastImage
        style={{width: '100%', aspectRatio: 880 / 1755}}
        resizeMode={'cover'}
        source={Image3JPG}
      />
    </ViewContainer>
  );
};

const options = {
  headerShown: false,
};

export default {Component, options};
