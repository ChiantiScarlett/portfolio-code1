import {types} from 'mobx-state-tree';

const PendingScreen = types
  .model('PendingScreen', {
    _isActive: types.optional(types.boolean, false),
  })
  .actions(self => ({
    hide() {
      self._isActive = false;
    },
    show() {
      self._isActive = true;
    },
  }));

export default PendingScreen;
