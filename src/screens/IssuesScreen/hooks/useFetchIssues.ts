import { useFetchResource } from '@hooks/useFetchResource';
import { ApiService } from '@services/api';
import { Issue } from '@models/Issue';

export const useFetchIssues = (username: string, repo: string) => {
  const getData = () => {
    setIsLoading(true);

    ApiService.getIssues(username, repo)
      .then(({ data }) => setData(data))
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  const { isLoading, setIsLoading, data, setData, error, setError } =
    useFetchResource<Issue[]>(getData, []);

  return { isLoading, data, error };
};
