import {types} from 'mobx-state-tree';

const AvatarImageTypeObject = types.model('AvatarImageTypeObject', {
  type1: types.string,
  type2: types.string,
  type3: types.string,
  type4: types.string,
  type5: types.string,
  type6: types.string,
});

export const Common = types
  .model('Common', {
    avatarImageType: types.maybeNull(AvatarImageTypeObject),
    descriptionImageList: types.maybeNull(types.array(types.string)),
    FAQImageList: types.maybeNull(types.array(types.string)),
    refundPolicyImageList: types.maybeNull(types.array(types.string)),
  })
  .views(self => ({
    get isReady() {
      return (
        self.avatarImageType != null &&
        self.descriptionImageList !== null &&
        self.FAQImageList !== null &&
        self.refundPolicyImageList !== null
      );
    },
  }));

const KickObject = types.model('KickObject', {
  title: types.string,
  body: types.string,
});

export const EmergencyKick = types.model('EmergencyKick', {
  /** 추후 데이터 기록 */
  iOS: types.maybeNull(KickObject),
  android: types.maybeNull(KickObject),
});
