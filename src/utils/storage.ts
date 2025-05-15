export enum StorageKey {
  ACCESS_TOKEN = 'accessToken',
}

type StorageValues = `${StorageKey}`;

export const storage = {
  getItem: (key: StorageKey | StorageValues) => {
    return localStorage.getItem(key);
  },
  setItem: (key: StorageKey | StorageValues, token: string) => {
    localStorage.setItem(key, token);
    window.dispatchEvent(new Event('local-storage'));
  },
  removeItem: (key: StorageKey | StorageValues) => {
    localStorage.removeItem(key);
    window.dispatchEvent(new Event('local-storage'));
  },
};
