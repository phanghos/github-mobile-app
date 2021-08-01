import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { PullRequest } from '@models/PullRequest';

type PullRequestListItemProps = {
  username: string;
  repo: string;
  pullRequest: PullRequest;
};

export const PullRequestListItem = ({
  username,
  repo,
  pullRequest: { number, title, labels },
}: PullRequestListItemProps) => (
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
      {labels.map(({ color, name }) => (
        <View
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
