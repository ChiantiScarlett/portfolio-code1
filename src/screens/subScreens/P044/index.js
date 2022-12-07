import React from 'react';
import {View, Button} from '@components/core';
import ViewContainer from '@components/viewContainer';

import UnderConstruction from '@components/underConstruction';
import GoBackHeader from '@components/goBackHeader';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {observer} from 'mobx-react-lite';

/**
 * 테스트용 설정 페이지입니다.
 */
const Component = observer(() => {
  const logout = async nav => {
    try {
      await auth().signOut();
    } catch (error) {
      // signOut 상태에서 재차 로그아웃 하는 예외 처리.
    }

    nav.replace('LANDING', {key: 'LANDING'});
  };

  const deleteUser = async nav => {
    try {
      await firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .delete();
      await auth().signOut();
    } catch (error) {
      // signOut 상태에서 재차 로그아웃 하는 예외 처리.
    }

    nav.replace('LANDING', {key: 'LANDING'});
  };

  return (
    <ViewContainer
      HeaderComponent={() => <GoBackHeader pageName="P044" title="" />}>
      <View style={{height: 150}} />
      <UnderConstruction text="이 페이지는 아직 준비중이에요." />
      <View margin-top-50 />

      {/** 로그아웃 버튼 정의: */}
      <View hor-pad>
        <Button title="로그아웃" onPress={logout} />
      </View>
      {/** 유저 DB 삭제 버튼 정의: */}
      <View margin-top-10 hor-pad>
        <Button title="유저 삭제" onPress={deleteUser} />
      </View>
    </ViewContainer>
  );
});

const options = {
  headerShown: false,
};

export default {Component, options};
