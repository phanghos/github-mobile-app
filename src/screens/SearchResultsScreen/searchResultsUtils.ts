import { PullRequest, PullRequestsApiResponse } from '@models/PullRequest';
import { RepositoriesApiResponse } from '@models/Repository';
import { toPullRequests } from '@services/mappers/pullRequests.mappers';
import { toRepositories } from '@services/mappers/repos';
import { Section } from './hooks/useSearch';

type SearchResponseType = {
  items: RepositoriesApiResponse | PullRequestsApiResponse;
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

const responseMappersMap = {
  Repositories: toRepositories,
  ['Pull Requests']: toPullRequests,
};

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
    return responseMappersMap.Repositories(items.slice(0, 2));
  } else if (isPr(items)) {
    return responseMappersMap['Pull Requests'](items.slice(0, 2));
  }

  return [] as PullRequest[];
};
