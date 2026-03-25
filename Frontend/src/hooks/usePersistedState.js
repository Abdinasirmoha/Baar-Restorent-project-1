import { useEffect, useState } from "react";

export default function usePersistedState(storageKey, initialValue) {
  const [value, setValue] = useState(() => {
    const hasWindow = typeof window !== "undefined";
    if (!hasWindow) {
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }

    const storedValue = window.localStorage.getItem(storageKey);
    if (storedValue === null) {
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }

    try {
      return JSON.parse(storedValue);
    } catch {
      return storedValue;
    }
  });

  useEffect(() => {
    const hasWindow = typeof window !== "undefined";
    if (!hasWindow) {
      return;
    }

    const nextValue = typeof value === "string" ? value : JSON.stringify(value);
    window.localStorage.setItem(storageKey, nextValue);
  }, [storageKey, value]);

  return [value, setValue];
}
