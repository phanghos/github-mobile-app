import { useEffect, useState } from 'react';
import { ApiService } from '@services/api';
import { Repository } from '@models/Repository';
import { mapRepositoriesApiResponse } from '@services/mappers/repos';

export const useFetchRepos = (username: string, fetchOnMount = true) => {
  const [isLoading, setIsLoading] = useState(fetchOnMount);
  const [data, setData] = useState<Repository[]>([]);
  const [error, setError] = useState();

  const fetchData = () => {
    setIsLoading(true);

    ApiService.getRepos(username)
      .then(({ data }) => setData(mapRepositoriesApiResponse(data)))
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (fetchOnMount) fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { isLoading, data, error, fetchData };
};
