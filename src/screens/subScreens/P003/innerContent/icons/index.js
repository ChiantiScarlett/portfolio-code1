import React from 'react';
import PropTypes from 'prop-types';
import BugType from './type_bug.jpg';
import NormalType from './type_normal.png';
import WaterType from './type_water.png';
import FireType from './type_fire.png';
import FlyingType from './type_flying.jpg';
import PoisonType from './type_poison.jpg';
import DarkType from './type_dark.jpg';
import GrassType from './type_grass.png';

import {LocalImage} from '@components/core';

const TAG_SIZE = 90;

const Tag = ({tagName}) => {
  const itemStyle = {
    borderRadius: TAG_SIZE,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    width: TAG_SIZE,
    height: TAG_SIZE,
  };

  switch (tagName) {
    case 'TYPE_BUG':
      return <LocalImage style={itemStyle} source={BugType} />;
    case 'TYPE_NORMAL':
      return <LocalImage style={itemStyle} source={NormalType} />;
    case 'TYPE_WATER':
      return <LocalImage style={itemStyle} source={WaterType} />;
    case 'TYPE_FIRE':
      return <LocalImage style={itemStyle} source={FireType} />;
    case 'TYPE_FLYING':
      return <LocalImage style={itemStyle} source={FlyingType} />;
    case 'TYPE_POISON':
      return <LocalImage style={itemStyle} source={PoisonType} />;
    case 'TYPE_DARK':
      return <LocalImage style={itemStyle} source={DarkType} />;
    case 'TYPE_GRASS':
      return <LocalImage style={itemStyle} source={GrassType} />;

    default:
      // 그 외의 경우, null 값을 반환합니다.
      return null;
  }
};

Tag.propTypes = {
  tagName: PropTypes.string,
};

export default Tag;
