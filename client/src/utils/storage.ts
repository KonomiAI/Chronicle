/**
 * Abstract the js local storage api. This is done in case we deploy this
 * app on other platforms we will be able to ensure local storage like capabilities
 * are still functional.
 *
 * @returns An abstracted version of the local storage api
 */
export const useLocalStorage = () => {
  if (window.localStorage) {
    const hasItem = (key: string) => window.localStorage.getItem(key) !== null;
    const getSafely = (key: string) => {
      const temp = window.localStorage.getItem(key);
      if (!temp) {
        throw Error(`Item with key ${key} is not set in local storage`);
      }
      return temp;
    };
    return {
      get: (key: string) => window.localStorage.getItem(key),
      getSafely,
      set: (key: string, value: string) =>
        window.localStorage.setItem(key, value),
      clear: () => window.localStorage.clear(),
      remove: (key: string) => window.localStorage.removeItem(key),
      size: window.localStorage.length,
      has: hasItem,
    };
  }

  throw Error('Your device does not support local storage.');
};
