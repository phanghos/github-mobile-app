import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

type FontStyle = 'light' | 'regular' | 'semiBold' | 'bold';

type CustomTextProps = TextProps & {
  fontStyle?: FontStyle;
  children: React.ReactNode;
};

const fontWeightMap: Record<Exclude<FontStyle, undefined>, string> = {
  light: 'OpenSans-Light',
  regular: 'OpenSans-Regular',
  semiBold: 'OpenSans-SemiBold',
  bold: 'OpenSans-Bold',
};

export const Text = ({
  fontStyle = 'regular',
  children,
  ...textProps
}: CustomTextProps) => (
  <RNText
    {...textProps}
    style={[textProps.style, { fontFamily: fontWeightMap[fontStyle] }]}
  >
    {children}
  </RNText>
);
