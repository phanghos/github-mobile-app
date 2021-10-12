import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { ListItem } from '@components/ListItem/ListItem';
import { PullRequest } from '@models/PullRequest';
import { useFetchPullRequests } from './hooks/useFetchPullRequests';
import { useHeaderAnimation } from '@hooks/useHeaderAnimation';
import { SimpleHeader } from '@components/SimpleHeader/SimpleHeader';

const keyExtractor = ({ id }: PullRequest) => `${id}`;

const Separator = () => <View style={{ height: 24 }} />;

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<PullRequest>>(FlatList);

export const PullRequestsScreen = () => {
  const { isLoading, data } = useFetchPullRequests(
    'wix',
    'react-native-navigation',
  );
  const { opacity, scrollHandler } = useHeaderAnimation();

  const renderItem = ({ item }: ListRenderItemInfo<PullRequest>) => (
    <ListItem username="wix" repo="react-native-navigation" item={item} />
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SimpleHeader title="Pull Requests" opacity={opacity} />
      {isLoading && !data ? (
        <ActivityIndicator style={{ flex: 1 }} />
      ) : (
        <AnimatedFlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={Separator}
          contentContainerStyle={{ padding: 16, paddingTop: 48 }}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
