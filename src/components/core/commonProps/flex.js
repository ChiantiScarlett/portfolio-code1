import PropTypes from "prop-types";

const getStylesByProps = (props) => {
  let _styles = {};

  if (props["flex-1-0"]) {
    _styles["flex"] = 1;
    _styles["flexShrink"] = 0;
  }
  if (props["flex-row"]) {
    _styles["flexDirection"] = "row";
  }
  if (props["ai-center"]) {
    _styles["alignItems"] = "center";
  }
  if (props["ai-flex-start"]) {
    _styles["alignItems"] = "flex-start";
  }
  if (props["ai-flex-end"]) {
    _styles["alignItems"] = "flex-end";
  }
  if (props["ai-baseline"]) {
    _styles["alignItems"] = "baseline";
  }
  if (props["jc-flex-start"]) {
    _styles["justifyContent"] = "flex-start";
  }
  if (props["jc-flex-end"]) {
    _styles["justifyContent"] = "flex-end";
  }
  if (props["jc-center"]) {
    _styles["justifyContent"] = "center";
  }
  if (props["jc-space-between"]) {
    _styles["justifyContent"] = "space-between";
  }
  if (props["jc-space-around"]) {
    _styles["justifyContent"] = "space-around";
  }
  if (props["jc-space-evenly"]) {
    _styles["justifyContent"] = "space-evenly";
  }
  if (props["jc-stretch"]) {
    _styles["justifyContent"] = "stretch";
  }

  return _styles;
};

const propTypes = {
  "flex-1-0": PropTypes.bool,
  "flex-row": PropTypes.bool,
  "ai-center": PropTypes.bool,
  "ai-flex-start": PropTypes.bool,
  "ai-flex-end": PropTypes.bool,
  "ai-baseline": PropTypes.bool,
  "jc-flex-start": PropTypes.bool,
  "jc-flex-end": PropTypes.bool,
  "jc-center": PropTypes.bool,
  "jc-space-between": PropTypes.bool,
  "jc-space-around": PropTypes.bool,
  "jc-space-evenly": PropTypes.bool,
  "jc-space-stretch": PropTypes.bool,
};

const defaultPropTypes = {};

const flex = {
  propTypes,
  getStylesByProps,
  defaultPropTypes,
};

export default flex;
