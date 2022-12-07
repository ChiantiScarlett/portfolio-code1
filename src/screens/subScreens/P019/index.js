import React from 'react';
import {View, Text, SVG} from '@components/core';
import ViewContainer from '@components/viewContainer';
import styles from '@app/styles';

import GoBackHeader from '@components/goBackHeader';
import ProductCard from '@screens/initialRoutes/main/P002/productCard';
import {observer} from 'mobx-react-lite';
import useGlobalState from '@core/globalState';
import ImageSVG from './image.svg';

const Component = observer(() => {
  const {userState, storeState} = useGlobalState();
  const {favoriteProductIDList} = userState.userDocument;
  const {originalProductGroupList} = storeState;

  return (
    <ViewContainer
      backgroundColor={styles.COLOR_MAIN5}
      HeaderComponent={() => (
        <GoBackHeader pageName="P019" title="찜한 상품" />
      )}>
      {originalProductGroupList.filter(item =>
        favoriteProductIDList.includes(item.productDocument.id),
      ).length === 0 && (
        <View margin-top-50 ai-center>
          <View margin-top-50 />
          <SVG source={ImageSVG} width={200} height={200} />
          <View margin-top-20 />
          <Text
            regular
            medium
            acro6
            word-wrap
            word-wrap-line-height={24}
            word-wrap-center>
            {[
              '찜한 상품이 없어요!',
              '스토어에서 마음에 드는 상품을 찜해보세요!',
            ].join('\n')}
          </Text>
        </View>
      )}
      {originalProductGroupList
        .filter(item => favoriteProductIDList.includes(item.productDocument.id))
        ?.map((item, idx) => (
          <ProductCard productGroup={item} key={idx} isFirstItem={idx === 0} />
        ))}
    </ViewContainer>
  );
});

const options = {
  headerShown: false,
};

export default {Component, options};
