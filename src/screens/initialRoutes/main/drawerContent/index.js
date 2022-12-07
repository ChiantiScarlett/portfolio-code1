import {View} from '@components/core';
import SafeContainer from '@components/safeContainer';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

import Slider from './slider';
import {
  DRAWER_CONTENT,
  FILTER_MAX_INDEX,
  FILTER_MAX_PRICE,
  FILTER_MIN_INDEX,
  FILTER_MIN_PRICE,
} from '@app/static.store';
import CollapsibleCell from './collapsibleCell';
import Header from './header';
import triggerHaptic from '@functions/triggerHaptic';
import useGlobalState from '@core/globalState';

const DrawerContent = () => {
  const {storeState} = useGlobalState();
  const {currentFilters} = storeState;

  const onIndexSlidingComplete = value => {
    triggerHaptic();
    storeState.set({
      currentBeginIndexRange: value[0],
      currentEndIndexRange: value[1],
    });
  };

  const onPriceSlidingComplete = value => {
    triggerHaptic();
    storeState.set({
      currentBeginPriceRange: value[0],
      currentEndPriceRange: value[1],
    });
  };

  const onSortPress = value => {
    triggerHaptic();

    storeState.set({
      currentSorting: value,
    });
  };

  const onFilterPress = value => {
    triggerHaptic();

    storeState.set({
      currentFilters: currentFilters.includes(value)
        ? [...currentFilters.filter(i => i !== value)]
        : [...currentFilters.concat([value])],
    });
  };

  return (
    <SafeContainer paddingOnTop>
      <Header />
      <ScrollView>
        <CollapsibleCell
          onCellPress={onSortPress}
          title={'정렬'}
          data={DRAWER_CONTENT.SORT}
        />
        <Space />
        <CollapsibleCell
          onCellPress={onFilterPress}
          title={'타입'}
          data={DRAWER_CONTENT.TYPE}
        />
        <Space />
        <Slider
          title="도감 번호"
          onSlidingComplete={onIndexSlidingComplete}
          lowerBoundKey={'currentBeginIndexRange'}
          upperBoundKey={'currentEndIndexRange'}
          lowerLimit={FILTER_MIN_INDEX}
          upperLimit={FILTER_MAX_INDEX}
          step={1}
          suffix="번"
        />
        <Space />
        <Slider
          title="가격 범위"
          onSlidingComplete={onPriceSlidingComplete}
          lowerBoundKey={'currentBeginPriceRange'}
          upperBoundKey={'currentEndPriceRange'}
          lowerLimit={FILTER_MIN_PRICE}
          upperLimit={FILTER_MAX_PRICE}
          step={1000}
          suffix="원"
        />
      </ScrollView>
    </SafeContainer>
  );
};

const Space = () => <View padding-bottom-10 main5 />;
export default DrawerContent;
