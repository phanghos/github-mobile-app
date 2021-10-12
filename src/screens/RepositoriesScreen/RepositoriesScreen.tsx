import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useFetchRepos } from '@screens/RepositoriesScreen/hooks/useFetchRepos';
import { RepoListItem } from '@components/RepoListItem/RepoListItem';
import { Repository } from '@models/Repository';
import { SimpleHeader } from '@components/SimpleHeader/SimpleHeader';
import { useHeaderAnimation } from '@hooks/useHeaderAnimation';

const renderItem = ({ item }: ListRenderItemInfo<Repository>) => (
  <RepoListItem repo={item} />
);

const keyExtractor = ({ id }: Repository) => `${id}`;

const Separator = () => <View style={{ height: 24 }} />;

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<Repository>>(FlatList);

export const RepositoriesScreen = () => {
  const { isLoading, data } = useFetchRepos('phanghos');
  const { opacity, scrollHandler } = useHeaderAnimation();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SimpleHeader title="Repositories" opacity={opacity} />
      {isLoading && !data ? (
        <ActivityIndicator style={{ flex: 1 }} />
      ) : (
        <AnimatedFlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={{ padding: 16, paddingTop: 48 }}
          ItemSeparatorComponent={Separator}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
