import { createSignal } from "solid-js";

const map = new Map<string, unknown>();

const [cache, setCache] = createSignal<Map<string, unknown>>(map);

const get = (key: string) => {
  if (!cache().has(key)) {
    return null;
  }

  return cache().get(key);
};

const set = (key: string, data: unknown) => {
  const existingCache = cache();
  if (existingCache.has(key)) {
    existingCache.delete(key);
  }

  existingCache.set(key, data);

  setCache(existingCache);
};

const clear = () => {
  const map = new Map<string, unknown>();
  setCache(map);
};

const remove = (key: string) => {
  const existingCache = cache();
  if (existingCache.has(key)) {
    existingCache.delete(key);
  }

  setCache(existingCache);
};

export const useCache = () => ({
  get,
  set,
  clear,
  remove,
});
