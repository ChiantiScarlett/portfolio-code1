import {Image, SVG, Text, View} from '@components/core';
import PropTypes from 'prop-types';
import React from 'react';
import HeartSVG from './heart.svg';
import EmptyHeartSVG from './emptyHeart.svg';
import {IMAGE_PLACEHOLDER_URI} from '@app/static';
import addComma from '@functions/addComma';
import {toJS} from 'mobx';
import useGlobalState from '@core/globalState';
import {observer} from 'mobx-react-lite';
import triggerHaptic from '@functions/triggerHaptic';

const ProductCard = observer(props => {
  const {userState} = useGlobalState();
  const {userDocument} = userState;
  const {productGroup, isFirstItem} = props;
  const {productDocument, productReviewSummaryDocument} = productGroup;

  /* 찜하기 버튼을 눌렀을 때의 동작을 정의합니다. */
  const onHeartPress = async () => {
    triggerHaptic();
    await userDocument.toggleFavorite(productDocument.id);
  };

  return (
    <View
      border-bottom
      style={isFirstItem ? {borderTopWidth: 0.5} : undefined}
      onPress={nav =>
        nav.navigate('P003', {
          key: 'P003',
          params: {
            productDocument: toJS(productDocument),
            productReviewSummaryDocument: toJS(productReviewSummaryDocument),
          },
        })
      }>
      {/** Heart Row: */}
      <View ai-flex-end>
        <SVG
          source={
            userDocument.favoriteProductIDList.includes(productDocument.id)
              ? HeartSVG
              : EmptyHeartSVG
          }
          width={40}
          height={40}
          style={{paddingRight: 20}}
          onPress={onHeartPress}
        />
      </View>

      {/** Main Row: */}
      <View flex-row ai-center hor-pad>
        <Image
          width={120}
          sourceURI={productDocument.image.photoList[0]}
          fallbackURI={IMAGE_PLACEHOLDER_URI}
          aspectRatio="wide"
        />
        <View margin-left-10>
          <Text acro5 xsmall regular>
            {productDocument.topDescription}
          </Text>
          <Text acro6 medium regular>
            {productDocument.name}
          </Text>
        </View>
      </View>

      {/** Bottom Row */}
      <View
        flex-row
        hor-pad
        margin-top-10
        jc-space-between
        ai-flex-end
        margin-bottom-10>
        {/** Tag: */}
        <View
          main4
          style={{paddingHorizontal: 4, paddingTop: 2, borderRadius: 30}}>
          <Text
            regular
            acro5
            xsmall>{`리뷰 ${productReviewSummaryDocument.count}`}</Text>
        </View>

        {/** 가격 정보: */}
        <View>
          {!!productDocument.M && (
            <View flex-row ai-flex-end margin-top-10>
              <Text title acro5 xsmall>{`근시`}</Text>
              <Text script acro6 medium style={{marginLeft: 4}}>{`${addComma(
                productDocument.M.price,
              )}원`}</Text>
              <Text xsmall regular acro5>
                {' / 1box'}
              </Text>
            </View>
          )}
          {!!productDocument.A && (
            <View flex-row ai-flex-end margin-top-10>
              {/* <Text title acro5 xsmall>{`난시`}</Text> */}
              <Text script acro6 medium style={{marginLeft: 4}}>{`${addComma(
                productDocument.A.price,
              )}원`}</Text>
              <Text xsmall regular acro5>
                {' / 1box'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
});

ProductCard.propTypes = {
  productGroup: PropTypes.shape({
    productDocument: PropTypes.object,
    productReviewSummaryDocument: PropTypes.object,
  }),
  isFirstItem: PropTypes.bool,
};

export default ProductCard;
