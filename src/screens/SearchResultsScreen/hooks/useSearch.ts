import { AxiosResponse } from 'axios';
import { searchPullRequests, searchRepos } from '@services/search';
import { RepositoriesApiResponse } from '@models/Repository';
import { useFetchResource } from '@hooks/useFetchResource';
import { mapRepositoriesApiResponse } from '@services/mappers/repos';
import { PullRequestsApiResponse } from '@models/PullRequest';
import { mapPullRequestsApiResponse } from '@services/mappers/pullRequests';

type UseSearchProps = {
  section: string;
  query: string;
};

type SearchResponseType = {
  items: RepositoriesApiResponse | PullRequestsApiResponse;
};

const sectionHandlersMap: Record<
  string,
  (query: string) => Promise<AxiosResponse<SearchResponseType>>
> = {
  Repositories: searchRepos,
  ['Pull Requests']: searchPullRequests,
};

// eslint-disable-next-line @typescript-eslint/ban-types
const responseMappersMap: Record<string, Function> = {
  Repositories: mapRepositoriesApiResponse,
  ['Pull Requests']: mapPullRequestsApiResponse,
};

export const useSearch = ({ section, query }: UseSearchProps) => {
  const getData = () => {
    sectionHandlersMap[section](query)
      .then(({ data: { items } }) =>
        setData(responseMappersMap[section](items)),
      )
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  const { isLoading, setIsLoading, data, setData, error, setError } =
    useFetchResource<SearchResponseType['items']>(getData, []);

  return { isLoading, data, error };
};
