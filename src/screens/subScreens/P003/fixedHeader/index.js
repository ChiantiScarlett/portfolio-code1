import PropTypes from 'prop-types';
import {SVG, Text, View} from '@components/core';
import React from 'react';
import GoBackSVG from './goBack.svg';
import HeartSVG from './heart.svg';
import EmptyHeartSVG from './emptyHeart.svg';
import {Portal} from 'react-native-portalize';
import SafeContainer from '@components/safeContainer';
import {observer} from 'mobx-react';
import useGlobalState from '@core/globalState';

const FixedHeader = observer(() => {
  const {userState, productDetailState} = useGlobalState();
  const {productDocument} = productDetailState;
  const {userDocument} = userState;

  const onHeartPress = async () => {
    await userDocument.toggleFavorite(productDocument.id);
  };

  return (
    <Portal>
      <SafeContainer paddingOnTop>
        <View
          flex-row
          jc-space-between
          ai-center
          padding-bottom-20
          padding-top-20
          border-bottom>
          <View padding-left-20 onPress={nav => nav.goBack()}>
            <SVG source={GoBackSVG} width={20} height={20} />
          </View>
          <Text regular small acro6>
            {productDocument?.fullname}
          </Text>
          <View padding-right-20 onPress={onHeartPress}>
            <SVG
              onPress={onHeartPress}
              source={
                userDocument.favoriteProductIDList?.includes(productDocument.id)
                  ? HeartSVG
                  : EmptyHeartSVG
              }
              width={20}
              height={20}
            />
          </View>
        </View>
      </SafeContainer>
    </Portal>
  );
});

FixedHeader.propTypes = {
  height: PropTypes.number,
};

export default FixedHeader;
