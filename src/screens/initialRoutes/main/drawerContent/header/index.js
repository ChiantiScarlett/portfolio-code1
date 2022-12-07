import React from 'react';
import PropTypes from 'prop-types';

import ResetSVG from './reset.svg';
import CloseSVG from './close.svg';
import {SVG, Text, View} from '@components/core';
import styles from '@app/styles';
import useGlobalState from '@core/globalState';
import {
  FILTER_MAX_INDEX,
  FILTER_MAX_PRICE,
  FILTER_MIN_INDEX,
  FILTER_MIN_PRICE,
  SORT_KEY,
} from '@app/static.store';

const Header = ({onPress}) => {
  const {storeState} = useGlobalState();

  const onReset = () => {
    storeState.set({
      // originalProductGroupList: types.maybeNull(types.array(ProductGroup)),
      // filteredProductGroupList: types.maybeNull(types.array(ProductGroup)),
      // isLoading: types.optional(types.boolean, true),
      // cycleList: types.maybeNull(types.array(CycleDocument)),

      currentKeyword: '',
      currentSorting: SORT_KEY.PRICE_ASC,
      currentFilters: [],
      currentBeginIndexRange: FILTER_MIN_INDEX,
      currentEndIndexRange: FILTER_MAX_INDEX,
      currentBeginPriceRange: FILTER_MIN_PRICE,
      currentEndPriceRange: FILTER_MAX_PRICE,
    });
  };

  return (
    <View flex-row jc-center ai-center margin-bottom-20>
      {/** 왼쪽 그룹: */}
      <View flex-row flex-1-0 ai-center>
        {/* 제목 */}
        <Text title acro6 xlarge margin-right-10 margin-left-20>
          {'필터'}
        </Text>
        {/** 초기화 버튼 */}
        <View
          flex-row
          ai-center
          border-all
          style={{
            borderColor: styles.COLOR_MAIN1,
            borderRadius: 30,
            padding: 4,
            paddingHorizontal: 10,
            alignSelf: 'center',
          }}
          onPress={onReset}>
          <Text main1 regular xsmall margin-right-5>
            {'초기화'}
          </Text>
          <SVG width={12} height={12} source={ResetSVG} />
        </View>
      </View>
      {/** 닫기 아이콘: */}
      <SVG
        source={CloseSVG}
        width={36}
        height={36}
        style={{paddingRight: 20}}
        onPress={nav => nav.goBack()}
      />
    </View>
  );
};
Header.propTypes = {onPress: PropTypes.func};

export default Header;
