import React from 'react';
import ViewContainer from '@components/viewContainer';
import {observer} from 'mobx-react-lite';
import useGlobalState from '@core/globalState';
import Header from './header';
import ProductCard from './productCard';
import firestore from '@react-native-firebase/firestore';
import FadeInOut from 'react-native-fade-in-out';
import {REVERSED_FILTER_KEY, SORT_KEY} from '@app/static.store';
import {toJS} from 'mobx';

const Component = observer(() => {
  const {storeState} = useGlobalState();
  const {
    currentKeyword,
    filteredProductGroupList,
    originalProductGroupList,
    currentSorting,
    currentFilters,
    activeCellList,
    rangeChecksum,
    currentBeginIndexRange,
    currentEndIndexRange,
    currentBeginPriceRange,
    currentEndPriceRange,
  } = storeState;

  React.useEffect(() => {
    prepareP002(storeState);
  }, []);

  /** 정렬 옵션, 필터 옵션 등이 변경될 때마다, 데이터를 업데이트합니다. */
  React.useEffect(() => {
    if (originalProductGroupList === null) return;

    let data = toJS(originalProductGroupList);

    // 키워드로 거르기:
    if (currentKeyword) {
      let newData = [];
      for (const item of data) {
        if (item.productDocument.searchKeys.includes(currentKeyword)) {
          newData.push(item);
        }
      }
      data = newData;
    }

    // 필터로 거르기:
    if (currentFilters.length !== 0) {
      let newData = [];
      for (const item of data) {
        const keyString = item.productDocument.filterKeys.join('___');
        for (const currentFilter of currentFilters) {
          if (keyString.includes(REVERSED_FILTER_KEY[currentFilter])) {
            newData.push(item);
            break;
          }
        }
      }
      data = newData;
    }

    // 정렬하기:
    data = sortData(data, currentSorting);

    // 가격 범위 반영:
    data = data.filter(item => {
      const price = item.productDocument.eyesight.find(
        i => i.type === 'A',
      ).price;
      return currentBeginPriceRange <= price && price <= currentEndPriceRange;
    });

    // 도감 번호 범위 반영:
    data = data.filter(item => {
      const indexNumber = parseInt(
        item.productDocument.filterKeys
          .find(tag => tag.startsWith('INDEX_'))
          .slice('INDEX_'.length),
      );
      return (
        currentBeginIndexRange <= indexNumber &&
        indexNumber <= currentEndIndexRange
      );
    });

    // 데이터 업데이트:
    storeState.set({
      filteredProductGroupList: toJS(data),
    });
  }, [activeCellList, rangeChecksum, currentKeyword]);

  return (
    <ViewContainer HeaderComponent={Header}>
      {/** 로딩 상태일 때:  */}
      <FadeInOut visible={!storeState.isLoading}>
        {filteredProductGroupList?.map((item, idx) => (
          <ProductCard productGroup={item} key={idx} isFirstItem={idx === 0} />
        ))}
      </FadeInOut>
    </ViewContainer>
  );
});

const sortData = (data, sortKey) => {
  const getPrice = data => {
    return data.productDocument.eyesight.find(item => item.type === 'A').price;
  };
  const getPokedexNumber = data => {
    const indexKey = data.productDocument.filterKeys
      .find(key => key.startsWith('INDEX_'))
      .slice('INDEX_'.length);
    return parseInt(indexKey);
  };

  switch (sortKey) {
    case SORT_KEY.INDEX_ASC:
      return data.sort((a, b) => {
        return getPokedexNumber(a) - getPokedexNumber(b);
      });
    case SORT_KEY.INDEX_DESC:
      return data.sort((a, b) => getPokedexNumber(b) - getPokedexNumber(a));
    case SORT_KEY.PRICE_ASC:
      return data.sort((a, b) => getPrice(a) - getPrice(b));
    case SORT_KEY.PRICE_DESC:
      return data.sort((a, b) => getPrice(b) - getPrice(a));
  }
};

export const prepareP002 = async storeState => {
  /**
   * 상품과 구독에 관한 데이터를 로드합니다.
   */

  // 사이클 리스트를 가져옵니다.
  const cycleList = (await firestore().collection('Cycles').get()).docs.map(
    item => ({...item.data(), id: item.id}),
  );

  // 상품 데이터를 가져옵니다. (최초 정렬은 가격 오름차순으로 합니다.):
  const productList = (
    await firestore().collection('Products').where('isPublic', '==', true).get()
  ).docs
    .map(item => ({...item.data(), id: item.id}))
    .sort(
      (a, b) =>
        a.eyesight.find(i => i.type === 'A')?.price -
        b.eyesight.find(i => i.type === 'A')?.price,
    );

  let productGroupList = [];

  // 상품에 매칭되는 리뷰 ID를 토대로 데이터를 가져옵니다.
  for (const product of productList) {
    const doc = await firestore()
      .collection('ProductReviewSummaries')
      .doc(product.productReviewSummaryID)
      .get();
    productGroupList.push({
      productDocument: product,
      productReviewSummaryDocument: {...doc.data(), id: doc.id},
    });
  }

  storeState.set({
    originalProductGroupList: productGroupList,
    filteredProductGroupList: productGroupList,
    cycleList: cycleList,
    isLoading: false,
  });
};

export default Component;
