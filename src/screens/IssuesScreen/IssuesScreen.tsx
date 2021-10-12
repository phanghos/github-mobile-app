import { ListItem } from '@components/ListItem/ListItem';
import { SimpleHeader } from '@components/SimpleHeader/SimpleHeader';
import { useHeaderAnimation } from '@hooks/useHeaderAnimation';
import { Issue } from '@models/Issue';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useFetchIssues } from './hooks/useFetchIssues';

const keyExtractor = ({ number }: Issue) => `${number}`;

const Separator = () => <View style={{ height: 24 }} />;

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<Issue>>(FlatList);

export const IssuesScreen = () => {
  const { isLoading, data } = useFetchIssues('wix', 'react-native-navigation');
  const { opacity, scrollHandler } = useHeaderAnimation();

  const renderItem = ({ item }: ListRenderItemInfo<Issue>) => (
    <ListItem username="wix" repo="react-native-navigation" item={item} />
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SimpleHeader title="Issues" opacity={opacity} />
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
