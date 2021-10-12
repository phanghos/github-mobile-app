import React from 'react';
import { ListItem, ListItemProps } from '@components/ListItem/ListItem';
import {
  RepositorySearchResult,
  RepositorySearchResultProps,
} from '@components/RepositorySearchResult/RepositorySearchResult';
import { PullRequest, PullRequestsApiResponse } from '@models/PullRequest';
import { RepositoriesApiResponse, Repository } from '@models/Repository';
import { toPullRequests } from '@services/mappers/pullRequests.mappers';
import { toRepositories } from '@services/mappers/repos';
import { Section } from './hooks/useSearch';

type SearchResponseType = {
  items: RepositoriesApiResponse | PullRequestsApiResponse;
};

const responseMappersMap = {
  Repositories: toRepositories,
  ['Pull Requests']: toPullRequests,
};

function isRepository(
  response: SearchResponseType['items'],
): response is RepositoriesApiResponse {
  return 'forks' in response[0];
}

function isPr(
  response: SearchResponseType['items'],
): response is PullRequestsApiResponse {
  return 'assignee' in response[0];
}

export function isRepositoryComponent(
  component: React.FC<RepositorySearchResultProps> | React.FC<ListItemProps>,
): component is React.FC<RepositorySearchResultProps> {
  return (
    (component as React.FC<ListItemProps>).name === 'RepositorySearchResult'
  );
}

export function isRepositoryModel(
  item: Repository | PullRequest,
): item is Repository {
  return (item as Repository).full_name !== undefined;
}

export function isPullRequestComponent(
  component: React.FC<RepositorySearchResultProps> | React.FC<ListItemProps>,
): component is React.FC<ListItemProps> {
  return (component as React.FC<ListItemProps>).name === 'ListItem';
}

export function isPullRequestModel(
  item: Repository | PullRequest,
): item is PullRequest {
  return (item as PullRequest).number !== undefined;
}

export const sectionHandlersMap: Record<Section, (query: string) => string> = {
  Repositories: (query: string) => `search/repositories?q=${query}`,
  ['Pull Requests']: (query: string) =>
    `search/issues?q=${query}+is:pull-request`,
};

export const mapSearchResultsResponse = ({ items }: SearchResponseType) => {
  if (!items.length) {
    return [] as PullRequest[];
  }

  if (isRepository(items)) {
    return responseMappersMap.Repositories(items);
  } else if (isPr(items)) {
    return responseMappersMap['Pull Requests'](items);
  }

  return [] as PullRequest[];
};

export const componentMap: Record<
  string,
  React.FC<RepositorySearchResultProps> | React.FC<ListItemProps> // previously React.ReactNode
> = {
  Repositories: RepositorySearchResult,
  ['Pull Requests']: ListItem,
};
