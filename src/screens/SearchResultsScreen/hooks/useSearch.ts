import { AxiosResponse } from 'axios';
import { searchPullRequests, searchRepos } from '@services/search';
import { RepositoriesApiResponse } from '@models/Repository';
import { useFetchResource } from '@hooks/useFetchResource';
import { toRepositories } from '@services/mappers/repos';
import { PullRequestsApiResponse } from '@models/PullRequest';
import { toPullRequests } from '@services/mappers/pullRequests';

export type Section = 'Repositories' | 'Pull Requests';

type UseSearchProps = {
  section: Section;
  query: string;
};

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

const sectionHandlersMap: Record<
  Section,
  (query: string) => Promise<AxiosResponse<SearchResponseType>>
> = {
  Repositories: searchRepos,
  ['Pull Requests']: searchPullRequests,
};

const responseMappersMap = {
  Repositories: toRepositories,
  ['Pull Requests']: toPullRequests,
};

export const useSearch = ({ section, query }: UseSearchProps) => {
  const getData = () => {
    sectionHandlersMap[section](query)
      .then(({ data: { items } }) => {
        if (items.length) {
          return;
        }
        if (isRepository(items)) {
          setData(responseMappersMap.Repositories(items));
        } else if (isPr(items)) {
          setData(responseMappersMap['Pull Requests'](items));
        }
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  const { isLoading, setIsLoading, data, setData, error, setError } =
    useFetchResource<
      ReturnType<typeof toRepositories> | ReturnType<typeof toPullRequests>
    >(getData, []);

  return { isLoading, data, error };
};
