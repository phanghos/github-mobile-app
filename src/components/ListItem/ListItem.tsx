import React from 'react';
import { ScrollView, Text, View } from 'react-native';

type Item = {
  number: number;
  title: string;
  labels: Array<{ id: number; name: string; color: string }>;
};

type ListItemProps = {
  username: string;
  repo: string;
  item: Item;
};

export const ListItem = ({
  username,
  repo,
  item: { number, title, labels },
}: ListItemProps) => (
  <View>
    <Text
      style={{ fontWeight: '200', marginBottom: 4 }}
    >{`${username} / ${repo} #${number}`}</Text>
    <Text style={{ fontWeight: '600' }}>{title}</Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ marginTop: 8 }}
    >
      {labels.map(({ id, color, name }) => (
        <View
          key={`${id}`}
          style={{
            backgroundColor: `#${color}`,
            borderRadius: 24,
            marginRight: 4,
            paddingHorizontal: 6,
            paddingVertical: 2,
          }}
        >
          <Text style={{ fontWeight: '600' }}>{name}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);
