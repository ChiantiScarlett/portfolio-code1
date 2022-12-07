import React from 'react';
import {View, Text, TextInput, Modal, Image} from '@components/core';
import ViewContainer from '@components/viewContainer';
import useGlobalState from '@core/globalState';
import SafeContainer from '@components/safeContainer';
import PostLoginHeader from '@components/postLoginHeader';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Component = () => {
  const {common, pendingScreen} = useGlobalState();
  const {avatarImageType} = common;
  const usernameRef = React.useRef();
  const phoneRef = React.useRef();

  const [modalVisible, setModalVisible] = React.useState(false);
  const [avatarType, setAvatarType] = React.useState(
    `type${Math.floor(Math.random() * (6 - 1) + 1)}`,
  );

  /** 다음 버튼을 눌렀을 때의 동작을 정의합니다. */
  const onNext = async nav => {
    /** 만약 에러가 존재할 경우, 함수를 종료합니다. */
    const usernameError = usernameRef.current?.confirmError();
    const phoneError = phoneRef.current?.confirmError();

    if ([usernameError, phoneError].some(k => k !== null)) return;

    pendingScreen.show();

    // 아바타 데이터를 생성합니다:
    await firestore().collection('Avatars').doc(auth().currentUser.uid).set({
      imageType: avatarType,
      username: usernameRef.current.innerValue,
    });

    // 유저 데이터에 POC 정보를 기록합니다.
    await firestore().collection('Users').doc(auth().currentUser.uid).update({
      POC: phoneRef.current.innerValue,
    });

    pendingScreen.hide();

    nav.replace('P043', {key: 'P043'});
  };

  return (
    <ViewContainer
      HeaderComponent={() => (
        <PostLoginHeader
          title="기본 정보 입력"
          paginationIndex={1}
          buttonText="다음"
          onButtonPress={onNext}
        />
      )}>
      {/** 프로필 선택 모달을 정의합니다. */}
      <Modal isVisible={modalVisible} setVisible={setModalVisible}>
        <View ai-center>
          <Text regular small acro5 margin-top-20 margin-bottom-20>
            {'마음에 드는 이미지를 골라보세요!'}
          </Text>
          <SafeContainer paddingOnBottom>
            <View flex-row ai-center jc-center>
              <Image
                onPress={() => {
                  setAvatarType('type1');
                  setModalVisible(false);
                }}
                sourceURI={avatarImageType.type1}
                width={80}
                height={80}
                aspectRatio="square"
                border-all
                style={{
                  borderRadius: 120,
                }}
              />
              <View margin-left-20 />
              <Image
                onPress={() => {
                  setAvatarType('type2');
                  setModalVisible(false);
                }}
                sourceURI={avatarImageType.type2}
                width={80}
                height={80}
                aspectRatio="square"
                border-all
                style={{
                  borderRadius: 120,
                }}
              />
              <View margin-left-20 />
              <Image
                onPress={() => {
                  setAvatarType('type3');
                  setModalVisible(false);
                }}
                sourceURI={avatarImageType.type3}
                width={80}
                height={80}
                aspectRatio="square"
                border-all
                style={{
                  borderRadius: 120,
                }}
              />
            </View>
            <View margin-bottom-20 />
            <View flex-row ai-center jc-center>
              <Image
                onPress={() => {
                  setAvatarType('type4');
                  setModalVisible(false);
                }}
                sourceURI={avatarImageType.type4}
                width={80}
                height={80}
                aspectRatio="square"
                border-all
                style={{
                  borderRadius: 120,
                }}
              />
              <View margin-left-20 />
              <Image
                onPress={() => {
                  setAvatarType('type5');
                  setModalVisible(false);
                }}
                sourceURI={avatarImageType.type5}
                width={80}
                height={80}
                aspectRatio="square"
                border-all
                style={{
                  borderRadius: 120,
                }}
              />
              <View margin-left-20 />
              <Image
                onPress={() => {
                  setAvatarType('type6');
                  setModalVisible(false);
                }}
                sourceURI={avatarImageType.type6}
                width={80}
                height={80}
                aspectRatio="square"
                border-all
                style={{
                  borderRadius: 120,
                }}
              />
            </View>
            <View margin-bottom-40 />
          </SafeContainer>
        </View>
      </Modal>

      {/** 상단 프로필 이미지 영역을 정의합니다. */}
      <View ai-center margin-top-50>
        <View
          ai-center
          onPress={() => {
            setModalVisible(true);
          }}>
          <Image
            sourceURI={avatarImageType[avatarType]}
            width={120}
            height={120}
            aspectRatio="square"
            border-all
            style={{
              borderRadius: 120,
            }}
          />
          <Text bold small main1 margin-top-10>
            {'이미지 변경하기'}
          </Text>
        </View>
      </View>
      <View hor-pad margin-top-10>
        <TextInput
          ref={usernameRef}
          regular
          medium
          acro6
          label="이름"
          verifyError={text => {
            const koreanRegex = /^[가-힣]*$/gi;
            const englishRegex = /^[a-z ,.'-]+$/gi;

            // 공란인지 체크:
            if (text.length === 0) return '이름을 입력해주세요.';

            // 영문명인지 체크:
            if (englishRegex.test(text)) {
              if (text.length > 30) return '영문 실명 기입은 최대 30자입니다.';
              return null;
            }
            // 한글명인지 체크:
            else if (koreanRegex.test(text)) {
              if (text.lengh > 5) return '실명 기입은 최대 5자까지입니다.';
              return null;
            }

            return '올바른 이름을 기재해주세요.';
          }}
        />
        <TextInput
          ref={phoneRef}
          regular
          medium
          acro6
          keyboardType={'phone-pad'}
          label="핸드폰 번호 (-없이 숫자만 입력)"
          verifyError={text => {
            text = text.replace(/\s/gi, '');
            // 010으로 시작하는지 체크:
            if (!text.startsWith('010'))
              return '핸드폰 번호는 010으로 시작해야 합니다.';

            // 숫자로만 구성됐는지 체크:
            if (!/^[0-9]*$/.test(text)) return '숫자만 입력해주세요.';

            // 핸드폰 길이가 11자리인지 체크:
            if (text.length !== 11) return '핸드폰 번호는 11자리입니다.';

            return null;
          }}
        />
      </View>
    </ViewContainer>
  );
};

const options = {
  headerShown: false,
};

export default {Component, options};
