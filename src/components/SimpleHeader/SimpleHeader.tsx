import React from 'react';
import { TopBar, TopBarProps } from '@components/TopBar/TopBar';
import { HeaderTitle } from '@react-navigation/stack';

type SimpleHeaderProps = TopBarProps & {
  title: string;
};

export const SimpleHeader = ({ title, ...restProps }: SimpleHeaderProps) => (
  <TopBar {...restProps}>
    <HeaderTitle style={{ fontFamily: 'OpenSans-Bold', fontWeight: undefined }}>
      {title}
    </HeaderTitle>
  </TopBar>
);
