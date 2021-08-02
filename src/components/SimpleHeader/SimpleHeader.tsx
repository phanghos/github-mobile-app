import React from 'react';
import { TopBar, TopBarProps } from '@components/TopBar/TopBar';
import { HeaderTitle } from '@react-navigation/stack';

type SimpleHeaderProps = TopBarProps & {
  title: string;
};

export const SimpleHeader = ({ title, opacity }: SimpleHeaderProps) => (
  <TopBar opacity={opacity}>
    <HeaderTitle>{title}</HeaderTitle>
  </TopBar>
);
