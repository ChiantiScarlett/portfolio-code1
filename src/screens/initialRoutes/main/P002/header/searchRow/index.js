import {SVG, TextInput, View} from '@components/core';
import SafeContainer from '@components/safeContainer';
import useGlobalState from '@core/globalState';
import {observer} from 'mobx-react-lite';
import React from 'react';
import SearchSVG from './search.svg';

const SearchRow = observer(() => {
  const {storeState} = useGlobalState();
  const [keyword, setKeyword] = React.useState('');
  const inputRef = React.useRef();

  /** 검색 시 실행할 함수입니다. */
  onBlur = () => {
    // 키워드로 필터링합니다.
    // const keyword =inputRef.current.innerValue;
    // let filteredProductGroupList = () => {}
    // originalProductGroupList.filter(item => item.title != );
    //  originalProductGroupList
    storeState.set({
      currentKeyword: keyword.trim(),
    });
  };

  /** */
  onClearWhileBlurred = () => {
    storeState.set({
      currentKeyword: '',
    });
  };

  return (
    <SafeContainer paddingOnTop>
      <View hor-pad>
        {/** 검색창: */}
        <TextInput
          ref={inputRef}
          addonBefore={() => (
            <SVG
              source={SearchSVG}
              width={16}
              height={16}
              style={{marginLeft: 10}}
            />
          )}
          onClearWhileBlurred={onClearWhileBlurred}
          onChangeText={text => setKeyword(text)}
          onBlur={onBlur}
        />
      </View>
    </SafeContainer>
  );
});

export default SearchRow;
