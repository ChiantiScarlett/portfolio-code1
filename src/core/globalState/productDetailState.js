import {types} from 'mobx-state-tree';
import {ProductDocument} from '@core/MST/product';
import {ProductReviewSummaryDocument} from '@core/MST/productReviewSummary';

/** P003과 관련한 State입니다. */
const ProductDetailState = types
  .model('ProductDetailState', {
    // 상품 데이터 저장:
    productDocument: types.maybeNull(ProductDocument),
    productReviewSummaryDocument: types.maybeNull(ProductReviewSummaryDocument),
  })
  .actions(self => ({
    set(kvDict) {
      for (const key of Object.keys(kvDict)) {
        self[key] = kvDict[key];
      }
    },
  }))
  .views(self => ({
    get P003Ready() {
      return (
        self.productDocument !== null &&
        self.productReviewSummaryDocument !== null
      );
    },
  }));

export default ProductDetailState;
