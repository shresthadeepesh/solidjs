import { batch, createSignal, onMount } from "solid-js";
import { useCache } from "../stores/apiCache";
import { Api } from "../api";
import { appConfig } from "../config/config";

type useQueryProps = {
  apiKey: Api;
};

const useQuery = <T>({ apiKey }: useQueryProps) => {
  const [isLoading, setIsLoading] = createSignal<boolean>(false);
  const [isFetching, setIsFetching] = createSignal<boolean>(false);
  const [isError, setIsError] = createSignal<boolean>(false);
  const [error, setError] = createSignal<unknown>();
  const [data, setData] = createSignal<T>();
  const { set, get } = useCache();

  const fetchData = async (checkCache: boolean = true) => {
    if (!checkCache || !get(apiKey)) {
      batch(async () => {
        setIsLoading(true);
        setIsFetching(true);
        setData(undefined);
        setError(undefined);
        setIsError(false);

        await fetch(`${appConfig.baseUrl}${apiKey}`)
          .then((res) => res.json())
          .then((res) => {
            setData(res);

            //set to the cache
            set(apiKey, res);
          })
          .catch((err) => {
            setIsError(true);
            setError(err);
          })
          .finally(() => {
            setTimeout(() => {
              setIsLoading(false);
              setIsFetching(false);
            }, 5000);
          });
      });
    }
  };

  const refetch = async () => {
    await fetchData(false);
  };

  onMount(async () => {
    await fetchData();
  });

  return {
    isLoading,
    isFetching,
    isError,
    error,
    data,
    refetch,
  };
};

export default useQuery;
