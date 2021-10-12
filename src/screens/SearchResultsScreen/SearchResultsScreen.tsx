/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { SEARCH_RESULTS_SCREEN } from 'consts/navigationConsts';
import { Repository } from '@models/Repository';
import { PullRequest } from '@models/PullRequest';
import { SimpleHeader } from '@components/SimpleHeader/SimpleHeader';
import { useHeaderAnimation } from '@hooks/useHeaderAnimation';
import { Section, useSearch } from './hooks/useSearch';
import { SearchResult } from './SearchResult/SearchResult';

type NavigationProp = RouteProp<
  {
    [SEARCH_RESULTS_SCREEN]: {
      section: Section;
      query: string;
    };
  },
  typeof SEARCH_RESULTS_SCREEN
>;

const keyExtractor = ({ id }: Repository) => `${id}`;

const Separator = () => (
  <View
    style={{
      width: '100%',
      height: 1,
      backgroundColor: '#E8E8E8',
      marginVertical: 16,
    }}
  />
);

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<Repository>>(FlatList);

export const SearchResultsScreen = () => {
  const { params } = useRoute<NavigationProp>();
  const { isLoading, data } = useSearch({
    section: params.section,
    query: 'react',
  });
  const { opacity, scrollHandler } = useHeaderAnimation();

  return (
    <View style={{ flex: 1 }}>
      <SimpleHeader title={params.section} opacity={opacity} />
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {isLoading && !data ? (
          <ActivityIndicator style={{ flex: 1, backgroundColor: '#fff' }} />
        ) : (
          <AnimatedFlatList
            data={data as any}
            renderItem={({
              item,
            }: ListRenderItemInfo<Repository | PullRequest>) => (
              <SearchResult item={item} section={params.section} />
            )}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={Separator}
            contentContainerStyle={{ paddingTop: 64 }}
            onScroll={scrollHandler}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
          />
        )}
      </View>
    </View>
  );
};
