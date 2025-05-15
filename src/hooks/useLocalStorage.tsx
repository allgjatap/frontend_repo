import { StorageKey, storage } from '@/utils/storage';
import { useEffect, useState } from 'react';

type UseStorageReturnType<T extends StorageKey[]> = {
  [K in T[number]]: string;
};

export const useLocalStorage = <T extends StorageKey[]>(
  keys: T
): UseStorageReturnType<T> => {
  const getStorageValues = (values = {}) => {
    const newStorage: any = { ...values };

    for (const key of keys) {
      const value = storage.getItem(key);

      newStorage[key] = value;
    }

    return newStorage;
  };

  const [storageValues, setStorageValues] = useState<any>(getStorageValues());

  useEffect(() => {
    const listener = () => {
      const newStorage = getStorageValues(storageValues);
      setStorageValues(newStorage);
    };

    window.addEventListener('local-storage', listener, false);

    return () => window.removeEventListener('local-storage', listener);
  }, []);

  return storageValues;
};
