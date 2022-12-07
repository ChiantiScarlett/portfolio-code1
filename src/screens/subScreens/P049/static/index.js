/** 구독 서비스 안내: */
import subscriptionIntro_thumbnail from './subscriptionIntro/thumbnail.svg';
import subscriptionIntro__11 from './subscriptionIntro/11.svg';
import subscriptionIntro__21 from './subscriptionIntro/21.svg';
import subscriptionIntro__31 from './subscriptionIntro/31.svg';

/** 교환 규정: */
import refundPolicy_thumbnail from './refundPolicy/thumbnail.svg';
import refundPolicy__11 from './refundPolicy/11.svg';

/** FAQ (자주 묻는 질문): */
import FAQ_thumbnail from './FAQ/thumbnail.svg';
import FAQ__11 from './FAQ/11.svg';
import FAQ__21 from './FAQ/21.svg';
import FAQ__31 from './FAQ/31.svg';
import FAQ__41 from './FAQ/41.svg';

/** 렌즈 관리 및 착용법: */
import lens__thumbnail from './lens/thumbnail.svg';
import lens__11 from './lens/11.svg';
import lens__12 from './lens/12.svg';
import lens__21 from './lens/21.svg';
import lens__31 from './lens/31.svg';

export const DASHBOARD_KEY = {
  FAQ: 'FAQ',
  SUBSCRIPTION_INTRO: 'SUBSCRIPTION_INTRO',
  REFUND_POLICY: 'REFUND_POLICY',
  CHARACTER: 'CHARACTER',
  LENS: 'LENS',
};

export const STATIC_DATA = {
  [DASHBOARD_KEY.SUBSCRIPTION_INTRO]: {
    title: '구독 서비스 안내',
    thumbnailSVG: subscriptionIntro_thumbnail,
    description: [
      '시야는 모바일 어플 전용',
      '콘택트 렌즈 구독 서비스를 제공합니다.',
      '이제 집에서 편하게 렌즈를 받아보세요!',
    ].join('\n'),
    submenu: [
      {
        title: '구독 서비스에 대해',
        SVGList: [{image: subscriptionIntro__11, aspectRatio: 280 / 1008}],
      },
      {
        title: '나의 구독 간편 기능',
        SVGList: [{image: subscriptionIntro__21, aspectRatio: 280 / 998}],
      },
      {
        title: '구독 교환 규정',
        SVGList: [{image: subscriptionIntro__31, aspectRatio: 281 / 699}],
      },
    ],
  },

  [DASHBOARD_KEY.FAQ]: {
    title: 'FAQ',
    thumbnailSVG: FAQ_thumbnail,
    description: [
      '고객님들께서 자주하시는 질문을 모았어요.',
      '문의 전에 궁금했던 질문이 있는지 확인해보세요.',
      '기타 문의사항은 1:1문의를 이용해주세요.',
    ].join('\n'),
    submenu: [
      {
        title: '시야 활동 관련',
        SVGList: [{image: FAQ__11, aspectRatio: 280 / 607}],
      },
      {
        title: '구독 관련',
        SVGList: [{image: FAQ__21, aspectRatio: 280 / 1217}],
      },
      {
        title: '교환 관련',
        SVGList: [{image: FAQ__31, aspectRatio: 280 / 793}],
      },
      {
        title: '배송 관련',
        SVGList: [{image: FAQ__41, aspectRatio: 280 / 586}],
      },
    ],
  },
  [DASHBOARD_KEY.LENS]: {
    title: '렌즈 관리 및 착용법',
    thumbnailSVG: lens__thumbnail,
    description: [
      '렌즈는 올바른 방법으로 관리하고 착용하는',
      '습관을 길러야 안전하게 사용할 수 있어요.',
      '꼭 숙지하시고 아름다운 눈을 지켜주세요!',
    ].join('\n'),
    submenu: [
      {
        title: '콘택트 렌즈 착용과 제거',
        SVGList: [
          {image: lens__11, aspectRatio: 280 / 1440},
          {image: lens__12, aspectRatio: 280 / 1046},
        ],
      },
      {
        title: '콘택트 렌즈 세척법',
        SVGList: [{image: lens__21, aspectRatio: 280 / 2032}],
      },
      {
        title: '콘택트 렌즈 주의사항',
        SVGList: [{image: lens__31, aspectRatio: 280 / 501}],
      },
    ],
  },
  [DASHBOARD_KEY.REFUND_POLICY]: {
    title: '교환 규정',
    thumbnailSVG: refundPolicy_thumbnail,
    description: [
      '시야 구독 상품은 자체 할인 상품으로',
      '결제된 이후에 환불이 불가합니다.',
      '교환 신청서를 작성하실 때는 교환 규정을',
      '잘 읽어보시고 형식에 알맞게 작성해주세요.',
    ].join('\n'),
    submenu: [
      {
        title: '구독 교환 규정',
        SVGList: [{image: refundPolicy__11, aspectRatio: 282 / 699}],
      },
    ],
  },
};
