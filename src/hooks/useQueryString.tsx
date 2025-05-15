import { useSearchParams } from 'react-router-dom';

export const useQueryString = <T extends { [key: string]: unknown }>(
  defaultValues: T
): [T, (v: Partial<T>) => void] => {
  const [search, setSearchParams] = useSearchParams();

  const getSearchObject = () => {
    const query: any = Object.fromEntries(search.entries());

    for (const [key, value] of Object.entries(defaultValues)) {
      if (!query[key]) {
        query[key] = value;
      } else {
        query[key] = convertToTypeOf(typeof value, query[key]);
      }
    }

    return query;
  };

  const convertToTypeOf = (typedVar: any, input: any) => {
    if (typedVar === 'number') {
      return Number(input);
    } else {
      return String(input);
    }
  };

  const onSearchParams = (newValues: Partial<T>) => {
    const obj = getSearchObject();

    setSearchParams({ ...obj, ...newValues });
  };

  return [getSearchObject(), onSearchParams];
};
