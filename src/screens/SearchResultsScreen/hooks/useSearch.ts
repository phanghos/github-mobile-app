import { AxiosResponse } from 'axios';
import { searchRepos } from '@services/search';
import { RepositoriesApiResponse, Repository } from '@models/Repository';
import { useFetchResource } from '@hooks/useFetchResource';
import { mapRepositoriesApiResponse } from '@services/mappers/repos';

type UseSearchProps = {
  section: string;
  query: string;
};

const sectionHandlersMap: Record<
  string,
  (query: string) => Promise<AxiosResponse<{ items: RepositoriesApiResponse }>>
> = {
  Repositories: searchRepos,
};

export const useSearch = ({ section, query }: UseSearchProps) => {
  const getData = () => {
    sectionHandlersMap[section](query)
      .then(({ data: { items } }) => setData(mapRepositoriesApiResponse(items)))
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  const { isLoading, setIsLoading, data, setData, error, setError } =
    useFetchResource<Repository[]>(getData, []);

  return { isLoading, data, error };
};
