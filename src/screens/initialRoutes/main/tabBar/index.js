import React from 'react';
import {TouchableOpacity} from 'react-native';
import SafeContainer from '@components/safeContainer';
import ActiveHomeSVG from './activeHome.svg';
import InactiveHomeSVG from './inactiveHome.svg';
import ActiveStoreSVG from './activeStore.svg';
import InactiveStoreSVG from './inactiveStore.svg';
import ActiveMyPageSVG from './activeMyPage.svg';
import InactiveMyPageSVG from './inactiveMyPage.svg';
import triggerHaptic from '@functions/triggerHaptic';
import {View, Text, SVG} from '@components/core';

/** 하단 탭 아이콘을 정의합니다. */
const TabBar = ({state, descriptors, navigation}) => {
  return (
    <View flex-row acro1 border-top>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          triggerHaptic();
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              name: route.name,
              merge: true,
              params: {shouldScroll: false},
            });
          }

          if (isFocused) {
            navigation.navigate({
              name: route.name,
              merge: true,
              params: {shouldScroll: true},
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const StyledLabel = ({name, focused}) =>
          focused ? (
            <Text xsmall regular main1 style={{paddingTop: 4}}>
              {name}
            </Text>
          ) : (
            <Text xsmall regular acro4 style={{paddingTop: 4}}>
              {name}
            </Text>
          );

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <View margin-top-15 />
            <SafeContainer paddingOnBottom={true} minBottomPadding={15}>
              {(isFocused && route.name === 'HOME') === true && (
                <View ai-center>
                  <SVG width={22} height={22} source={ActiveHomeSVG} />
                  <StyledLabel focused name="홈" />
                </View>
              )}
              {(!isFocused && route.name === 'HOME') === true && (
                <View ai-center>
                  <SVG width={22} height={22} source={InactiveHomeSVG} />
                  <StyledLabel name="홈" />
                </View>
              )}

              {(isFocused && route.name === 'STORE') === true && (
                <View ai-center>
                  <SVG width={22} height={22} source={ActiveStoreSVG} />
                  <StyledLabel focused name="스토어" />
                </View>
              )}
              {(!isFocused && route.name === 'STORE') === true && (
                <View ai-center>
                  <SVG width={22} height={22} source={InactiveStoreSVG} />
                  <StyledLabel name="스토어" />
                </View>
              )}
              {(isFocused && route.name === 'MY_PAGE') === true && (
                <View ai-center>
                  <SVG width={22} height={22} source={ActiveMyPageSVG} />
                  <StyledLabel focused name="내 정보" />
                </View>
              )}
              {(!isFocused && route.name === 'MY_PAGE') === true && (
                <View ai-center>
                  <SVG width={22} height={22} source={InactiveMyPageSVG} />
                  <StyledLabel name="내 정보" />
                </View>
              )}
            </SafeContainer>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
