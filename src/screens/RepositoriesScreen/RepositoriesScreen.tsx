import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  View,
} from 'react-native';
import { useFetchRepos } from '@screens/RepositoriesScreen/hooks/useFetchRepos';
import { RepoListItem } from '@components/RepoListItem/RepoListItem';
import { Repository } from '@models/Repository';

const renderItem = ({ item }: ListRenderItemInfo<Repository>) => (
  <RepoListItem repo={item} />
);

const keyExtractor = ({ id }: Repository) => `${id}`;

const Separator = () => <View style={{ height: 24 }} />;

export const RepositoriesScreen = () => {
  const { isLoading, data: repos } = useFetchRepos('phanghos');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={repos}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={{ padding: 16 }}
          ItemSeparatorComponent={Separator}
        />
      )}
    </SafeAreaView>
  );
};
