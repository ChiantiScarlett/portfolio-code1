const addComma = (value, postfix = '', fallback = '') => {
  if (value === null || isNaN(value)) return fallback;

  return Number(value).toLocaleString() + postfix;
};

export default addComma;
