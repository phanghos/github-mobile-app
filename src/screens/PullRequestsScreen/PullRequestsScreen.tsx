import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  View,
} from 'react-native';
import { PullRequestListItem } from '@components/PullRequestListItem/PullRequestListItem';
import { PullRequest } from '@models/PullRequest';
import { useFetchPullRequests } from './hooks/useFetchPullRequests';

const renderItem = ({ item }: ListRenderItemInfo<PullRequest>) => (
  <PullRequestListItem
    username="wix"
    repo="react-native-navigation"
    pullRequest={item}
  />
);

const keyExtractor = ({ id }: PullRequest) => `${id}`;

const Separator = () => <View style={{ height: 24 }} />;

export const PullRequestsScreen = () => {
  const { isLoading, data } = useFetchPullRequests(
    'wix',
    'react-native-navigation',
  );

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={Separator}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
};
