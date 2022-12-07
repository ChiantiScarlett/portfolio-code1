import React from 'react';
import Collapsible from 'react-native-collapsible';
import PropTypes from 'prop-types';
import {View, Text, SVG} from '@components/core';
import UncollapseSVG from './uncollapse.svg';
import CollapseSVG from './collapse.svg';
import {observer} from 'mobx-react-lite';
import useGlobalState from '@core/globalState';
import styles from '@app/styles';

const CollapsibleCell = observer(props => {
  const {storeState} = useGlobalState();
  const {activeCellList} = storeState;

  const {title, onCellPress} = props;
  const data = props.data.concat([{label: '', value: 'NULL'}]);
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <>
      <View
        padding-top-10
        padding-bottom-10
        hor-pad
        flex-row
        jc-space-between
        ai-center
        border-top
        border-bottom
        onPress={() => setCollapsed(!collapsed)}>
        <Text title acro6 medium>
          {title}
        </Text>
        <SVG
          width={14}
          height={14}
          source={collapsed ? CollapseSVG : UncollapseSVG}
        />
      </View>
      <Collapsible collapsed={collapsed}>
        {new Array(parseInt(data.length / 2)).fill(null).map((_, idx) => (
          <View flex-row border-bottom key={idx}>
            <View
              containerStyle={{flex: 1}}
              border-right
              flex-1-0
              ai-center
              style={{
                backgroundColor: activeCellList.includes(data[2 * idx].value)
                  ? styles.COLOR_MAIN1
                  : styles.COLOR_ACRO1,
              }}
              onPress={() => onCellPress(data[2 * idx].value)}>
              <Text
                regular
                small
                acro6
                padding-bottom-10
                padding-top-10
                style={{
                  color: activeCellList.includes(data[2 * idx].value)
                    ? styles.COLOR_ACRO1
                    : styles.COLOR_ACRO6,
                }}>
                {data[2 * idx].label}
              </Text>
            </View>
            <View
              containerStyle={{flex: 1}}
              flex-1-0
              ai-center
              style={{
                backgroundColor: activeCellList.includes(
                  data[2 * idx + 1].value,
                )
                  ? styles.COLOR_MAIN1
                  : styles.COLOR_ACRO1,
              }}
              onPress={() => onCellPress(data[2 * idx + 1].value)}>
              <Text
                regular
                small
                acro6
                padding-bottom-10
                padding-top-10
                style={{
                  color: activeCellList.includes(data[2 * idx + 1].value)
                    ? styles.COLOR_ACRO1
                    : styles.COLOR_ACRO6,
                }}>
                {data[2 * idx + 1].label}
              </Text>
            </View>
          </View>
        ))}
      </Collapsible>
    </>
  );
});
CollapsibleCell.propTypes = {
  title: PropTypes.string,
  onCellPress: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.symbol]),
    }),
  ),
};

export default CollapsibleCell;
