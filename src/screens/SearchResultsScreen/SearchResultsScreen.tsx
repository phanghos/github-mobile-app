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
import { Section, useSearch } from './hooks/useSearch';
import { RepositorySearchResult } from '@components/RepositorySearchResult/RepositorySearchResult';
import { SimpleHeader } from '@components/SimpleHeader/SimpleHeader';
import { useHeaderAnimation } from '@hooks/useHeaderAnimation';
import { ListItem } from '@components/ListItem/ListItem';

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

const componentMap: Record<string, React.ReactNode> = {
  Repositories: RepositorySearchResult,
  ['Pull Requests']: ListItem,
};

export const SearchResultsScreen = () => {
  const { params } = useRoute<NavigationProp>();
  const { isLoading, data } = useSearch({
    section: params.section,
    query: 'react',
  });
  const { opacity, scrollHandler } = useHeaderAnimation();

  console.log('la data es', JSON.stringify(data));

  return (
    <View style={{ flex: 1 }}>
      <SimpleHeader title="Repositories" opacity={opacity} />
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {isLoading && !data ? (
          <ActivityIndicator style={{ flex: 1, backgroundColor: '#fff' }} />
        ) : (
          <AnimatedFlatList
            data={data as any}
            renderItem={({ item }: ListRenderItemInfo<any>) => {
              const Component = componentMap[params.section] as React.FC<any>;

              switch (params.section) {
                case 'Repositories':
                  return (
                    <Component repo={item} style={{ paddingHorizontal: 16 }} />
                  );
                case 'Pull Requests':
                  return (
                    <Component
                      username={item.user.username}
                      repo={item.title}
                      item={item}
                      style={{ paddingHorizontal: 16 }}
                    />
                  );
              }
            }}
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
