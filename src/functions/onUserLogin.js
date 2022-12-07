import {NewUserModel} from '@core/MST/user';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

/**
 * 유저가 로그인에 성공했을 때 실행할 함수입니다.
 */
const onUserLogin = async nav => {
  // 해당 유저 DB가 존재하는지 체크합니다.
  const userSN = await firestore()
    .collection('Users')
    .doc(auth().currentUser?.uid || 'NULL')
    .get();

  // 1. 해당 유저가 존재하지 않는다면, 유저 정보를 새로 생성합니다.
  if (!userSN.exists) {
    // 1. 유저가 새로 들어왔을 때, 유저 정보를 새로 생성합니다.
    const newUserModel = NewUserModel.create({
      FCMToken: await messaging().getToken(),
    });
    await newUserModel.create();

    // 2. POST_LOGIN으로 이동합니다.
    nav.replace('POST_LOGIN', {key: 'POST_LOGIN'});
    return;
  }

  // 2. 해당 유저가 이미 존재하지만 avatar가 생성 안된 경우에도 POST_LOGIN으로 이동합니다.
  const avatarSN = await firestore()
    .collection('Avatars')
    .doc(auth().currentUser.uid)
    .get();
  if (!avatarSN.exists) {
    nav.replace('POST_LOGIN', {key: 'POST_LOGIN'});
    return;
  }

  // 3. 그 외의 경우엔 MAIN으로 보냅니다.
  nav.replace('MAIN', {key: 'MAIN'});
};

export default onUserLogin;
