import { useCallback, useState } from "react";

type UseFetchOptions = {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
};

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const fetchData = useCallback(
    async (
      url: string,
      options?: RequestInit,
      fetchOptions?: UseFetchOptions
    ) => {
      setIsLoading(true);
      setError(undefined);

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
          const baseMessage = `HTTP error! Status: ${response.status}.`;
          const extendedMessage =
            baseMessage + (data.error ? ` ${data.error}` : "");
          throw new Error(extendedMessage);
        }
        fetchOptions?.onSuccess?.(data);
        return data;
      } catch (error: any) {
        setError(error);
        fetchOptions?.onError?.(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { isLoading, error, fetchData };
};
