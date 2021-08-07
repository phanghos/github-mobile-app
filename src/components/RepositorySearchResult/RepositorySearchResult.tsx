import { Repository } from '@models/Repository';
import React from 'react';
import { Image, Text, View, ViewProps } from 'react-native';

type RepositorySearchResultProps = {
  repo: Pick<Repository, 'owner' | 'name' | 'description'>;
} & Pick<ViewProps, 'style'>;

export const RepositorySearchResult = ({
  repo: {
    owner: { ownerName, avatarUrl },
    name,
    description,
  },
  style,
}: RepositorySearchResultProps) => {
  return (
    <View style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: avatarUrl }}
          style={{ width: 15, height: 15, borderRadius: 10, marginRight: 8 }}
        />
        <Text style={{ fontWeight: '200' }}>{ownerName}</Text>
      </View>
      <Text style={{ fontWeight: '600', marginVertical: 8 }}>{name}</Text>
      <Text>{description}</Text>
    </View>
  );
};
