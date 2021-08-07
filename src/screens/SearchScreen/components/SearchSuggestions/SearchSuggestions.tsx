import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type SearchSuggestionsProps = {
  query: string;
  onSelect: (section: string, query: string) => void;
};

const Item = ({
  section,
  query,
  onSelect,
}: {
  section: string;
  query: string;
  onSelect: SearchSuggestionsProps['onSelect'];
}) => (
  <TouchableOpacity onPress={() => onSelect(section, query)}>
    <View style={{ margin: 8 }}>
      <Text style={{ fontSize: 16, fontWeight: '200' }}>
        {`${section} with `}
        <Text style={{ fontWeight: '700' }}>{`"${query}"`}</Text>
      </Text>
    </View>
  </TouchableOpacity>
);

const items = [
  'Repositories',
  'Issues',
  'Pull Requests',
  'People',
  'Organizations',
];

export const SearchSuggestions = ({
  query,
  onSelect,
}: SearchSuggestionsProps) => {
  return (
    <View
      style={[
        {
          backgroundColor: '#fff',
          padding: 16,
          paddingTop: 64,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      ]}
    >
      {items.map(item => (
        <Item section={item} query={query} onSelect={onSelect} />
      ))}
    </View>
  );
};
