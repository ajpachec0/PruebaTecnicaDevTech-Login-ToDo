/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    const item = localStorage.getItem(key);

    const tasks = JSON.parse(item || "[]");

    if (tasks) {
      setState(tasks);
    }
  }, []);

  useEffect(() => {
    /* @ts-ignore */
    if (state.length > 0) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state]);

  return [state, setState];
};
