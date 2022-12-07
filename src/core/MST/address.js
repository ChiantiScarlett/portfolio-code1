/**
 * 해당 코드는 demo 버전에서 사용하지 않지만,
 * MST 활용을 어떻게 했는지 보여드리기 위해 남겨두었습니다.
 */

import {toJS} from 'mobx';
import {flow, getRoot, types} from 'mobx-state-tree';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const AddressObject = types
  .model('AddressObject', {
    id: types.string,
    isDefault: types.boolean,
    name: types.string,
    recipient: types.string,
    poc: types.string,
    address1: types.string,
    address2: types.string,
    postCode: types.string,
    pickUpMethod: types.string,
    entranceMethod: types.string,
    memo: types.string,
  })
  .actions(self => ({
    setThisDefault: flow(function* setThisDefault() {
      let newAddressList = toJS(getRoot(self).db.user.addressList);
      let newAddress = newAddressList.find(item => item.id === self.id);

      // 기존 데이터의 [기본]을 거짓으로, 그리고 현재 아이템을 삭제합니다.
      newAddressList = newAddressList
        .map(item => {
          item.isDefault = false;
          return item;
        })
        .filter(item => item.id !== self.id);

      newAddress.isDefault = true;

      // 맨 앞으로 옮깁니다.
      newAddressList = [newAddress].concat(newAddressList);

      yield firestore().collection('Users').doc(auth().currentUser.uid).update({
        addressList: newAddressList,
      });
    }),

    remove: flow(function* remove() {
      let addressList = toJS(getRoot(self).db.user.addressList);

      const currentIndex = addressList.findIndex(item => item.id === self.id);
      addressList.splice(currentIndex, 1);

      // 디폴트일 경우, 타 주소지 중 첫번째 데이터를 기본값으로 만듭니다.
      if (self.isDefault && addressList.length !== 0) {
        addressList[0].isDefault = true;
      }

      // 만약 P007에 현 카드가 선택됐을 경우, 같이 삭제해줍니다.
      if (getRoot(self).cache.pendingPurchase.address?.id === self.id) {
        getRoot(self).cache.pendingPurchase.set({
          address: null,
        });
      }

      yield firestore().collection('Users').doc(auth().currentUser.uid).update({
        addressList: addressList,
      });
    }),
  }));

export const NewAddressObject = types
  .model('NewAddressObject', {
    id: types.optional(types.string, ''),
    name: types.optional(types.string, ''),
    recipient: types.optional(types.string, ''),
    poc: types.optional(types.string, ''),
    address1: types.optional(types.string, ''),
    address2: types.optional(types.string, ''),
    postCode: types.optional(types.string, ''),
    pickUpMethod: types.optional(types.string, ''),
    entranceMethod: types.optional(types.string, ''),
    memo: types.optional(types.string, ''),

    isDefault: types.boolean,
    makeDefault: types.optional(types.boolean, true),
  })
  .actions(self => ({
    set(kvDict) {
      for (const key of Object.keys(kvDict)) {
        self[key] = kvDict[key];
      }
    },

    create: flow(function* create(callback = () => {}) {
      /**
       * step1,step2,step3가 전부 valid하다고 가정합니다.
       */
      let addressList = toJS(getRoot(self).db.user.addressList);

      // default로 만들 경우, 기존 데이터 중 isDefault를 전부 해제하고 현 오브젝트를 최상단으로 올립니다.
      if (self.isDefault || self.makeDefault) {
        addressList = addressList.map(item => {
          item.isDefault = false;
          return item;
        });
        addressList = [self.final].concat(addressList);
      } else {
        // 그렇지 않을 경우 맨 밑에 붙입니다.
        addressList = addressList.concat([self.final]);
      }

      yield firestore().collection('Users').doc(auth().currentUser.uid).update({
        addressList: addressList,
      });
    }),
  }))
  .views(self => ({
    get isStep1Valid() {
      return self.name && self.recipient && self.poc && self.address1;
    },
    get isStep2Valid() {
      return self.pickUpMethod.trim() !== '';
    },
    get isStep3Valid() {
      return self.entranceMethod.trim() !== '';
    },

    get final() {
      return {
        id: uuidv4(),
        name: self.name,
        recipient: self.recipient,
        poc: self.poc,
        address1: self.address1,
        address2: self.address2,
        postCode: self.postCode,
        pickUpMethod: self.pickUpMethod,
        entranceMethod: self.entranceMethod,
        memo: self.memo,
        isDefault: self.makeDefault || self.isDefault,
      };
    },
  }));

export const EditableAddressObject = types
  .model('EditableAddressObject', {
    id: types.string,
    name: types.string,
    recipient: types.string,
    poc: types.string,
    address1: types.string,
    address2: types.string,
    postCode: types.string,
    pickUpMethod: types.string,
    entranceMethod: types.string,
    memo: types.string,

    isDefault: types.boolean,
    makeDefault: types.optional(types.boolean, true),
  })
  .actions(self => ({
    set(kvDict) {
      for (const key of Object.keys(kvDict)) {
        self[key] = kvDict[key];
      }
    },

    update: flow(function* update(callback = () => {}) {
      /**
       * isReadyToPublish가 참이라고 가정합니다.
       */
      let addressList = toJS(getRoot(self).db.user.addressList);
      const currentIndex = addressList.findIndex(item => item.id === self.id);

      // 디폴트가 아닐 경우, 해당 인덱스의 데이터를 교체합니다.
      if (!(self.isDefault || self.makeDefault)) {
        addressList[currentIndex] = self.final;
      }
      // 디폴트일 경우, 해당 인덱스의 값을 제거하고, 다른 데이터들의 '디폴트' 상태를 해제한 다음, 맨 앞에 붙입니다.
      else {
        addressList.splice(currentIndex, 1);
        addressList = addressList.map(item => {
          item.isDefault = false;
          return item;
        });
        addressList = [self.final].concat(addressList);
      }

      yield firestore().collection('Users').doc(auth().currentUser.uid).update({
        addressList: addressList,
      });
    }),
    remove: flow(function* remove(callback = () => {}) {
      let addressList = toJS(getRoot(self).db.user.addressList);
      const currentIndex = addressList.findIndex(item => item.id === self.id);
      addressList.splice(currentIndex, 1);
      // 디폴트일 경우, 타 렌즈 옵션 중 첫번째 데이터를 기본값으로 만듭니다.
      if (self.isDefault && addressList.length !== 0) {
        addressList[0].isDefault = true;
      }

      yield firestore().collection('Users').doc(auth().currentUser.uid).update({
        addressList: addressList,
      });
    }),
  }))
  .views(self => ({
    get isReadyToPublish() {
      return (
        self.name &&
        self.recipient &&
        self.poc &&
        self.address1 &&
        self.pickUpMethod.trim() !== '' &&
        self.entranceMethod.trim() !== ''
      );
    },

    get final() {
      return {
        id: uuidv4(),
        name: self.name,
        recipient: self.recipient,
        poc: self.poc,
        address1: self.address1,
        address2: self.address2,
        postCode: self.postCode,
        pickUpMethod: self.pickUpMethod,
        entranceMethod: self.entranceMethod,
        memo: self.memo,
        isDefault: self.makeDefault || self.isDefault,
      };
    },
  }));
