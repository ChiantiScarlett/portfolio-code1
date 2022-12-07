import {DELIVERY_FEE} from '@app/static';
import {Image, SVG, Text, View} from '@components/core';
import useGlobalState from '@core/globalState';
import addComma from '@functions/addComma';
import getClosestCycle from '@functions/getClosestCycle';
import {observer} from 'mobx-react';
import React from 'react';
import Collapsible from './collapsible';
import {Detail, DetailWithHeader} from './detail';
import Tag from './icons';
import {initialWindowMetrics} from 'react-native-safe-area-context';

import DepartureSVG from './icons/departure.svg';

const InnerContent = observer(() => {
  const {productDetailState, storeState, common} = useGlobalState();
  const {productDocument} = productDetailState;

  // 올바른 태그 아이콘 정렬을 위해 상품 태그에 null을 추가해서 개수를 맞춥니다.
  const tags = productDocument?.tags.concat([null, null]) || [];
  const {paymentDate, deliveryStartDate} = getClosestCycle(storeState);

  return (
    <View border-left border-top border-right style={{borderRadius: 30}}>
      {/** 상품 기본 정보: */}
      <View margin-top-40 hor-pad margin-bottom-40>
        <Text regular acro5 small>
          {productDocument?.topDescription}
        </Text>
        <Text regular acro6 large margin-top-5>
          {productDocument?.name}
        </Text>
      </View>

      {/** 가격 정보 */}
      {!!productDocument?.M && (
        <View flex-row hor-pad ai-flex-end>
          <Text medium bold acro5 margin-right-20>
            {'근시'}
          </Text>
          <View flex-row ai-flex-end>
            <Text acro6 large title>
              {addComma(productDocument.M.price, '원')}
            </Text>
            <Text acro5 medium regular>
              {' / 1box'}
            </Text>
          </View>
        </View>
      )}
      {!!productDocument?.A && (
        <View flex-row hor-pad ai-flex-end>
          <Text medium bold acro5 margin-right-20>
            {/* {'난시'} */}
            {'가격'}
          </Text>
          <View flex-row ai-flex-end>
            <Text acro6 large title>
              {addComma(productDocument.A.price, '원')}
            </Text>
            <Text acro5 medium regular>
              {' / 1box'}
            </Text>
          </View>
        </View>
      )}

      {/** 배송 정보 */}
      <View flex-row hor-pad margin-top-40>
        <Text medium bold acro5 margin-right-20>
          {'배송'}
        </Text>
        <View flex-1-0>
          <View flex-row>
            <Text bold medium acro6 margin-right-5>
              {addComma(DELIVERY_FEE, '원')}
            </Text>
            <Text regular medium acro6>
              {'(2박스 이상 무료배송)'}
            </Text>
          </View>
          <Text regular medium acro6 margin-top-5>
            {'일반 택배'}
          </Text>
          <Text regular medium acro6 margin-top-5>
            {'제주 및 도서 산간 지역은 현재 주문이 불가합니다.'}
          </Text>
        </View>
      </View>

      {/** 미니 카드 영역: */}
      <View hor-pad margin-top-20>
        <View
          padding-top-20
          padding-bottom-20
          hor-pad
          ai-center
          flex-row
          style={{backgroundColor: '#EFF5FF'}}>
          <SVG source={DepartureSVG} width={30} height={30} />
          <View margin-left-20>
            <View flex-row>
              <Text regular medium acro6>{`오늘 주문하시면 결제는 `}</Text>
              <Text bold medium acro6>{`${paymentDate?.slice(-2)}일,`}</Text>
            </View>
            <View flex-row margin-top-5>
              <Text regular medium acro6>{`배송은 `}</Text>
              <Text bold medium acro6>{`${deliveryStartDate?.slice(
                -2,
              )}일`}</Text>
              <Text regular medium acro6>{`에 시작됩니다.`}</Text>
            </View>
          </View>
        </View>
      </View>
      <View margin-top-40 main5 style={{height: 10}} />
      <Collapsible title="상품 설명">
        {/** Tag 리스트: */}
        <View flex-row ai-center jc-center>
          {tags.slice(0, 3).map((item, idx) => (
            <Tag tagName={item} key={idx} />
          ))}
        </View>
        <View flex-row ai-center jc-center>
          {tags.slice(3, 6).map((item, idx) => (
            <Tag tagName={item} key={idx} />
          ))}
        </View>
        <View flex-row ai-center jc-center>
          {tags.slice(6, 9).map((item, idx) => (
            <Tag tagName={item} key={idx} />
          ))}
        </View>
        <View flex-row ai-center jc-center>
          {tags.slice(9, 12).map((item, idx) => (
            <Tag tagName={item} key={idx} />
          ))}
        </View>
        <View flex-row ai-center jc-center>
          {tags.slice(12, 15).map((item, idx) => (
            <Tag tagName={item} key={idx} />
          ))}
        </View>

        {/** 근난시 둘다 있을 때, 헤더를 포함해서 보여줍니다. */}
        {!!productDocument &&
          productDocument?.M !== null &&
          productDocument?.A !== null && (
            <DetailWithHeader productDocument={productDocument} />
          )}

        {/** 근시만 있을 때: */}
        {!!productDocument &&
          productDocument?.M !== null &&
          productDocument?.A === null && (
            <>
              <View border-bottom margin-top-20 />
              <Detail information={productDocument.M.information} />
            </>
          )}
        {/** 난시만 있을 때: */}
        {!!productDocument &&
          productDocument?.M === null &&
          productDocument?.A !== null && (
            <>
              <View border-bottom margin-top-20 />
              <Detail information={productDocument.A.information} />
            </>
          )}
        <View border-bottom margin-bottom-20 />
        {productDocument?.image.descriptionList.map((item, idx) => (
          <Image
            sourceURI={item}
            key={idx}
            aspectRatio={'original'}
            width={initialWindowMetrics.frame.width}
          />
        ))}
        {common.descriptionImageList?.map((item, idx) => (
          <Image
            sourceURI={item}
            key={idx}
            aspectRatio={'original'}
            width={initialWindowMetrics.frame.width}
          />
        ))}
      </Collapsible>

      <Collapsible title="교환 규정" collapsedOnDefault>
        {common.FAQImageList?.map((item, idx) => (
          <Image
            sourceURI={item}
            key={idx}
            aspectRatio={'original'}
            width={initialWindowMetrics.frame.width}
          />
        ))}
      </Collapsible>
    </View>
  );
});

export default InnerContent;
