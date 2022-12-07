import {View, Text, SVG} from '@components/core';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react-lite';
import React from 'react';
import FilterSVG from './filter.svg';
import {Keyboard} from 'react-native';
import useGlobalState from '@core/globalState';

const Cloud = props => {
  const {text} = props;
  return (
    <View
      border-all
      margin-right-10
      jc-center
      style={{borderRadius: 30, padding: 6, paddingHorizontal: 10}}>
      <Text small acro6 regular>
        {text}
      </Text>
    </View>
  );
};

Cloud.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
};

const FilterRow = observer(() => {
  const {storeState} = useGlobalState();
  const {currentSorting, currentFilters} = storeState;

  /**
   * 필터 아이콘을 눌렀을 때 실행할 함수입니다.
   * - 키보드를 닫습니다.
   * - 필터 드로어를 엽니다.
   */
  const onFilterPress = nav => {
    Keyboard.dismiss();
    nav.openDrawer();
  };

  return (
    <View hor-pad flex-row onPress={onFilterPress}>
      <View flex-1-0 ai-center jc-flex-start flex-row>
        <Cloud text={currentSorting} />
        {currentFilters.map((item, idx) => (
          <Cloud key={idx} text={item} />
        ))}
      </View>
      <SVG
        source={FilterSVG}
        width={40}
        height={40}
        style={{paddingLeft: 20}}
      />
    </View>
  );
});

export default FilterRow;
