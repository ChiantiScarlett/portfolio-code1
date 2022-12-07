import {AddressObject, EditableAddressObject} from '@core/MST/address';
import {LensOptionObject} from '@core/MST/lensOption';
import {AvatarDocument, UserDocument} from '@core/MST/user';
import {types} from 'mobx-state-tree';

const UserState = types
  .model('UserState', {
    userDocument: types.maybeNull(UserDocument),
    avatarDocument: types.maybeNull(AvatarDocument),

    // 렌즈 옵션 관련 설정:
    showAddLensOptionModal: types.optional(types.boolean, false),
    showEditLensOptionModal: types.optional(types.boolean, false),
    selectedLensOption: types.maybeNull(LensOptionObject),

    // 배송지 옵션 관련 설정:
    selectedAddress: types.maybeNull(AddressObject),

    showMoreOptionModal: types.optional(types.boolean, false),
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
      return self.userDocument !== null && self.avatarDocument !== null;
    },
  }));

export default UserState;
