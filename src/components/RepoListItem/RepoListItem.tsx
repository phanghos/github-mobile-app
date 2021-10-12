import React from 'react';
import { Image, Text, View } from 'react-native';
import { Repository } from '@models/Repository';
import styles from './styles';

type RepoListItemProps = {
  repo: Repository;
};

export const RepoListItem = ({
  repo: {
    owner: { ownerName, avatarUrl },
    name,
  },
}: RepoListItemProps) => (
  <View style={styles.container}>
    <Image source={{ uri: avatarUrl }} style={styles.avatar} />
    <View>
      <Text style={styles.owner}>{ownerName}</Text>
      <Text style={styles.repoName}>{name}</Text>
    </View>
  </View>
);
