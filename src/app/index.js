import {observer} from 'mobx-react-lite';
import React from 'react';
import {Host} from 'react-native-portalize';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';

import {ToastProvider} from 'react-native-toast-notifications';
import renderType from '@components/toast';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

//////////////////////////////////////////////////////////
import {LogBox} from 'react-native';
LogBox.ignoreLogs([
  'EventEmitter.removeListener',
  "No native splash screen registered for given view controller. Call 'SplashScreen.show' for given view controller first.",
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
]);
//////////////////////////////////////////////////////////

import navigationRef from './navigationRef';
import useGlobalState from '@core/globalState';
import AnimatedAppLoader from '@components/animatedAppLoader';

import initialRoutes from '@screens/initialRoutes';
import subScreens from '@screens/subScreens';
import PendingScreen from '@components/pendingScreen';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';

//////////////////////////////////////////////////////////////

enableScreens();
const Stack = createNativeStackNavigator();

const App = observer(() => {
  const {initialRouteName, set, userState} = useGlobalState();
  const {main, landing, postLogin} = initialRoutes;

  /**
   * [어플리케이션 로딩 시퀀스]
   * 1. AnimatedScreenLoader를 활성화합니다.
   * 2. 유저 정보를 확인한 다음, preLogin, postLogin, main 중 어느 단계로 가야하는지를 체크합니다.
   * 3. 해당 단계를 initialRouteName으로 해서, Navigation 시스템을 로드합니다.
   * 4. 해당 initialRouteName의 페이지에서 필요한 로딩 작업을 처리합니다.
   * 4. 각각의 페이지 로드가 끝났다면, AnimatedScreenLoader를 비활성화합니다.
   */

  React.useEffect(() => {
    const initialize = async () => {
      // common, emergencyKick 데이터를 가져옵니다.
      const appSN = await firestore().collection('App').get();
      const commonSN = appSN.docs.find(item => item.id === 'common');
      const emergencyKickSN = appSN.docs.find(
        item => item.id === 'emergencyKick',
      );
      set({
        common: commonSN.data(),
        emergencyKick: emergencyKickSN.data(),
      });

      // commonSN에 있는 이미지를 미리 로드합니다.
      // 로컬 이미지 로딩 개선: https://github.com/DylanVann/react-native-fast-image/issues/395 참고
      FastImage.preload(
        [
          ...Object.values(commonSN.data().avatarImageType),
          ...commonSN.data().descriptionImageList,
          ...commonSN.data().FAQImageList,
          ...commonSN.data().refundPolicyImageList,
        ].map(item => ({uri: item, headers: {}})),
      );

      // 유저 정보를 가져옵니다.
      const userSN = await firestore()
        .collection('Users')
        .doc(auth().currentUser?.uid || 'NULL')
        .get();

      // 만약 유저 정보가 존재하지 않는다면, LANDING으로 설정합니다.
      if (!userSN.exists) {
        set({
          initialRouteName: 'LANDING',
        });

        return;
      }

      // 존재한다면 유저 정보를 갱신합니다.
      userState.set({
        userDocument: {...userSN.data(), id: userSN.id},
      });

      // 만약 유저 정보는 존재하지만 avatar가 null일 경우, POST_LOGIN으로 설정합니다.
      if (userSN.data().avatarID === null) {
        set({
          initialRouteName: 'POST_LOGIN',
        });
        return;
      }

      // 그 외의 경우, 아바타 정보까지 설정한 후에 MAIN으로 설정힙니다.
      // 아바타 정보를 가져온 후, userState를 갱신합니다.
      const avatarSN = await firestore()
        .collection('Avatars')
        .doc(auth().currentUser.uid)
        .get();

      userState.set({
        avatarDocument: {...avatarSN.data(), id: avatarSN.id},
      });
      set({
        initialRouteName: 'MAIN',
      });
    };

    initialize();
  }, []);

  return (
    <ToastProvider renderType={renderType} offsetBottom={100} duration={1300}>
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: '#fff',
            },
          }}>
          <Host>
            <AnimatedAppLoader>
              {/** 로딩 시퀀스는 INITIAL 페이지에서 처리합니다. */}
              {!!initialRouteName && (
                <Stack.Navigator initialRouteName={initialRouteName}>
                  <Stack.Screen
                    component={main.Component}
                    name={'MAIN'}
                    options={main.options}
                  />
                  <Stack.Screen
                    component={landing.Component}
                    name={'LANDING'}
                    options={landing.options}
                  />
                  <Stack.Screen
                    component={postLogin.Component}
                    name={'POST_LOGIN'}
                    options={postLogin.options}
                  />
                  {Object.keys(subScreens).map((key, idx) => (
                    <Stack.Screen
                      component={subScreens[key].Component}
                      options={{
                        ...subScreens[key].options,
                        animation: 'slide_from_right',
                      }}
                      name={key}
                      key={idx}
                    />
                  ))}
                </Stack.Navigator>
              )}
            </AnimatedAppLoader>
            <PendingScreen />
          </Host>
        </NavigationContainer>
      </SafeAreaProvider>
    </ToastProvider>
  );
});

export default App;
