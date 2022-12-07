// 도감 번호 범위:
export const FILTER_MIN_INDEX = 1;
export const FILTER_MAX_INDEX = 20;

// 가격 범위:
export const FILTER_MIN_PRICE = 0;
export const FILTER_MAX_PRICE = 100000;

/** Static한 정렬 키를 정의합니다. */
export const SORT_KEY = Object.freeze({
  INDEX_ASC: '번호 낮은 순',
  INDEX_DESC: '번호 높은 순',
  PRICE_ASC: '가격 낮은 순',
  PRICE_DESC: '가격 높은 순',
});

/** Static한 필터 키를 정의합니다. */
export const FILTER_KEY = Object.freeze({
  TYPE_FIRE: '불꽃',
  TYPE_WATER: '물',
  TYPE_POISON: '독',
  TYPE_NORMAL: '노말',
  TYPE_GRASS: '풀',
  TYPE_DARK: '악',
  TYPE_FLYING: '비행',
  TYPE_BUG: '벌레',

  FINAL_FORM: Symbol('최종진화'),
  QUADRUPEDALISM: Symbol('사족보행'),
  ...[...Array(20).keys()].reduce(
    (prev, next) => (prev[`INDEX_${next}`] = Symbol(`번호 ${next}번`)),
    {},
  ),
});

/** REVERSED 필터 키를 정의합니다. */
export const REVERSED_FILTER_KEY = Object.keys(FILTER_KEY).reduce((p, n) => {
  p[FILTER_KEY[n]] = n;
  return p;
}, {});

export const DRAWER_CONTENT = {
  TYPE: [
    {label: '불꽃', value: FILTER_KEY.TYPE_FIRE},
    {label: '물', value: FILTER_KEY.TYPE_WATER},
    {label: '독', value: FILTER_KEY.TYPE_POISON},
    {label: '노말', value: FILTER_KEY.TYPE_NORMAL},
    {label: '풀', value: FILTER_KEY.TYPE_GRASS},
    {label: '악', value: FILTER_KEY.TYPE_DARK},
    {label: '비행', value: FILTER_KEY.TYPE_FLYING},
    {label: '벌레', value: FILTER_KEY.TYPE_BUG},
  ],
  SORT: [
    {
      label: '번호 높은 순',
      value: SORT_KEY.INDEX_DESC,
    },
    {
      label: '번호 낮은 순',
      value: SORT_KEY.INDEX_ASC,
    },
    {
      label: '가격 높은 순',
      value: SORT_KEY.PRICE_DESC,
    },
    {
      label: '가격 낮은 순',
      value: SORT_KEY.PRICE_ASC,
    },
  ],
};
