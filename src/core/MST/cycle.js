/**
 * 해당 코드는 demo 버전에서 사용하지 않지만,
 * MST 활용을 어떻게 했는지 보여드리기 위해 남겨두었습니다.
 */

import {types} from 'mobx-state-tree';

/**
 * 결제 사이클 정보를 담는 모델입니다.
 */
export const CycleDocument = types.model('CycleDocument', {
  id: types.string,
  name: types.string,
  type: types.string,
  paymentChecked: types.boolean,
  paymentDate: types.string,
  paymentFallbackChecked: types.boolean,
  paymentFallbackDate: types.string,
  deliveryStartChecked: types.boolean,
  deliveryStartDate: types.string,
});
