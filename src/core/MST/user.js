import {flow, types} from 'mobx-state-tree';
import {AddressObject} from './address';
import {LensOptionObject} from './lensOption';
import {FakePaymentCardObject} from './fakePaymentCard';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

/**
 * /Avatars/에 위치할 유저 정보 데이터입니다. 동일한 유저에 대해 Avatar와 User는 동일한 ID 값을 가집니다.
 */
export const AvatarDocument = types.model('AvatarDocument', {
  id: types.string,
  imageType: types.string,
  username: types.string,
});

/**
 * /Users/에 위치할 유저 정보 데이터입니다.
 */
export const UserDocument = types
  .model('UserDocument', {
    POC: types.maybeNull(types.string),
    allowedReviewList: types.array(types.string),
    favoriteProductIDList: types.array(types.string),
    lensOptionList: types.array(LensOptionObject),
    addressList: types.array(AddressObject),
    fakePaymentcardList: types.array(FakePaymentCardObject),
    FCMToken: types.string,
  })
  .actions(self => ({
    /** 현 유저의 찜한 목록에 productID 토글링합니다. */
    toggleFavorite: flow(function* toggleFavorite(productID) {
      let data = [...self.favoriteProductIDList];
      // 이미 찜 목록에 있을 경우, 해당 ID를 리스트에서 삭제한 후 서버와 동기화합니다.
      if (data.includes(productID)) {
        data = data.filter(item => item !== productID);
        yield firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .update({
            favoriteProductIDList: data,
          });
      }
      // 아닐 경우, 해당 ID를 리스트에서 추가한 후 서버와 동기화합니다.
      else {
        data = data.concat([productID]);
        yield firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .update({
            favoriteProductIDList: data,
          });
      }

      // 로컬 데이터를 업데이트합니다.
      self.favoriteProductIDList = data;
    }),
    set(kvDict) {
      for (const key of Object.keys(kvDict)) {
        self[key] = kvDict[key];
      }
    },
  }));

/**
 * 최초 로그인 시 사용할 오브젝트입니다.
 */
export const NewUserModel = types
  .model('NewUserModel', {
    FCMToken: types.string,
  })
  .actions(self => ({
    create: flow(function* create() {
      const newUserRef = firestore()
        .collection('Users')
        .doc(auth().currentUser.uid);
      return yield newUserRef.set(self.final);
    }),
  }))
  .views(self => ({
    get final() {
      return {
        FCMToken: self.FCMToken,
        POC: null,
        allowedReviewList: [],
        favoriteProductIDList: [],
        lensOptionList: [],
        addressList: [],
        fakePaymentcardList: [],
      };
    },
  }));

// /**
//  * 프로필 정보 (P027)에서 쓰일, 수정용 데이터 오브젝트.
//  */
// export const EditableUserObject = types
//   .model('EditableUserObject', {
//     name: types.optional(types.string, ''),
//     profile: types.optional(types.string, ''),
//     _isProfileEdited: types.optional(types.boolean, false),
//     _isNameEdited: types.optional(types.boolean, false),
//   })
//   // 값을 변경하는 액션입니다:
//   .actions(self => ({
//     updateProfile(value) {
//       self.profile = value;
//       self._isProfileEdited = true;
//     },
//     updateName(value) {
//       self.name = value;
//       self._isNameEdited = true;
//     },
//   }))
//   // 프로필이 변경됐는지를 확인하는 read-only property입니다:
//   .views(self => ({
//     get isProfileEdited() {
//       return self._isProfileEdited;
//     },
//     get isNameEdited() {
//       return self._isNameEdited;
//     },
//     get isReadyToPublish() {
//       return (
//         (self._isProfileEdited || self._isNameEdited) && self.name.length !== 0
//       );
//     },
//   }));
