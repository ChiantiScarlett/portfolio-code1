import React from 'react';
import ViewContainer from '@components/viewContainer';

import UnderConstruction from '@components/underConstruction';
import GoBackHeader from '@components/goBackHeader';

const Component = () => {
  return (
    <ViewContainer
      HeaderComponent={() => <GoBackHeader pageName="P001" title="" />}>
      <UnderConstruction text="이 페이지는 아직 준비중이에요." />
    </ViewContainer>
  );
};

const options = {
  headerShown: false,
};

export default {Component, options};
