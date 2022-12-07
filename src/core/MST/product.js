import {types} from 'mobx-state-tree';

const _EyesightObject = types.model('_EyesightObject', {
  description: types.string,
  information: types.frozen(), // hashmap
  price: types.integer,
  type: types.enumeration(['A', 'M']),
});

const _ImageObject = types.model('_ImageObject', {
  photoList: types.array(types.string),
  descriptionList: types.array(types.string),
});

export const ProductDocument = types
  .model({
    id: types.string,
    createdAt: types.integer,
    updatedAt: types.integer,
    eyesight: types.array(_EyesightObject),
    image: _ImageObject,
    filterKeys: types.array(types.string),
    isPublic: types.boolean,
    name: types.string,
    topDescription: types.string,
    productReviewSummaryID: types.string,
    productPurchaseSummaryID: types.string,
    productSaleSummaryID: types.string,
    searchKeys: types.array(types.string),
    tags: types.array(types.string),
  })
  .views(self => ({
    get fullname() {
      return `${self.topDescription} ${self.name}`;
    },
    get M() {
      return self.eyesight.find(item => item.type === 'M') || null;
    },
    get A() {
      return self.eyesight.find(item => item.type === 'A') || null;
    },
  }));
