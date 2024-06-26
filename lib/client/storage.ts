export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window !== "undefined") {
      const value = window.localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
    }
    return null;
  },
  set: (key: string, value: any) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, value);
    }
  },
};
