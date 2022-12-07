import React from 'react';
import styled from 'styled-components';
import WarningSVG from './warning.svg';
import CheckSVG from './check.svg';
import WrappedText from 'react-native-wrapped-text';
import {observer} from 'mobx-react-lite';
import triggerHaptic from '@functions/triggerHaptic';
import {View} from '@components/core';

const InfoToast = toast => {
  React.useEffect(() => {
    triggerHaptic();
  }, []);
  return (
    <>
      <NormalContainer>
        <OuterWrapper>
          <WrappedText
            rowWrapperStyle={{
              alignSelf: 'center',
              justifyContent: 'center',
            }}
            containerStyle={{alignSelf: 'center', justifyContent: 'center'}}
            TextComponent={({children}) => <Text>{children}</Text>}>
            {toast.message}
          </WrappedText>
        </OuterWrapper>
      </NormalContainer>
    </>
  );
};

const NormalToast = toast => {
  React.useEffect(() => {
    triggerHaptic();
  }, []);
  return (
    <>
      <NormalContainer>
        <Icon>
          <CheckSVG width="100%" height="100%" />
        </Icon>
        <View margin-left-5 />
        <OuterWrapper>
          <WrappedText
            rowWrapperStyle={{
              alignSelf: 'center',
              justifyContent: 'center',
            }}
            containerStyle={{alignSelf: 'center', justifyContent: 'center'}}
            TextComponent={observer(({children}) => (
              <Text>{children}</Text>
            ))}>
            {toast.message}
          </WrappedText>
        </OuterWrapper>
      </NormalContainer>
    </>
  );
};

const DangerToast = toast => {
  React.useEffect(() => {
    triggerHaptic();
  }, []);

  return (
    <>
      <DangerContainer>
        <Icon>
          <WarningSVG width="100%" height="100%" />
        </Icon>
        <View margin-left-5 />
        <OuterWrapper>
          <WrappedText
            rowWrapperStyle={{
              alignSelf: 'center',
              justifyContent: 'center',
            }}
            containerStyle={{alignSelf: 'center', justifyContent: 'center'}}
            TextComponent={observer(({children}) => (
              <Text>{children}</Text>
            ))}>
            {toast.message}
          </WrappedText>
        </OuterWrapper>
      </DangerContainer>
    </>
  );
};

const renderType = {
  normal: NormalToast,
  danger: DangerToast,
  info: InfoToast,
};

const NormalContainer = styled.View`
  background-color: #373737;
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
  flex-direction: row;
  max-width: 280px;
`;

const DangerContainer = styled.View`
  background-color: #f9cbc9;
  background-color: #373737;
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
  flex-direction: row;
  max-width: 280px;
  elevation: 1;
  shadow-color: #dfdfdf;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.9;
  shadow-radius: 1px;
`;

const OuterWrapper = styled.View`
  align-self: flex-start;
  /* margin-top: 2px; */
`;

const Text = styled.Text`
  text-align: justify;

  color: #ffffff;
`;

const Icon = styled.View`
  width: 14px;
  height: 14px;
  margin-top: 4px;
`;

export default renderType;
