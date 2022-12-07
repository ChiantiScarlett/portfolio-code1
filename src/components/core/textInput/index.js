import React from 'react';
import PropTypes from 'prop-types';
import {TextInput as RNTextInput} from 'react-native';
import View from '../view';
import {styleProps} from '../commonProps';
import CancelSVG from './cancel.svg';
import SVG from '../svg';
import Text from '../text';
import styles from '@app/styles';
import FadeInOut from 'react-native-fade-in-out';

const _TextInput = React.forwardRef((props, ref) => {
  /**
   * 1. ref => 내부의 값을 쓰기 위한 용도.
   * 2. innerValue => 내부의 값을 읽기 위한 용도.
   * 3. isFocused => 현재 활성화 되어있는지 (키보드 입력 상태인지) 체크하는 용도.
   */
  const [innerValue, setInnerValue] = React.useState(props.defaultValue);
  const [isFocused, setFocused] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');

  /**
   * 외부에서 에러 상태를 체크하기 위해 함수를 연동합니다.
   */
  React.useEffect(() => {
    /** 외부에서 confirmError를 실행했을 때 에러가 존재할 경우,
     *  자동으로 onBlur를 실행해서 textInput 하단에 에러 메시지를 띄웁니다.
     */
    if (ref?.current) {
      ref.current.innerValue = innerValue;
      ref.current.confirmError = () => {
        onBlur();

        const value = innerValue.trim();
        setInnerValue(value);
        ref.current?.setNativeProps({text: value});
        return props.verifyError(value);
      };
    }
  }, [errorText]);

  /**
   * 컴포넌트를 클릭했을 때 실행할 함수입니다.
   * - isFocused 상태를 갱신합니다.
   * - errorText를 초기화합니다.
   */
  const onFocus = () => {
    setFocused(true);

    // 에러 메시지를 clear:
    setErrorText('');
  };

  /**
   * 키보드 밖의 영역을 클릭했을 때 실행할 함수입니다.
   * - 입력된 값의 앞 뒤 공백을 제거합니다.
   * - isFocused 상태를 갱신합니다.
   * - verifyError 함수에 의해 에러 메시지를 표시할지를 설정합니다.
   */
  const onBlur = event => {
    // 값을 업데이트합니다.
    const value = innerValue.trim();
    setInnerValue(value);
    ref.current?.setNativeProps({text: value});

    // 에러 메시지가 있을 경우, errorText를 업데이트합니다.
    const error = props.verifyError(value);
    setErrorText(error);

    // 비활성화 합니다.
    setFocused(false);

    // custom Blur 함수를 실행합니다:
    props.onBlur(event);
  };

  /**
   * ClearButton을 누를 때 실행할 함수입니다.
   * - 글자를 지웁니다.j
   * - 활성화되어있을 경우, props.onClearWhileFocused를 실행합니다.
   * - 비활성화되어있을 경우, props.onClearWhileBlurred를 실행합니다.
   */
  const onClearPress = () => {
    setInnerValue('');
    ref.current?.setNativeProps({text: ''});
    setErrorText('');

    isFocused ? props.onClearWhileFocused() : props.onClearWhileBlurred();
  };

  return (
    <View>
      <FadeInOut visible={innerValue !== ''}>
        <Text regular xsmall acro5 style={{paddingTop: 10}}>
          {props.label}
        </Text>
      </FadeInOut>
      <View
        margin-top-5
        border-all
        flex-row
        ai-center
        style={{
          height: props.height,
          ...props.containerStyle,
          // focused일 때, 테두리를 강조합니다.
          borderColor: isFocused ? styles.COLOR_MAIN1 : styles.COLOR_BORDER,
          borderWidth: isFocused ? 1 : 0.5,
          height: props.height,
        }}>
        {!!props.addonBefore && <props.addonBefore />}
        <View style={{height: props.height, ...props.innerContainerStyle}}>
          <RNTextInput
            keyboardType={props.keyboardType}
            selectionColor={styles.COLOR_MAIN3}
            placeholder={props.placeholder || props.label}
            placeholderTextColor={styles.COLOR_ACRO4}
            ref={ref}
            editable={!props.readonly}
            defaultValue={props.defaultValue}
            onChangeText={text => {
              text = props.formatText(text);
              setInnerValue(text);
              props.onChangeText(text);
            }}
            style={{
              fontSize: styles.FONT_SIZE_MEDIUM,
              fontFamily: styles.FF_REGULAR,
              color: styles.COLOR_ACRO6,
              padding: 0,
              margin: 0,
              borderWidth: 0,
            }}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </View>

        {!!innerValue && !props.readonly && (
          <SVG
            width={props.height}
            height={props.height}
            source={CancelSVG}
            style={{padding: (props.height - 14) / 2}}
            onPress={onClearPress}
          />
        )}
      </View>
      {!!errorText && (
        <Text margin-top-5 padding-left-10 regular xsmall warning>
          {errorText}
        </Text>
      )}
    </View>
  );
});

_TextInput.propTypes = {
  // 커스텀 스타일:
  containerStyle: PropTypes.shape(styleProps),
  innerContainerStyle: PropTypes.shape(styleProps),
  textInputStyle: PropTypes.shape(styleProps),

  // Native TextInput 속성:
  defaultValue: PropTypes.string,
  onChangeText: PropTypes.func,
  clearButtonMode: PropTypes.bool,
  onClearWhileFocused: PropTypes.func,
  onClearWhileBlurred: PropTypes.func,
  onBlur: PropTypes.func,
  height: PropTypes.any,
  addonBefore: PropTypes.func,
  placeholder: PropTypes.string, // (빈칸일 경우, label과 동일)
  keyboardType: PropTypes.oneOf([
    'default',
    'number-pad',
    'decimal-pad',
    'numeric',
    'email-address',
    'phone-pad',
    'url',
  ]),

  // <Labeled Text> Options:
  label: PropTypes.string, // Text Label
  verifyError: PropTypes.func, // verification function
  formatText: PropTypes.func, // text post-processing
  readonly: PropTypes.bool, // Read-only flag
};

_TextInput.defaultProps = {
  containerStyle: {},
  innerContainerStyle: {
    margin: 10,
    flex: 1,
    justifyContent: 'center',
  },
  textInputStyle: {flex: 1, margin: 0, padding: 0},
  keyboardType: 'default',
  defaultValue: '',
  onChangeText: text => {},
  clearButtonMode: false,
  onClearWhileFocused: () => {},
  onClearWhileBlurred: () => {},
  height: 50,
  label: ' ',
  formatText: text => {
    // 불완전한 로직. 추후 검토 필요
    return text;
  },
  readonly: false,
  verifyError: text => {
    /**
     * 1. text 상황에 따라 문자열 또는 null을 반환하는 검증 로직을 추가합니다.
     * 2. text는 trimmed 되어 있습니다.
     * 3. 만약 에러가 있을 경우 string을, 없을 경우 null을 반환합니다.
     */
    return null;
  },
  onBlur: () => {},
};

export default _TextInput;
