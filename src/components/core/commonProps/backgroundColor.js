import styles from '@app/styles';
import PropTypes from 'prop-types';

const getStylesByProps = props => {
  let _styles = {};

  if (props['main1']) {
    _styles['backgroundColor'] = styles.COLOR_MAIN1;
  }
  if (props['main2']) {
    _styles['backgroundColor'] = styles.COLOR_MAIN2;
  }
  if (props['main3']) {
    _styles['backgroundColor'] = styles.COLOR_MAIN3;
  }
  if (props['main4']) {
    _styles['backgroundColor'] = styles.COLOR_MAIN4;
  }
  if (props['main5']) {
    _styles['backgroundColor'] = styles.COLOR_MAIN5;
  }
  if (props['acro1']) {
    _styles['backgroundColor'] = styles.COLOR_ACRO1;
  }
  if (props['acro2']) {
    _styles['backgroundColor'] = styles.COLOR_ACRO2;
  }
  if (props['acro3']) {
    _styles['backgroundColor'] = styles.COLOR_ACRO3;
  }
  if (props['acro4']) {
    _styles['backgroundColor'] = styles.COLOR_ACRO4;
  }
  if (props['acro5']) {
    _styles['backgroundColor'] = styles.COLOR_ACRO5;
  }
  if (props['acro6']) {
    _styles['backgroundColor'] = styles.COLOR_ACRO6;
  }
  if (props['warning']) {
    _styles['backgroundColor'] = styles.COLOR_WARNING;
  }
  if (props['bg-coral']) {
    _styles['backgroundColor'] = 'coral';
  }
  if (props['bg-lightblue']) {
    _styles['backgroundColor'] = 'lightblue';
  }

  return _styles;
};

const propTypes = {
  main1: PropTypes.bool,
  main2: PropTypes.bool,
  main3: PropTypes.bool,
  main4: PropTypes.bool,
  main5: PropTypes.bool,
  acro1: PropTypes.bool,
  acro2: PropTypes.bool,
  acro3: PropTypes.bool,
  acro4: PropTypes.bool,
  acro5: PropTypes.bool,
  acro6: PropTypes.bool,
  warning: PropTypes.bool,
  'bg-coral': PropTypes.bool,
  'bg-lightblue': PropTypes.bool,
};
const defaultPropTypes = {};

const backgroundColor = {
  propTypes,
  getStylesByProps,
  defaultPropTypes,
};

export default backgroundColor;
