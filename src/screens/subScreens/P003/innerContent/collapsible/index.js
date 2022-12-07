import {View, Text, SVG} from '@components/core';
import React from 'react';
import CollapseSVG from './collapse.svg';
import UncollapseSVG from './uncollapse.svg';
import PropTypes from 'prop-types';
import RNCollapsible from 'react-native-collapsible';

/** 접기 펼치기가 가능한 컴포넌트입니다. */
const Collapsible = ({children, title}) => {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <View border-bottom padding-top-10 padding-bottom-10>
      {/** 헤더: */}
      <View
        hor-pad
        jc-space-between
        flex-row
        ai-center
        padding-top-10
        padding-bottom-10
        onPress={() => setCollapsed(!collapsed)}>
        <Text bold medium acro6>
          {title}
        </Text>
        <SVG
          source={collapsed ? CollapseSVG : UncollapseSVG}
          width={20}
          height={20}
          style={{paddingBottom: 3, paddingLeft: 3, paddingTop: 3}}
        />
      </View>
      <RNCollapsible collapsed={collapsed}>
        <View margin-top-20>{children}</View>
      </RNCollapsible>
    </View>
  );
};

Collapsible.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  collapsedOnDefault: PropTypes.bool,
};

Collapsible.defaultProps = {
  collapsedOnDefault: true,
  title: '',
};

export default Collapsible;
