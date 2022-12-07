import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const refreshUser = async userState => {
  const userSN = await firestore()
    .collection('Users')
    .doc(auth().currentUser.uid)
    .get();

  userState.set({
    userDocument: {...userSN.data(), id: userSN.id},
  });
};

export default refreshUser;
