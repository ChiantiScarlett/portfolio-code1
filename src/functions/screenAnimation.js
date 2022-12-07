import {Platform} from 'react-native';

const swipe =
  Platform.OS === 'android'
    ? {
        transitionSpec: {
          open: {
            animation: 'spring',
            config: {
              stiffness: 500,
              damping: 100,
              mass: 3,
              overshootClamping: true,
              restDisplacementThreshold: 0.01,
              restSpeedThreshold: 0.01,
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 300,
            },
          },
        },
        cardStyleInterpolator: ({current, layouts}) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }
    : undefined;

const fade = {
  cardStyleInterpolator: ({current, layouts}) => {
    return {
      cardStyle: {
        opacity: current.progress,
      },
    };
  },
};

const screenAnimation = {
  swipe,
  fade,
};

export default screenAnimation;
