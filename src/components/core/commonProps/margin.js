import PropTypes from 'prop-types';

const getStylesByProps = props => {
  let _styles = {};

  // margin-top-handling:
  if (props['margin-top-5']) {
    _styles['marginTop'] = 5;
  }
  if (props['margin-top-10']) {
    _styles['marginTop'] = 10;
  }
  if (props['margin-top-15']) {
    _styles['marginTop'] = 15;
  }
  if (props['margin-top-20']) {
    _styles['marginTop'] = 20;
  }
  if (props['margin-top-25']) {
    _styles['marginTop'] = 25;
  }
  if (props['margin-top-30']) {
    _styles['marginTop'] = 30;
  }
  if (props['margin-top-35']) {
    _styles['marginTop'] = 35;
  }
  if (props['margin-top-40']) {
    _styles['marginTop'] = 40;
  }
  if (props['margin-top-45']) {
    _styles['marginTop'] = 45;
  }
  if (props['margin-top-50']) {
    _styles['marginTop'] = 50;
  }
  if (props['margin-top-55']) {
    _styles['marginTop'] = 55;
  }
  if (props['margin-top-60']) {
    _styles['marginTop'] = 60;
  }

  // margin-left-handling:
  if (props['margin-left-5']) {
    _styles['marginLeft'] = 5;
  }
  if (props['margin-left-10']) {
    _styles['marginLeft'] = 10;
  }
  if (props['margin-left-15']) {
    _styles['marginLeft'] = 15;
  }
  if (props['margin-left-20']) {
    _styles['marginLeft'] = 20;
  }
  if (props['margin-left-25']) {
    _styles['marginLeft'] = 25;
  }
  if (props['margin-left-30']) {
    _styles['marginLeft'] = 30;
  }
  if (props['margin-left-35']) {
    _styles['marginLeft'] = 35;
  }
  if (props['margin-left-40']) {
    _styles['marginLeft'] = 40;
  }
  if (props['margin-left-45']) {
    _styles['marginLeft'] = 45;
  }
  if (props['margin-left-50']) {
    _styles['marginLeft'] = 50;
  }
  if (props['margin-left-55']) {
    _styles['marginLeft'] = 55;
  }
  if (props['margin-left-60']) {
    _styles['marginLeft'] = 60;
  }

  // margin-right-handling:
  if (props['margin-right-5']) {
    _styles['marginRight'] = 5;
  }
  if (props['margin-right-10']) {
    _styles['marginRight'] = 10;
  }
  if (props['margin-right-15']) {
    _styles['marginRight'] = 15;
  }
  if (props['margin-right-20']) {
    _styles['marginRight'] = 20;
  }
  if (props['margin-right-25']) {
    _styles['marginRight'] = 25;
  }
  if (props['margin-right-30']) {
    _styles['marginRight'] = 30;
  }
  if (props['margin-right-35']) {
    _styles['marginRight'] = 35;
  }
  if (props['margin-right-40']) {
    _styles['marginRight'] = 40;
  }
  if (props['margin-right-45']) {
    _styles['marginRight'] = 45;
  }
  if (props['margin-right-50']) {
    _styles['marginRight'] = 50;
  }
  if (props['margin-right-55']) {
    _styles['marginRight'] = 55;
  }
  if (props['margin-right-60']) {
    _styles['marginRight'] = 60;
  }

  // margin-bottom-handling:
  if (props['margin-bottom-5']) {
    _styles['marginBottom'] = 5;
  }
  if (props['margin-bottom-10']) {
    _styles['marginBottom'] = 10;
  }
  if (props['margin-bottom-15']) {
    _styles['marginBottom'] = 15;
  }
  if (props['margin-bottom-20']) {
    _styles['marginBottom'] = 20;
  }
  if (props['margin-bottom-25']) {
    _styles['marginBottom'] = 25;
  }
  if (props['margin-bottom-30']) {
    _styles['marginBottom'] = 30;
  }
  if (props['margin-bottom-35']) {
    _styles['marginBottom'] = 35;
  }
  if (props['margin-bottom-40']) {
    _styles['marginBottom'] = 40;
  }
  if (props['margin-bottom-45']) {
    _styles['marginBottom'] = 45;
  }
  if (props['margin-bottom-50']) {
    _styles['marginBottom'] = 50;
  }
  if (props['margin-bottom-55']) {
    _styles['marginBottom'] = 55;
  }
  if (props['margin-bottom-60']) {
    _styles['marginBottom'] = 60;
  }

  return _styles;
};

const propTypes = {
  'margin-top-5': PropTypes.bool,
  'margin-top-10': PropTypes.bool,
  'margin-top-15': PropTypes.bool,
  'margin-top-20': PropTypes.bool,
  'margin-top-25': PropTypes.bool,
  'margin-top-30': PropTypes.bool,
  'margin-top-35': PropTypes.bool,
  'margin-top-40': PropTypes.bool,
  'margin-top-45': PropTypes.bool,
  'margin-top-50': PropTypes.bool,
  'margin-top-55': PropTypes.bool,
  'margin-top-60': PropTypes.bool,

  'margin-bottom-5': PropTypes.bool,
  'margin-bottom-10': PropTypes.bool,
  'margin-bottom-15': PropTypes.bool,
  'margin-bottom-20': PropTypes.bool,
  'margin-bottom-25': PropTypes.bool,
  'margin-bottom-30': PropTypes.bool,
  'margin-bottom-35': PropTypes.bool,
  'margin-bottom-40': PropTypes.bool,
  'margin-bottom-45': PropTypes.bool,
  'margin-bottom-50': PropTypes.bool,
  'margin-bottom-55': PropTypes.bool,
  'margin-bottom-60': PropTypes.bool,

  'margin-right-5': PropTypes.bool,
  'margin-right-10': PropTypes.bool,
  'margin-right-15': PropTypes.bool,
  'margin-right-20': PropTypes.bool,
  'margin-right-25': PropTypes.bool,
  'margin-right-30': PropTypes.bool,
  'margin-right-35': PropTypes.bool,
  'margin-right-40': PropTypes.bool,
  'margin-right-45': PropTypes.bool,
  'margin-right-50': PropTypes.bool,
  'margin-right-55': PropTypes.bool,
  'margin-right-60': PropTypes.bool,

  'margin-left-5': PropTypes.bool,
  'margin-left-10': PropTypes.bool,
  'margin-left-15': PropTypes.bool,
  'margin-left-20': PropTypes.bool,
  'margin-left-25': PropTypes.bool,
  'margin-left-30': PropTypes.bool,
  'margin-left-35': PropTypes.bool,
  'margin-left-40': PropTypes.bool,
  'margin-left-45': PropTypes.bool,
  'margin-left-50': PropTypes.bool,
  'margin-left-55': PropTypes.bool,
  'margin-left-60': PropTypes.bool,
};

const defaultPropTypes = {};

const margin = {
  propTypes,
  getStylesByProps,
  defaultPropTypes,
};

export default margin;
