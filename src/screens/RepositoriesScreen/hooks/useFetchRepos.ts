import { useFetchResource } from '@hooks/useFetchResource';
import { ApiService } from '@services/api';
import { Repository } from '@models/Repository';
import { mapRepositoriesApiResponse } from '@services/mappers/repos';

export const useFetchRepos = (username: string) => {
  const getData = () => {
    setIsLoading(true);

    ApiService.getRepos(username)
      .then(({ data }) => setData(mapRepositoriesApiResponse(data)))
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  const { isLoading, setIsLoading, data, setData, error, setError } =
    useFetchResource<Repository[]>(getData, []);

  return { isLoading, data: data as Repository[], error, fetchData: getData };
};
