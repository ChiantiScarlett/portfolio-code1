import PendingScreen from './pendingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {applySnapshot, onSnapshot, types} from 'mobx-state-tree';
import {useMemo} from 'react';
import ProductDetailState from './productDetailState';
import StoreState from './storeState';
import {Common, EmergencyKick} from './app';
import UserState from './userState';

const GlobalState = types
  .model('GlobalState', {
    pendingScreen: PendingScreen,
    initialRouteName: types.maybeNull(
      types.enumeration(['LANDING', 'MAIN', 'POST_LOGIN']),
    ),
    common: Common,
    storeState: StoreState,
    emergencyKick: EmergencyKick,
    productDetailState: ProductDetailState,
    userState: UserState,
  })
  .actions(self => ({
    set(kvDict) {
      for (const key of Object.keys(kvDict)) {
        self[key] = kvDict[key];
      }
    },
  }))
  .views(self => ({
    get mainScreenReady() {
      return (
        self.storeState.isReady && self.userState.isReady && self.common.isReady
      );
    },
    get landingScreenReady() {
      return true && self.common.isReady;
    },
    get postLoginScreenReady() {
      return true && self.common.isReady;
    },
  }));

/**
 * 데이터를 핸드폰에 저장합니다.
 */
const persist = (name, store) => {
  onSnapshot(store, _snapshot => {
    const snapshot = {..._snapshot};
    const data = JSON.stringify(snapshot);
    AsyncStorage.setItem(name, data);
  });
  AsyncStorage.getItem(name).then(data => {
    if (data !== null) {
      const snapshot = JSON.parse(data);
      applySnapshot(store, snapshot);
    }
  });
};

/**
 * Create globally accessible store.
 */
let _useGlobalState;
const useGlobalState = () => {
  const globalState = useMemo(() => {
    if (!_useGlobalState)
      _useGlobalState = GlobalState.create({
        pendingScreen: PendingScreen.create(),
        initialRouteName: null,
        storeState: StoreState.create(),
        common: Common.create(),
        emergencyKick: EmergencyKick.create(),
        productDetailState: ProductDetailState.create(),
        userState: UserState.create(),
      });
    // persist("PROJECT_SEEYA", _useGlobalState);

    return _useGlobalState;
  }, []);
  return globalState;
};

export default useGlobalState;
