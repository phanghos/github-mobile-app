import React from 'react';
import { View } from 'react-native';
import { Text } from '@components/Text/Text';
import { isHexColorLight } from '@utils/utils';
import styles from './styles';

type LabelProps = {
  color: string;
  name: string;
};

export const Label = ({ color, name }: LabelProps) => (
  <View
    style={{
      ...styles.container,
      backgroundColor: `#${color}`,
    }}
  >
    <Text
      style={{
        ...styles.text,
        color: isHexColorLight(color) ? undefined : '#fff',
      }}
      fontStyle="semiBold"
    >
      {name}
    </Text>
  </View>
);
