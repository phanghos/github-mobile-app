import React from 'react';
import { ScrollView, View, ViewProps } from 'react-native';
import { Text } from '@components/Text/Text';
import { Label } from '@components/Label/Label';

type Item = {
  number: number;
  title: string;
  labels: Array<{ id: number; name: string; color: string }>;
};

type ListItemProps = {
  username: string;
  repo: string;
  item: Item;
} & Pick<ViewProps, 'style'>;

export const ListItem = ({
  username,
  repo,
  item: { number, title, labels },
  style,
}: ListItemProps) => (
  <View style={style}>
    <Text
      style={{ marginBottom: 4 }}
      fontStyle="light"
    >{`${username} / ${repo} #${number}`}</Text>
    <Text fontStyle="semiBold">{title}</Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ marginTop: 8 }}
    >
      {labels.map(({ id, ...labelProps }) => (
        <Label key={`${id}`} {...labelProps} />
      ))}
    </ScrollView>
  </View>
);
