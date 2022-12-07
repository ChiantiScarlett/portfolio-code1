import React from 'react';
import ViewContainer from '@components/viewContainer';

import {SVG, Text, View} from '@components/core';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import useGlobalState from '@core/globalState';
import Header from './header';
import PropTypes from 'prop-types';
import SubscriptionPlaceholderSVG from './subscriptionPlaceholder.svg';
import HeartSVG from './icons/heart.svg';
import CouponSVG from './icons/coupon.svg';
import SettingSVG from './icons/setting.svg';
import DeliverySVG from './icons/delivery.svg';
import ReviewSVG from './icons/review.svg';
import ServiceCenterSVG from './icons/serviceCenter.svg';
import EnterInSVG from './icons/enterIn.svg';

import CardSVG from './icons/card.svg';
import LensSVG from './icons/lens.svg';
import AddressSVG from './icons/address.svg';

import AchievementSVG from './icons/achievement.svg';
import DashboardSVG from './icons/dashboard.svg';

const Component = () => {
  const {userState} = useGlobalState();

  React.useEffect(() => {
    prepareP013(userState);
  }, []);

  return (
    <ViewContainer HeaderComponent={Header}>
      {/** 상단 아이콘을 정의합니다. */}
      <View ai-center margin-top-20>
        <View ai-center flex-row>
          <PageIcon
            title={'찜한 상품'}
            pageName={'P019'}
            SVGComponent={HeartSVG}
          />
          <PageIcon title={'쿠폰'} pageName={'C000'} SVGComponent={CouponSVG} />
          <PageIcon
            title={'설정'}
            pageName={'P044'}
            SVGComponent={SettingSVG}
          />
        </View>
        <View ai-center flex-row>
          <PageIcon
            title={'주문 내역'}
            pageName={'P015'}
            SVGComponent={DeliverySVG}
          />
          <PageIcon
            title={'나의 리뷰'}
            pageName={'C000'}
            SVGComponent={ReviewSVG}
          />
          <PageIcon
            title={'1:1 문의'}
            pageName={'C000'}
            SVGComponent={ServiceCenterSVG}
          />
        </View>
      </View>
      <View margin-top-20 />

      {/** 현재 구독중인 상품이 없을 때 보여질 placeholder를 사용합니다. */}
      <View
        padding-top-20
        padding-bottom-20
        flex-row
        ai-center
        jc-space-between
        padding-left-40
        padding-right-40
        style={{backgroundColor: '#eff5ff'}}>
        <View>
          <Text title medium acro6>
            {'주문 시 2박스 구독하시면\n해외 직구 배송비가 무료!'}
          </Text>
          <View flex-row ai-center margin-top-10>
            <Text title large main1 margin-right-10>
              {'구독하러 가기'}
            </Text>
            <SVG source={EnterInSVG} width={10} height={10} />
          </View>
        </View>
        <SVG source={SubscriptionPlaceholderSVG} width={80} height={80} />
      </View>
      {/** 현재 구독중인 상품을 정의합니다. */}
      {/* <View>
        <Text>{'현재 구독 중인 상품'}</Text>
        <View>
          <Text>{`${0}건`}</Text>
        </View>
      </View> */}

      {/** 하단 아이콘을 정의합니다: */}
      <View flex-row jc-center ai-center margin-top-20>
        <PageIcon title="결제 카드" pageName="C000" SVGComponent={CardSVG} />
        <PageIcon title="도수표" pageName="C000" SVGComponent={LensSVG} />
        <PageIcon title="배송지" pageName="C000" SVGComponent={AddressSVG} />
      </View>

      <View margin-top-20 />

      {/** 하단의 서브 메뉴를 정의합니다: */}
      <RowComponent
        isFirstItem
        title="공지사항"
        description="시야의 새소식은 공지사항에서 확인하세요."
        SVGComponent={AchievementSVG}
        pageName={'C000'}
      />
      <RowComponent
        title="게시판"
        description="시야 활동 및 렌즈에 관한 궁금증 해결해드릴게요."
        SVGComponent={DashboardSVG}
        pageName={'P048'}
      />
      <RowComponent
        title="도전 과제"
        description="베타테스터 전용 도전 과제! 달성률을 확인하세요."
        SVGComponent={AchievementSVG}
        pageName={'C000'}
      />
    </ViewContainer>
  );
};

/**
 * 가로로 길쭉한 서브 페이지 컴포넌트입니다.
 */
const RowComponent = ({
  title,
  description,
  pageName,
  SVGComponent,
  isFirstItem,
}) => (
  <View
    flex-row
    hor-pad
    ai-center
    padding-top-15
    padding-bottom-15
    border-bottom
    style={isFirstItem ? {borderTopWidth: 0.5} : {}}
    onPress={nav => nav.navigate(pageName, {key: pageName})}>
    <SVG width={50} height={50} source={SVGComponent} />
    <View flex-1-0 padding-left-10>
      <Text regular small acro6 margin-bottom-5>
        {title}
      </Text>
      <Text regular xsmall acro5 word-wrap word-wrap-line-height={16}>
        {description}
      </Text>
    </View>
    <SVG width={10} height={10} source={EnterInSVG} />
  </View>
);
RowComponent.propTypes = {
  pageName: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  SVGComponent: PropTypes.any,
  isFirstItem: PropTypes.bool,
};

/**
 * 각각의 아이콘 컴포넌트입니다.
 */
const PageIcon = ({pageName, title, SVGComponent}) => (
  <View
    ai-center
    padding-top-10
    padding-bottom-10
    style={{width: 90}}
    onPress={nav => nav.navigate(pageName, {key: pageName})}>
    <SVG width={34} height={34} source={SVGComponent} />
    <Text regular xsmall acro5>
      {title}
    </Text>
  </View>
);

PageIcon.propTypes = {
  pageName: PropTypes.string,
  title: PropTypes.string,
  SVGComponent: PropTypes.any,
};

/** 유저 정보를 가져옵니다. */
export const prepareP013 = async userState => {
  const userSN = await firestore()
    .collection('Users')
    .doc(auth().currentUser.uid)
    .get();
  const avatarSN = await firestore()
    .collection('Avatars')
    .doc(auth().currentUser.uid)
    .get();

  userState.set({
    userDocument: {...userSN.data(), id: userSN.id},
    avatarDocument: {...avatarSN.data(), id: avatarSN.id},
  });
};

export default Component;
