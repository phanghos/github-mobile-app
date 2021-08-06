import { isHexColorLight } from '@utils/utils';
import React from 'react';
import { Text, View } from 'react-native';
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
    >
      {name}
    </Text>
  </View>
);
