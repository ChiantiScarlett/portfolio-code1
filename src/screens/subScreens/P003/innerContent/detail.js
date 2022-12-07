import {View, Text} from '@components/core';
import React from 'react';

export const Detail = ({information}) => {
  return (
    <View margin-top-40 margin-bottom-40>
      {Object.keys(information).map((key, idx) => (
        <View key={idx} hor-pad flex-row jc-center ai-center margin-bottom-20>
          <View flex-1-0>
            <Text regular small acro5>
              {key}
            </Text>
          </View>
          <View flex-1-0>
            <Text regular small acro5>
              {information[key]}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export const DetailWithHeader = ({productDocument}) => {
  const [focusedIndex, setFocusedIndex] = React.useState(0);

  return (
    <View>
      {/** 헤더 컴포넌트를 정의합니다. */}
      <View flex-row>
        {focusedIndex === 0 ? (
          <View
            flex-1-0
            ai-center
            jc-center
            border-top
            containerStyle={{flex: 1}}
            onPress={() => setFocusedIndex(0)}>
            <Text bold small acro6>
              {'근시 상품 상세'}
            </Text>
          </View>
        ) : (
          <View
            flex-1-0
            ai-center
            jc-center
            border-top
            containerStyle={{flex: 1}}
            border-bottom
            onPress={() => setFocusedIndex(0)}
            main5>
            <Text bold small acro4>
              {'근시 상품 상세'}
            </Text>
          </View>
        )}
        <View border-right padding-top-20 padding-bottom-20 />
        {focusedIndex === 1 ? (
          <View
            flex-1-0
            ai-center
            jc-center
            acro1
            border-top
            containerStyle={{flex: 1}}
            onPress={() => setFocusedIndex(1)}>
            <Text bold small acro6>
              {'난시 상품 상세'}
            </Text>
          </View>
        ) : (
          <View
            containerStyle={{flex: 1}}
            flex-1-0
            ai-center
            jc-center
            main5
            border-bottom
            border-top
            onPress={() => setFocusedIndex(1)}>
            <Text bold small acro4>
              {'난시 상품 상세'}
            </Text>
          </View>
        )}
      </View>
      {focusedIndex === 0 && (
        <Detail information={productDocument.M.information} />
      )}
      {focusedIndex === 1 && (
        <Detail information={productDocument.A.information} />
      )}
    </View>
  );
};
