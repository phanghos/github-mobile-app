import React from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { Text } from '@components/Text/Text';

type PlaceHolderProps = {
  title: string;
  subtitle: string;
  style?: StyleProp<ViewStyle>;
  titleStye?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
};

export const PlaceHolder = ({ title, subtitle, style }: PlaceHolderProps) => {
  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
        },
        style,
      ]}
    >
      <Text
        style={{
          fontSize: 24,
          textAlign: 'center',
          marginBottom: 16,
        }}
        fontStyle="bold"
      >
        {title}
      </Text>
      <Text style={{ textAlign: 'center' }}>{subtitle}</Text>
    </View>
  );
};
