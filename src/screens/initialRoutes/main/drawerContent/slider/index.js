import React from 'react';
import PropTypes from 'prop-types';
import styles from '@app/styles';
import {Slider as OriginalSlider} from '@miblanchard/react-native-slider';
import {View, Text} from '@components/core';
import addComma from '@functions/addComma';
import {observer} from 'mobx-react-lite';
import useGlobalState from '@core/globalState';

const Slider = observer(props => {
  const {
    lowerBoundKey,
    upperBoundKey,
    lowerLimit,
    upperLimit,
    step,
    suffix,
    title,
    onSlidingComplete,
  } = props;

  const {storeState} = useGlobalState();

  const [displayName, setDisplayName] = React.useState('전체');

  React.useEffect(() => {
    const lowerBound = storeState[lowerBoundKey];
    const upperBound = storeState[upperBoundKey];

    if (lowerBound === upperBound) {
      setDisplayName(addComma(lowerBound));
    } else if (lowerBound === lowerLimit && upperBound === upperLimit) {
      setDisplayName('전체');
    } else if (lowerBound === lowerLimit) {
      setDisplayName(`${addComma(upperBound)}${suffix} 이하`);
    } else if (upperBound === upperLimit) {
      setDisplayName(`${addComma(lowerBound)}${suffix} 이상`);
    } else {
      setDisplayName(
        `${addComma(lowerBound)}${suffix} ~ ${addComma(upperBound)}${suffix}`,
      );
    }
  }, [storeState[lowerBoundKey], storeState[upperBoundKey]]);

  return (
    <>
      <View
        padding-top-10
        padding-bottom-10
        hor-pad
        flex-row
        jc-space-between
        ai-center>
        <Text title acro6 medium>
          {title}
        </Text>
      </View>
      <View hor-pad border-bottom padding-bottom-10>
        <OriginalSlider
          value={[storeState[lowerBoundKey], storeState[upperBoundKey]]}
          onValueChange={value =>
            storeState.set({
              [lowerBoundKey]: value[0],
              [upperBoundKey]: value[1],
            })
          }
          minimumValue={lowerLimit}
          maximumValue={upperLimit}
          minimumTrackTintColor={styles.COLOR_MAIN1}
          maximumTrackTintColor={styles.COLOR_ACRO3}
          onSlidingComplete={onSlidingComplete}
          step={step}
          thumbTintColor={styles.COLOR_MAIN1}
          thumbStyle={{width: 20, height: 12}}
        />
        <Text regular small acro6 style={{alignSelf: 'flex-end'}}>
          {displayName}
        </Text>
      </View>
    </>
  );
});

Slider.propTypes = {
  lowerBoundKey: PropTypes.string,
  upperBoundKey: PropTypes.string,
  lowerLimit: PropTypes.number,
  upperLimit: PropTypes.number,

  step: PropTypes.number,
  title: PropTypes.string,
  suffix: PropTypes.string,
  onSlidingComplete: PropTypes.func,
};

export default Slider;
