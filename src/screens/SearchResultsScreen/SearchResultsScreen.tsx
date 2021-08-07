import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SEARCH_RESULTS_SCREEN } from 'consts/navigationConsts';
import { Repository } from '@models/Repository';
import { useSearch } from './hooks/useSearch';
import { RepositorySearchResult } from '@components/RepositorySearchResult/RepositorySearchResult';
import { SimpleHeader } from '@components/SimpleHeader/SimpleHeader';
import { useHeaderAnimation } from '@hooks/useHeaderAnimation';
import Animated from 'react-native-reanimated';

type ScreenProp = RouteProp<
  {
    [SEARCH_RESULTS_SCREEN]: {
      section: string;
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
  const { params } = useRoute<ScreenProp>();
  const { isLoading, data } = useSearch({
    section: 'Repositories',
    query: 'react',
  }); // useSearch({ ...params });
  const { opacity, scrollHandler } = useHeaderAnimation();

  return (
    <View style={{ flex: 1 }}>
      <SimpleHeader title="Repositories" opacity={opacity} />
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {isLoading ? (
          <ActivityIndicator style={{ flex: 1, backgroundColor: '#fff' }} />
        ) : (
          <AnimatedFlatList
            data={data}
            renderItem={({ item }: ListRenderItemInfo<Repository>) => (
              <RepositorySearchResult
                repo={item}
                style={{ paddingHorizontal: 16 }}
              />
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
