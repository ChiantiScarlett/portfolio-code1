import PropTypes from 'prop-types';
import {SVG, Text, View} from '@components/core';
import React from 'react';
import GoBackSVG from './goBack.svg';
import HeartSVG from './heart.svg';
import EmptyHeartSVG from './emptyHeart.svg';
import triggerHaptic from '@functions/triggerHaptic';
import {observer} from 'mobx-react-lite';
import useGlobalState from '@core/globalState';

const Header = observer(props => {
  const {userState, productDetailState} = useGlobalState();
  const {userDocument} = userState;
  const {productDocument} = productDetailState;

  /** 하트 토글링 로직입니다: */
  const onHeartPress = async () => {
    triggerHaptic();
    await userDocument.toggleFavorite(productDocument?.id);
  };
  return (
    <View
      flex-row
      jc-space-between
      ai-center
      style={{
        height: props.height,
      }}>
      <View padding-left-20 onPress={nav => nav.goBack()}>
        <SVG source={GoBackSVG} width={20} height={20} />
      </View>
      <View padding-right-20 onPress={onHeartPress}>
        <SVG
          onPress={onHeartPress}
          source={
            userDocument.favoriteProductIDList.includes(productDocument?.id)
              ? HeartSVG
              : EmptyHeartSVG
          }
          width={20}
          height={20}
        />
      </View>
    </View>
  );
});

Header.propTypes = {
  height: PropTypes.number,
  productID: PropTypes.string,
};

export default Header;
