import styles from '@app/styles';
import PropTypes from 'prop-types';

const getStylesByProps = props => {
  let _styles = {};

  // 글꼴:
  if (props.title) _styles.fontFamily = styles.FF_TITLE;
  if (props.regular) _styles.fontFamily = styles.FF_REGULAR;
  if (props.bold) _styles.fontFamily = styles.FF_BOLD;
  if (props.script) _styles.fontFamily = styles.FF_SCRIPT;

  // 크기:
  if (props.xxlarge) _styles.fontSize = styles.FONT_SIZE_XXLARGE;
  if (props.xlarge) _styles.fontSize = styles.FONT_SIZE_XLARGE;
  if (props.large) _styles.fontSize = styles.FONT_SIZE_LARGE;
  if (props.medium) _styles.fontSize = styles.FONT_SIZE_MEDIUM;
  if (props.small) _styles.fontSize = styles.FONT_SIZE_SMALL;
  if (props.xsmall) _styles.fontSize = styles.FONT_SIZE_XSMALL;

  return _styles;
};

const propTypes = {
  title: PropTypes.bool,
  regular: PropTypes.bool,
  bold: PropTypes.bool,
  script: PropTypes.bool,

  xxlarge: PropTypes.bool,
  xlarge: PropTypes.bool,
  large: PropTypes.bool,
  medium: PropTypes.bool,
  small: PropTypes.bool,
  xsmall: PropTypes.bool,
};

const defaultPropTypes = {};

const font = {
  propTypes,
  getStylesByProps,
  defaultPropTypes,
};

export default font;
