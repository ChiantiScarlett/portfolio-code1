/**
 * 해당 코드는 demo 버전에서 사용하지 않지만,
 * MST 활용을 어떻게 했는지 보여드리기 위해 남겨두었습니다.
 */

import {types} from 'mobx-state-tree';

const RatingCountObject = types.model('RatingCountObject', {
  rating1: types.integer,
  rating2: types.integer,
  rating3: types.integer,
  rating4: types.integer,
});

export const ProductReviewSummaryDocument = types.model(
  'ProductReviewSummaryDocument',
  {
    id: types.string,
    productID: types.string,
    count: types.integer,
    deliveryRating: RatingCountObject,
    productRating: RatingCountObject,
  },
);
