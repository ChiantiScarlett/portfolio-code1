/**
 * 해당 코드는 demo 버전에서 사용하지 않지만,
 * MST 활용을 어떻게 했는지 보여드리기 위해 남겨두었습니다.
 */

import {MAX_QUANTITY, NO_DEGREE} from '@app/static';
import {flow, getRoot, types} from 'mobx-state-tree';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {toJS} from 'mobx';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

/**
 * 새 렌즈옵션을 생성합니다.
 * object가 아닌 func인 이유는, 매 차례 새 UUID를 발급받기 위합입니다.
 */
export const genereateDefaultLensOption = () => {
  return {
    id: uuidv4(),
    name: '나의 눈',
    LM: '0000',
    LA: '0000',
    RM: '0000',
    RA: '0000',
    SM: '0000',
    SA: '0000',
    isSingle: false,
    isDefault: true,
    // 구매하기 페이지, 구독 정보 수정 등에서 사용할 정보입니다.
    LQ: 0,
    RQ: 0,
    SQ: 0,
  };
};

/**
 * 렌즈 도수표에 관한 데이터 모델입니다. Users/LensOptionList에 map 형태로 저장되며, 이하의 정보를 포함하고 있습니다.
 */
export const LensOptionObject = types
  .model('LensOptionObject', {
    id: types.string,
    name: types.string,
    LM: types.string,
    LA: types.string,
    RM: types.string,
    RA: types.string,
    SM: types.string,
    SA: types.string,
    isSingle: types.boolean,
    isDefault: types.boolean,
    // 구매하기 페이지, 구독 정보 수정 등에서 사용할 정보입니다.
    LQ: types.optional(types.integer, 0),
    RQ: types.optional(types.integer, 0),
    SQ: types.optional(types.integer, 0),
    // showQuantity: types.optional(types.boolean, false),
  })
  .actions(self => ({
    set(kvDict) {
      for (const key of Object.keys(kvDict)) {
        self[key] = kvDict[key];
      }
    },
    increaseQ(key) {
      self[key] = Math.min(self[key] + 1, MAX_QUANTITY);
    },
    decreaseQ(key) {
      self[key] = Math.max(self[key] - 1, 0);
    },

    setThisDefault: flow(function* setThisDefault() {
      let newLensOptionList = toJS(getRoot(self).db.user.lensOptionList);
      let newLensOption = newLensOptionList.find(item => item.id === self.id);

      // 기존 데이터의 [기본]을 거짓으로, 그리고 현재 아이템을 삭제합니다.
      newLensOptionList = newLensOptionList
        .map(item => {
          item.isDefault = false;
          return item;
        })
        .filter(item => item.id !== self.id);

      newLensOption.isDefault = true;

      // 맨 앞으로 옮깁니다.
      newLensOptionList = [newLensOption].concat(newLensOptionList);

      yield firestore().collection('Users').doc(auth().currentUser.uid).update({
        lensOptionList: newLensOptionList,
      });
    }),

    //9300-2565-0000-0035
    remove: flow(function* remove() {
      let lensOptionList = toJS(getRoot(self).db.user.lensOptionList);

      const currentIndex = lensOptionList.findIndex(
        item => item.id === self.id,
      );
      lensOptionList.splice(currentIndex, 1);

      // 디폴트일 경우, 타 결제 카드 중 첫번째 데이터를 기본값으로 만듭니다.
      if (self.isDefault && lensOptionList.length !== 0) {
        lensOptionList[0].isDefault = true;
      }

      // 만약 P007에 현 카드가 선택됐을 경우, 같이 삭제해줍니다.
      if (getRoot(self).cache.pendingPurchase.lensOption?.id === self.id) {
        getRoot(self).cache.pendingPurchase.set({
          lensOption: null,
          isNewLensOption: true,
        });
      }

      yield firestore().collection('Users').doc(auth().currentUser.uid).update({
        lensOptionList: lensOptionList,
      });
    }),
  }))
  .views(self => ({
    get MQuantity() {
      let quantity = 0;
      if (!self.isSingle) {
        if (self.LA === NO_DEGREE) quantity += self.LQ;
        if (self.RA === NO_DEGREE) quantity += self.RQ;
        return quantity;
      } else {
        return self.SA === NO_DEGREE ? self.SQ : 0;
      }
    },
    get AQuantity() {
      let quantity = 0;
      if (!self.isSingle) {
        if (self.LA !== NO_DEGREE) quantity += self.LQ;
        if (self.RA !== NO_DEGREE) quantity += self.RQ;
        return quantity;
      } else {
        return self.SA !== NO_DEGREE ? self.SQ : 0;
      }
    },
    get flatten() {
      // 현 렌즈 도수에서, 동일한 시력의 수량을 하나로 병합합니다.

      // 수량이 0일 때는 빈 배열을 반환합니다.
      if (
        (self.isSingle && self.SQ === 0) ||
        (!self.isSingle && self.LQ + self.RQ === 0)
      ) {
        return [];
      }

      // 1. 싱글 도수일 때:
      if (self.isSingle) {
        return [{M: self.SM, A: self.SA, Q: self.SQ}];
      }

      // 이하는 [양눈이 다를 때]를 전제합니다:
      // 왼쪽 수량이 0일 때 오른눈만 반환.
      else if (self.LQ === 0) {
        return [{M: self.RM, A: self.RA, Q: self.RQ}];
      }

      // 오른쪽 수량이 0 일 때 왼눈만 반환.
      else if (self.RQ === 0) {
        return [{M: self.LM, A: self.LA, Q: self.LQ}];
      }

      // 4. 만약 양눈을 다르게가 선택됐는데, 도수가 같다면, 수량을 하나로 합칩니다.
      else if (self.LA === self.RA && self.LM === self.RM) {
        return [{M: self.LM, A: self.LA, Q: self.LQ + self.RQ}];
      }

      // 그 외의 경우, 그대로 반환합니다.
      return [
        {M: self.LM, A: self.LA, Q: self.LQ},
        {M: self.RM, A: self.RA, Q: self.RQ},
      ];
    },
  }));

export const NewLensOptionObject = types
  .model('NewLensOptionObject', {
    name: types.optional(types.string, '내 도수표'),
    LM: types.optional(types.string, '0000'),
    LA: types.optional(types.string, '0000'),
    RM: types.optional(types.string, '0000'),
    RA: types.optional(types.string, '0000'),
    SM: types.optional(types.string, '0000'),
    SA: types.optional(types.string, '0000'),
    LQ: types.optional(types.integer, 0),
    RQ: types.optional(types.integer, 0),
    SQ: types.optional(types.integer, 0),
    isDefault: types.boolean,
    isSingle: types.optional(types.boolean, false),
    makeDefault: types.optional(types.boolean, true),
  })
  .actions(self => ({
    set(kvDict) {
      for (const key of Object.keys(kvDict)) {
        self[key] = kvDict[key];
      }
    },

    create: flow(function* create({previousLensOptionList}) {
      /**
       * isReadyToPublish가 참이라고 가정합니다.
       */
      let lensOptionList = toJS(previousLensOptionList);

      // default로 만들 경우, 기존 데이터 중 isDefault를 전부 해제하고 현 오브젝트를 최상단으로 올립니다.
      if (self.isDefault || self.makeDefault) {
        lensOptionList = lensOptionList.map(item => {
          item.isDefault = false;
          return item;
        });
        lensOptionList = [self.final].concat(lensOptionList);
      } else {
        // 그렇지 않을 경우 맨 밑에 붙입니다.
        lensOptionList = lensOptionList.concat([self.final]);
      }

      yield firestore().collection('Users').doc(auth().currentUser.uid).update({
        lensOptionList: lensOptionList,
      });

      // callback 함수를 위해, 생성한 렌즈옵션을 반환합니다.
      return self.final;
    }),

    increaseQ(key) {
      self[key] = getMin(self[key] + 1, MAX_QUANTITY);
    },
    decreaseQ(key) {
      self[key] = getMax(self[key] - 1, 0);
    },
  }))
  .views(self => ({
    get MQuantity() {
      let quantity = 0;
      if (!self.isSingle) {
        if (self.LA === NO_DEGREE) quantity += self.LQ;
        if (self.RA === NO_DEGREE) quantity += self.RQ;
        return quantity;
      } else {
        return self.SA === NO_DEGREE ? self.SQ : 0;
      }
    },
    get AQuantity() {
      let quantity = 0;
      if (!self.isSingle) {
        if (self.LA !== NO_DEGREE) quantity += self.LQ;
        if (self.RA !== NO_DEGREE) quantity += self.RQ;
        return quantity;
      } else {
        return self.SA !== NO_DEGREE ? self.SQ : 0;
      }
    },

    get isReadyToPublish() {
      if (!self.name) return false;

      if (!self.isSingle) {
        return !(
          self.LM === '0000' &&
          self.LA === '0000' &&
          self.RM === '0000' &&
          self.RA === '0000'
        );
      } else {
        return !(self.SM === '0000' && self.SA === '0000');
      }
    },
    get final() {
      if (self.isSingle) {
        return {
          id: uuidv4(),
          name: self.name,
          LM: '',
          LA: '',
          LQ: 0,
          RM: '',
          RA: '',
          RQ: 0,
          SM: self.SM,
          SA: self.SA,
          SQ: self.SQ,
          isDefault: self.isDefault || self.makeDefault,
          isSingle: true,
        };
      } else {
        return {
          id: uuidv4(),
          name: self.name,
          LM: self.LM,
          LA: self.LA,
          LQ: self.LQ,
          RM: self.RM,
          RA: self.RA,
          RQ: self.RQ,
          SM: '',
          SA: '',
          SQ: 0,
          isDefault: self.isDefault || self.makeDefault,
          isSingle: false,
        };
      }
    },
  }));

export const EditableLensOptionObject = types
  .model('EditableLensOptionObject', {
    id: types.string,
    name: types.string,
    LM: types.string,
    LA: types.string,
    RM: types.string,
    RA: types.string,
    SM: types.string,
    SA: types.string,
    isSingle: types.boolean,
    isDefault: types.boolean,
    makeDefault: types.optional(types.boolean, false),
  })
  .actions(self => ({
    set(kvDict) {
      for (const key of Object.keys(kvDict)) {
        self[key] = kvDict[key];
      }
    },

    update: flow(function* update({previousLensOptionList}) {
      /**
       * isReadyToPublish가 참이라고 가정합니다.
       */
      let lensOptionList = toJS(previousLensOptionList);
      const currentIndex = lensOptionList.findIndex(
        item => item.id === self.id,
      );

      // 디폴트가 아닐 경우, 해당 인덱스의 데이터를 교체합니다.
      if (!(self.isDefault || self.makeDefault)) {
        lensOptionList[currentIndex] = self.final;
      }
      // 디폴트일 경우, 해당 인덱스의 값을 제거하고, 다른 데이터들의 '디폴트' 상태를 해제한 다음, 맨 앞에 붙입니다.
      else {
        lensOptionList.splice(currentIndex, 1);
        lensOptionList = lensOptionList.map(item => {
          item.isDefault = false;
          return item;
        });
        lensOptionList = [self.final].concat(lensOptionList);
      }

      yield firestore().collection('Users').doc(auth().currentUser.uid).update({
        lensOptionList: lensOptionList,
      });

      // callback 함수를 위해 수정된 렌즈옵션의 정보를 반환합니다.
      return self.final;
    }),
  }))

  .views(self => ({
    get isReadyToPublish() {
      if (!self.name) return false;

      if (!self.isSingle) {
        return !(
          self.LM === '0000' &&
          self.LA === '0000' &&
          self.RM === '0000' &&
          self.RA === '0000'
        );
      } else {
        return !(self.SM === '0000' && self.SA === '0000');
      }
    },
    get final() {
      if (self.isSingle) {
        return {
          id: self.id,
          name: self.name,
          LM: '',
          LA: '',
          RM: '',
          RA: '',
          LQ: 0,
          RQ: 0,
          SM: self.SM,
          SA: self.SA,
          isDefault: self.isDefault || self.makeDefault,
          isSingle: true,
        };
      } else {
        return {
          id: self.id,
          name: self.name,
          LM: self.LM,
          LA: self.LA,
          RM: self.RM,
          RA: self.RA,
          SM: '',
          SA: '',
          SQ: 0,
          isDefault: self.isDefault || self.makeDefault,
          isSingle: false,
        };
      }
    },
  }));
