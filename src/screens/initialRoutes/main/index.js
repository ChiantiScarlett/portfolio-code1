import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import P002 from './P002';
import P001 from './P001';
import P013 from './P013';
import TabBar from './tabBar';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {observer} from 'mobx-react-lite';

import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './drawerContent';
import messaging from '@react-native-firebase/messaging';
import {BackHandler} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import screenAnimation from '@functions/screenAnimation';

const Drawer = createDrawerNavigator();

const Component = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerType: 'front',
        swipeEnabled: false,
      }}>
      <Drawer.Screen name="Main" component={InnerComponent} />
    </Drawer.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const InnerComponent = observer(() => {
  const navigation = useNavigation();
  const toast = useToast();
  /**
   * [뒤로가기 핸들링 로직]
   */
  let exitApp = false;
  let timeoutEvent;

  const handleBackButtonPress = () => {
    if (!exitApp) {
      toast.show('한번 더 누르시면 종료됩니다.', {type: 'info'});
      exitApp = true;
      timeoutEvent = setTimeout(() => {
        exitApp = false;
      }, 2000);
    } else {
      clearTimeout(timeoutEvent);
      BackHandler.exitApp();
    }

    return true;
  };

  // P000에서 사라지면, handleBackButtonPress 제거합니다.
  navigation.addListener('blur', () => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPress);
  });

  // P000로 다시 돌아오면, handleBackButtonPress를 활성화합니다.
  navigation.addListener('focus', () => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);
  });

  // 처음 진입 시, User에게 알림 퍼미션을 구합니다.
  async function requestiOSUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // 비회원 둘러보기일 경우, 무시합니다.
      if (auth().currentUser.isAnonymous) return;

      // 허용했을 시, FCMToken을 업데이트합니다.
      const token = await messaging().getToken();
      await firestore().collection('Users').doc(auth().currentUser.uid).update({
        FCMToken: token,
      });
    }
  }

  React.useEffect(() => {
    requestiOSUserPermission();
  }, []);

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        headerShown: false,
        lazy: false, // 탭이 마운트될 때, 서브스크린도 미리 마운트합니다.
      }}
      initialRouteName="HOME"
      tabBar={TabBar}>
      <Tab.Screen name="STORE" component={P002} />
      <Tab.Screen name="HOME" component={P001} />
      <Tab.Screen name="MY_PAGE" component={P013} />
    </Tab.Navigator>
  );
});

const options = {
  headerShown: false,
  ...screenAnimation.fade,
};

export default {Component, options};
