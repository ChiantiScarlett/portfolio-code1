import React from 'react';
import {View, Text, SVG, Button} from '@components/core';
import ViewContainer from '@components/viewContainer';
import Header from './header';
import getClosestCycle from '@functions/getClosestCycle';
import useGlobalState from '@core/globalState';

import PropTypes from 'prop-types';
import EnterInSVG from './enterIn.svg';

import Img11SVG from './images/img11.svg';
import Img12SVG from './images/img12.svg';
import Img13SVG from './images/img13.svg';
import Img14SVG from './images/img14.svg';
import Img15SVG from './images/img15.svg';

import Img21SVG from './images/img21.svg';
import Img22SVG from './images/img22.svg';
import Img23SVG from './images/img23.svg';

import Img31SVG from './images/img31.svg';
import Img32SVG from './images/img32.svg';

import Img41SVG from './images/img41.svg';

import Img51SVG from './images/img51.svg';
import Img52SVG from './images/img52.svg';
import Img53SVG from './images/img53.svg';

import Img61SVG from './images/img61.svg';
import {observer} from 'mobx-react-lite';

const Component = observer(() => {
  const {storeState} = useGlobalState();
  const {paymentDate, deliveryStartDate} = getClosestCycle(storeState);

  return (
    <ViewContainer HeaderComponent={Header}>
      {/** 상단 배너를 생성합니다. */}
      <View main4 padding-top-10 padding-bottom-10 hor-pad ai-center>
        <Text title large acro6>
          {'2박스 구독하시면 배송비 무료!'}
        </Text>
        <View flex-row margin-top-10>
          <Text regular medium acro6>{`오늘 주문하시면 매월 결제는 `}</Text>
          <Text bold medium acro6>{`${paymentDate?.slice(-2)}일,`}</Text>
        </View>
        <View flex-row margin-top-5>
          <Text regular medium acro6>{`매월 배송은 `}</Text>
          <Text bold medium acro6>{`${deliveryStartDate?.slice(-2)}일`}</Text>
          <Text regular medium acro6>{`에 시작됩니다.`}</Text>
        </View>
        <Text
          acro5
          xsmall
          regular
          margin-top-10
          style={{alignSelf: 'flex-end'}}>
          {'※ 도서산간지역은 배송 불가합니다. '}
        </Text>
      </View>

      {/** 콘택트 렌즈 구독서비스 SEEYA */}
      <View main5 hor-pad ai-center jc-center padding-top-40 padding-bottom-40>
        <Text script xlarge acro6 margin-top-20>
          {'콘택트 렌즈 구독 서비스'}
        </Text>
        <SVG source={Img15SVG} width={70} height={38} style={{marginTop: 10}} />
        <View style={{height: 250}}>
          <SVG
            source={Img14SVG}
            width={250}
            height={250}
            style={{padding: 20}}
          />
          <SVG
            source={Img13SVG}
            width={250}
            height={250}
            style={{
              position: 'absolute',
              alignSelf: 'center',
              paddingTop: 80,
              paddingLeft: 80,
            }}
          />
          <SVG
            source={Img12SVG}
            width={250}
            height={250}
            style={{
              position: 'absolute',
              alignSelf: 'center',
              paddingLeft: 190,
              paddingBottom: 150,
            }}
          />
          <SVG
            source={Img11SVG}
            width={250}
            height={250}
            style={{
              position: 'absolute',
              alignSelf: 'center',
              paddingRight: 190,
              paddingBottom: 190,
            }}
          />
        </View>
      </View>

      {/** 해외 직구 콘택트 렌즈 구독 서비스 */}
      <View acro1 hor-pad padding-top-40 padding-bottom-40>
        <HeadComponent
          title="해외 직구 콘택트 렌즈 구독 서비스"
          description={[
            '매일 쓰는 필수품, 원데이 30P(개입)',
            '한 달에 한 번 배송해드려요.',
          ]}
        />
        <View flex-row ai-center jc-center margin-top-20>
          <View style={{width: 100}} ai-center>
            <SVG source={Img21SVG} width={100} height={100} />
            <View
              flex-row
              ai-center
              jc-center
              margin-top-10
              style={{
                backgroundColor: '#fff9ef',
                borderRadius: 30,
                padding: 5,
              }}>
              <Text bold medium acro5>
                {'저렴'}
              </Text>
              <Text regular xsmall acro5>
                {'하고'}
              </Text>
            </View>
          </View>
          <View
            style={{width: 100, marginLeft: -25, marginRight: -25}}
            ai-center>
            <SVG source={Img22SVG} width={100} height={100} />
            <View
              flex-row
              ai-center
              jc-center
              margin-top-10
              style={{
                backgroundColor: '#fff9ef',
                borderRadius: 30,
                padding: 5,
              }}>
              <Text bold medium acro5>
                {'간편'}
              </Text>
              <Text regular xsmall acro5>
                {'하고'}
              </Text>
            </View>
          </View>
          <View style={{width: 100}} ai-center>
            <SVG source={Img23SVG} width={100} height={100} />
            <View
              flex-row
              ai-center
              jc-center
              margin-top-10
              style={{
                backgroundColor: '#fff9ef',
                borderRadius: 30,
                padding: 5,
              }}>
              <Text bold medium acro5>
                {'위생'}
              </Text>
              <Text regular xsmall acro5>
                {'하고'}
              </Text>
            </View>
          </View>
        </View>
        <EnterInComponent
          title="콘택트 렌즈 구독이 지금 시작됩니다!"
          pageName="C000"
        />
      </View>

      {/** 구독 배송비가 무료! */}
      <View acro1 hor-pad padding-top-40 padding-bottom-40>
        <HeadComponent
          title="구독 배송비가 무료!"
          description={[
            '2박스 이상 한번에 주문하시면',
            '해외 직구 콘택트 렌즈의 배송비가 무료입니다.',
          ]}
        />
        <View flex-1-0 ai-flex-end>
          <SVG source={Img31SVG} width={240} height={240} />
          <SVG
            source={Img32SVG}
            width={80}
            height={80}
            style={{position: 'absolute', right: 210, top: 50}}
          />
        </View>
      </View>

      {/** 구독 위약금 제로! */}
      <View acro1 hor-pad padding-top-40 padding-bottom-40>
        <HeadComponent
          title="구독 위약금 제로!"
          description={[
            '구독하다 해지하셔도 위약금이 없어요.',
            '부담없이 구독해보세요.',
          ]}
        />
        <SVG
          width={140}
          height={140}
          source={Img41SVG}
          style={{marginTop: 20, alignSelf: 'center'}}
        />
      </View>

      {/** 구독 간편 관리 서비스 */}
      <View acro1 hor-pad padding-top-40 padding-bottom-40>
        <HeadComponent
          title="구독 간편 관리 서비스"
          description={['간편하게 구독을 관리할 수 있는 기능들이 있어요.']}
        />
        <View ai-center margin-top-20>
          <View
            padding-top-15
            padding-bottom-15
            flex-row
            ai-center
            style={{width: 280, backgroundColor: '#F1F6FF', borderRadius: 12}}
            padding-left-15>
            <SVG source={Img52SVG} width={18} height={18} />
            <Text regular medium acro6 margin-left-10>
              {'쉬어가기로 한 달 쉬기'}
            </Text>
          </View>
          <View
            margin-top-10
            padding-top-15
            padding-bottom-15
            flex-row
            ai-center
            style={{width: 280, backgroundColor: '#F1F6FF', borderRadius: 12}}
            padding-left-15>
            <SVG source={Img52SVG} width={18} height={18} />
            <Text regular medium acro6 margin-left-10>
              {'미리받기로 2달 치 한번에 받기'}
            </Text>
          </View>
          <View
            margin-top-10
            padding-top-15
            padding-bottom-15
            flex-row
            ai-center
            style={{width: 280, backgroundColor: '#F1F6FF', borderRadius: 12}}
            padding-left-15>
            <SVG source={Img52SVG} width={18} height={18} />
            <Text regular medium acro6 margin-left-10>
              {'결제/도수/배송 정보 간단히 수정'}
            </Text>
          </View>
          <View
            margin-top-10
            padding-top-15
            padding-bottom-15
            flex-row
            ai-center
            style={{width: 280, backgroundColor: '#F1F6FF', borderRadius: 12}}
            padding-left-15>
            <SVG source={Img52SVG} width={18} height={18} />
            <Text regular medium acro6 margin-left-10>
              {'전체 구독 상태를 한번에 관리'}
            </Text>
          </View>
        </View>
        <EnterInComponent title="구독 서비스 상세 안내" pageName="C000" />
      </View>

      {/** 쉽게 저장하는 렌즈 도수 */}
      <View acro1 hor-pad padding-top-40 padding-bottom-40>
        <HeadComponent
          title="쉽게 저장하는 렌즈 도수"
          description={[
            '복잡한 콘택트 렌즈 도수!',
            '이제 간단하게 저장하세요.',
          ]}
        />
        <SVG
          source={Img61SVG}
          width={200}
          height={200}
          style={{alignSelf: 'center'}}
        />
        <EnterInComponent title="렌즈 도수표 작성 방법" pageName="C000" />
        <Text margin-top-5 regular xsmall acro5 style={{alignSelf: 'flex-end'}}>
          {'※ 시야를 처음 이용하신다면 읽어주세요.'}
        </Text>
      </View>
      <View hor-pad margin-bottom-40>
        <Button
          title="구독 상품 보러가기"
          onPress={nav => nav.navigate('C000')}
        />
      </View>
    </ViewContainer>
  );
});

/** 
각 파트의 헤더로 쓰이는 텍스트 컴포넌트입니다.
*/
const HeadComponent = ({title, description}) => (
  <View>
    <Text script large acro6 margin-bottom-10>
      {title}
    </Text>
    <Text regular medium acro6 word-wrap word-wrap-line-height={20}>
      {description.join('\n')}
    </Text>
  </View>
);
HeadComponent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.arrayOf(PropTypes.string),
};

/**
 * 각 섹션별로 하단에 위치한 페이지 이동용 컴포넌트입니다.
 */
const EnterInComponent = ({title, pageName}) => (
  <View
    padding-top-20
    flex-row
    jc-flex-end
    ai-center
    onPress={nav => nav.navigate(pageName, {key: pageName})}>
    <View margin-right-10>
      <Text script medium main1>
        {title}
      </Text>
    </View>
    <SVG source={EnterInSVG} width={10} height={10} />
  </View>
);
EnterInComponent.propTypes = {
  title: PropTypes.string,
  pageName: PropTypes.string,
};

export default Component;
