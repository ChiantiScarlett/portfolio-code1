import React from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {useSystem} from '@core/system';
import {View} from '@components/core';

const TopImage = observer(({SVGImage, description}) => {
  const {styles} = useSystem();

  return (
    <Container with={[styles.USE_BACKGROUND_MAIN5]}>
      <View margin-top-20 />
      <Text
        with={[
          styles.USE_FONT_SIZE_MEDIUM,
          styles.USE_FF_REGULAR,
          styles.USE_COLOR_ACRO6,
        ]}>
        {description}
      </Text>
      <View margin-top-20 />
      <Image>
        <SVGImage width="100%" height="100%" />
      </Image>
      <View margin-top-20 />
    </Container>
  );
});

const Container = styled(HOCView)`
  flex: 1 0;
`;

const Text = styled(HOCText)`
  text-align: center;
`;

const Image = styled(HOCView)`
  width: 176px;
  aspect-ratio: 1;
  align-self: center;
`;

export default TopImage;
