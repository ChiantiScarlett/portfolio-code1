import {types} from 'mobx-state-tree';
import {ProductDocument} from '@core/MST/product';
import {ProductReviewSummaryDocument} from '@core/MST/productReviewSummary';
import {CycleDocument} from '@core/MST/cycle';
import {
  FILTER_MAX_INDEX,
  FILTER_MAX_PRICE,
  FILTER_MIN_INDEX,
  FILTER_MIN_PRICE,
  SORT_KEY,
} from '@app/static.store';

const ProductGroup = types.model('ProductGroup', {
  productDocument: ProductDocument,
  productReviewSummaryDocument: ProductReviewSummaryDocument,
});

/**
 * P002와 관련한 State입니다.
 * 상품, 혹은 구독과 관련한 데이터를 전부 저장합니다.
 */
const StoreState = types
  .model('StoreState', {
    // 상품 데이터 저장:
    originalProductGroupList: types.maybeNull(types.array(ProductGroup)),
    filteredProductGroupList: types.maybeNull(types.array(ProductGroup)),
    isLoading: types.optional(types.boolean, true),
    cycleList: types.maybeNull(types.array(CycleDocument)),

    currentKeyword: types.optional(types.string, ''),
    currentSorting: types.optional(types.string, SORT_KEY.PRICE_ASC),
    currentFilters: types.array(types.string),
    currentBeginIndexRange: types.optional(types.integer, FILTER_MIN_INDEX),
    currentEndIndexRange: types.optional(types.integer, FILTER_MAX_INDEX),
    currentBeginPriceRange: types.optional(types.integer, FILTER_MIN_PRICE),
    currentEndPriceRange: types.optional(types.integer, FILTER_MAX_PRICE),
  })
  .actions(self => ({
    set(kvDict) {
      for (const key of Object.keys(kvDict)) {
        self[key] = kvDict[key];
      }
    },
  }))
  .views(self => ({
    get isReady() {
      return self.originalProductGroupList !== null && self.cycleList !== null;
    },
    get activeCellList() {
      return [self.currentSorting].concat(self.currentFilters);
    },
    get rangeChecksum() {
      return (
        self.currentBeginIndexRange +
        self.currentEndIndexRange +
        self.currentBeginPriceRange +
        self.currentEndPriceRange
      );
    },
  }));

export default StoreState;
