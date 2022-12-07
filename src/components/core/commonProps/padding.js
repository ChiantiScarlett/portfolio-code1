import {SCREEN_PADDING} from '@app/static';
import PropTypes from 'prop-types';

const getStylesByProps = props => {
  let _styles = {};

  // horizontal padding:
  if (props['hor-pad']) {
    _styles['paddingHorizontal'] = SCREEN_PADDING;
  }

  // padding-top-handling:
  if (props['padding-top-5']) {
    _styles['paddingTop'] = 5;
  }
  if (props['padding-top-10']) {
    _styles['paddingTop'] = 10;
  }
  if (props['padding-top-15']) {
    _styles['paddingTop'] = 15;
  }
  if (props['padding-top-20']) {
    _styles['paddingTop'] = 20;
  }
  if (props['padding-top-25']) {
    _styles['paddingTop'] = 25;
  }
  if (props['padding-top-30']) {
    _styles['paddingTop'] = 30;
  }
  if (props['padding-top-35']) {
    _styles['paddingTop'] = 35;
  }
  if (props['padding-top-40']) {
    _styles['paddingTop'] = 40;
  }
  if (props['padding-top-45']) {
    _styles['paddingTop'] = 45;
  }
  if (props['padding-top-50']) {
    _styles['paddingTop'] = 50;
  }
  if (props['padding-top-55']) {
    _styles['paddingTop'] = 55;
  }
  if (props['padding-top-60']) {
    _styles['paddingTop'] = 60;
  }

  // padding-left-handling:
  if (props['padding-left-5']) {
    _styles['paddingLeft'] = 5;
  }
  if (props['padding-left-10']) {
    _styles['paddingLeft'] = 10;
  }
  if (props['padding-left-15']) {
    _styles['paddingLeft'] = 15;
  }
  if (props['padding-left-20']) {
    _styles['paddingLeft'] = 20;
  }
  if (props['padding-left-25']) {
    _styles['paddingLeft'] = 25;
  }
  if (props['padding-left-30']) {
    _styles['paddingLeft'] = 30;
  }
  if (props['padding-left-35']) {
    _styles['paddingLeft'] = 35;
  }
  if (props['padding-left-40']) {
    _styles['paddingLeft'] = 40;
  }
  if (props['padding-left-45']) {
    _styles['paddingLeft'] = 45;
  }
  if (props['padding-left-50']) {
    _styles['paddingLeft'] = 50;
  }
  if (props['padding-left-55']) {
    _styles['paddingLeft'] = 55;
  }
  if (props['padding-left-60']) {
    _styles['paddingLeft'] = 60;
  }

  // padding-right-handling:
  if (props['padding-right-5']) {
    _styles['paddingRight'] = 5;
  }
  if (props['padding-right-10']) {
    _styles['paddingRight'] = 10;
  }
  if (props['padding-right-15']) {
    _styles['paddingRight'] = 15;
  }
  if (props['padding-right-20']) {
    _styles['paddingRight'] = 20;
  }
  if (props['padding-right-25']) {
    _styles['paddingRight'] = 25;
  }
  if (props['padding-right-30']) {
    _styles['paddingRight'] = 30;
  }
  if (props['padding-right-35']) {
    _styles['paddingRight'] = 35;
  }
  if (props['padding-right-40']) {
    _styles['paddingRight'] = 40;
  }
  if (props['padding-right-45']) {
    _styles['paddingRight'] = 45;
  }
  if (props['padding-right-50']) {
    _styles['paddingRight'] = 50;
  }
  if (props['padding-right-55']) {
    _styles['paddingRight'] = 55;
  }
  if (props['padding-right-60']) {
    _styles['paddingRight'] = 60;
  }

  // padding-bottom-handling:
  if (props['padding-bottom-5']) {
    _styles['paddingBottom'] = 5;
  }
  if (props['padding-bottom-10']) {
    _styles['paddingBottom'] = 10;
  }
  if (props['padding-bottom-15']) {
    _styles['paddingBottom'] = 15;
  }
  if (props['padding-bottom-20']) {
    _styles['paddingBottom'] = 20;
  }
  if (props['padding-bottom-25']) {
    _styles['paddingBottom'] = 25;
  }
  if (props['padding-bottom-30']) {
    _styles['paddingBottom'] = 30;
  }
  if (props['padding-bottom-35']) {
    _styles['paddingBottom'] = 35;
  }
  if (props['padding-bottom-40']) {
    _styles['paddingBottom'] = 40;
  }
  if (props['padding-bottom-45']) {
    _styles['paddingBottom'] = 45;
  }
  if (props['padding-bottom-50']) {
    _styles['paddingBottom'] = 50;
  }
  if (props['padding-bottom-55']) {
    _styles['paddingBottom'] = 55;
  }
  if (props['padding-bottom-60']) {
    _styles['paddingBottom'] = 60;
  }

  return _styles;
};

const propTypes = {
  'hor-pad': PropTypes.bool,

  'padding-top-5': PropTypes.bool,
  'padding-top-10': PropTypes.bool,
  'padding-top-15': PropTypes.bool,
  'padding-top-20': PropTypes.bool,
  'padding-top-25': PropTypes.bool,
  'padding-top-30': PropTypes.bool,
  'padding-top-35': PropTypes.bool,
  'padding-top-40': PropTypes.bool,
  'padding-top-45': PropTypes.bool,
  'padding-top-50': PropTypes.bool,
  'padding-top-55': PropTypes.bool,
  'padding-top-60': PropTypes.bool,

  'padding-bottom-5': PropTypes.bool,
  'padding-bottom-10': PropTypes.bool,
  'padding-bottom-15': PropTypes.bool,
  'padding-bottom-20': PropTypes.bool,
  'padding-bottom-25': PropTypes.bool,
  'padding-bottom-30': PropTypes.bool,
  'padding-bottom-35': PropTypes.bool,
  'padding-bottom-40': PropTypes.bool,
  'padding-bottom-45': PropTypes.bool,
  'padding-bottom-50': PropTypes.bool,
  'padding-bottom-55': PropTypes.bool,
  'padding-bottom-60': PropTypes.bool,

  'padding-right-5': PropTypes.bool,
  'padding-right-10': PropTypes.bool,
  'padding-right-15': PropTypes.bool,
  'padding-right-20': PropTypes.bool,
  'padding-right-25': PropTypes.bool,
  'padding-right-30': PropTypes.bool,
  'padding-right-35': PropTypes.bool,
  'padding-right-40': PropTypes.bool,
  'padding-right-45': PropTypes.bool,
  'padding-right-50': PropTypes.bool,
  'padding-right-55': PropTypes.bool,
  'padding-right-60': PropTypes.bool,

  'padding-left-5': PropTypes.bool,
  'padding-left-10': PropTypes.bool,
  'padding-left-15': PropTypes.bool,
  'padding-left-20': PropTypes.bool,
  'padding-left-25': PropTypes.bool,
  'padding-left-30': PropTypes.bool,
  'padding-left-35': PropTypes.bool,
  'padding-left-40': PropTypes.bool,
  'padding-left-45': PropTypes.bool,
  'padding-left-50': PropTypes.bool,
  'padding-left-55': PropTypes.bool,
  'padding-left-60': PropTypes.bool,
};

const defaultPropTypes = {};

const padding = {
  propTypes,
  getStylesByProps,
  defaultPropTypes,
};

export default padding;
