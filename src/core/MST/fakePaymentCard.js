/**
 * 해당 코드는 demo 버전에서 사용하지 않지만,
 * MST 활용을 어떻게 했는지 보여드리기 위해 남겨두었습니다.
 */

import {getRoot, types} from 'mobx-state-tree';
import {
  BIN_MAP,
  PURCHASE_CARD_GROUP,
  PURCHASE_CARD_COLOR,
} from '@app/static.payment';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {toJS} from 'mobx';
import 'react-native-get-random-values';
import {flow} from 'mobx-state-tree';

export const FakePaymentCardObject = types
  .model('FakePaymentCardObject', {
    id: types.string,
    isDefault: types.optional(types.boolean, false),
    BIN: types.string,
    last4: types.string,
    token: types.optional(types.string, ''),
  })
  .actions(self => ({
    setThisDefault: flow(function* setThisDefault(callback = () => {}) {
      let newPaymentCardList = toJS(getRoot(self).db.user.paymentCardList);
      let newPaymentCard = newPaymentCardList.find(item => item.id === self.id);

      // 기존 데이터의 [기본]을 거짓으로, 그리고 현재 아이템을 삭제합니다.
      newPaymentCardList = newPaymentCardList
        .map(item => {
          item.isDefault = false;
          return item;
        })
        .filter(item => item.id !== self.id);

      newPaymentCard.isDefault = true;

      // 맨 앞으로 옮깁니다.
      newPaymentCardList = [newPaymentCard].concat(newPaymentCardList);

      yield firestore().collection('Users').doc(auth().currentUser.uid).update({
        paymentCardList: newPaymentCardList,
      });
    }),

    //9300-2565-0000-0035
    remove: flow(function* remove(callback = () => {}) {
      let paymentCardList = toJS(getRoot(self).db.user.paymentCardList);
      const currentIndex = paymentCardList.findIndex(
        item => item.id === self.id,
      );

      paymentCardList.splice(currentIndex, 1);
      // 디폴트일 경우, 타 결제 카드 중 첫번째 데이터를 기본값으로 만듭니다.
      if (self.isDefault && paymentCardList.length !== 0) {
        paymentCardList[0].isDefault = true;
      }

      // 만약 P007에 현 카드가 선택됐을 경우, 같이 삭제해줍니다.
      console.warn(
        `${getRoot(self).cache.pendingPurchase.paymentCard.id}, ${self.id}`,
      );
      if (getRoot(self).cache.pendingPurchase.paymentCard?.id === self.id) {
        getRoot(self).cache.pendingPurchase.set({
          paymentCard: null,
        });
      }

      yield firestore().collection('Users').doc(auth().currentUser.uid).update({
        paymentCardList: paymentCardList,
      });
    }),
  }))
  .views(self => ({
    get metadata() {
      const currentData = BIN_MAP[self.BIN] || '';
      let group = '';
      let issuer = '';
      let name = '결제 카드';
      let backgroundColor = '#000000';
      let foregroundColor = '#ffffff';

      for (const key of Object.keys(PURCHASE_CARD_GROUP)) {
        if (currentData.indexOf(key) !== -1) {
          name = currentData.split(',')[0];
          issuer = currentData.split(',')[1];
          group = key;
          backgroundColor = PURCHASE_CARD_COLOR[key]?.bg;
          foregroundColor = PURCHASE_CARD_COLOR[key]?.fg;
          break;
        }
      }

      return {
        name,
        issuer,
        group,
        backgroundColor,
        foregroundColor,
      };
    },
  }));
