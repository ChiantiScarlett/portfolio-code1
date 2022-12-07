import React from 'react';
import {Portal} from 'react-native-portalize';
import View from '@components/core/view';
import AnimatedLottieView from 'lottie-react-native';
import {observer} from 'mobx-react-lite';
import useGlobalState from '@core/globalState';

const PendingScreen = observer(() => {
  const {pendingScreen} = useGlobalState();

  if (!pendingScreen._isActive) return null;

  return (
    <Portal>
      <View flex-1-0 ai-center jc-center>
        <View
          main1
          ai-center
          jc-center
          style={{width: 60, height: 60, borderRadius: 60, opacity: 0.9}}>
          <AnimatedLottieView
            source={require('./spinner.json')}
            autoPlay
            loop
            style={{width: 50, height: 50}}
          />
        </View>
      </View>
    </Portal>
  );
});

export default PendingScreen;
