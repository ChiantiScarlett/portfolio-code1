import PropTypes from 'prop-types';
import styles from '@app/styles';

const getStylesByProps = props => {
  let _styles = {};

  if (props['border-all']) {
    _styles['borderColor'] = styles.COLOR_BORDER;
    _styles['borderWidth'] = 0.5;
  }
  if (props['border-top']) {
    _styles['borderColor'] = styles.COLOR_BORDER;
    _styles['borderTopWidth'] = 0.5;
  }
  if (props['border-right']) {
    _styles['borderColor'] = styles.COLOR_BORDER;
    _styles['borderRightWidth'] = 0.5;
  }
  if (props['border-left']) {
    _styles['borderColor'] = styles.COLOR_BORDER;
    _styles['borderLeftWidth'] = 0.5;
  }
  if (props['border-bottom']) {
    _styles['borderColor'] = styles.COLOR_BORDER;
    _styles['borderBottomWidth'] = 0.5;
  }

  if (props['border-horizontal']) {
    _styles['borderColor'] = styles.COLOR_BORDER;
    _styles['borderTopWidth'] = 0.5;
    _styles['borderBottomWidth'] = 0.5;
  }

  if (props['border-vertical']) {
    _styles['borderColor'] = styles.COLOR_BORDER;
    _styles['borderLeftWidth'] = 0.5;
    _styles['borderRightWidth'] = 0.5;
  }

  return _styles;
};

const propTypes = {
  'border-all': PropTypes.bool,
  'border-top': PropTypes.bool,
  'border-bottom': PropTypes.bool,
  'border-left': PropTypes.bool,
  'border-right': PropTypes.bool,
  'border-vertical': PropTypes.bool,
  'border-horizontal': PropTypes.bool,
};

const defaultPropTypes = {};

const border = {
  propTypes,
  getStylesByProps,
  defaultPropTypes,
};

export default border;
