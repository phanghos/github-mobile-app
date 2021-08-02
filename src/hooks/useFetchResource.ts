import { useEffect, useState } from 'react';

export const useFetchResource = <T>(
  getData: () => void,
  initialValue?: T,
  fetchOnMount = true,
) => {
  const [isLoading, setIsLoading] = useState(fetchOnMount);
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState();

  useEffect(() => {
    if (fetchOnMount) getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { isLoading, setIsLoading, data, setData, error, setError };
};