import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export function useVisable<T = Record<string, boolean>>(v: T = {} as T) {
  const [state, setState] = useState<T>(v);

  function setStateValue(key: string[]) {
    const newState = { ...state };

    key.forEach((item: string) => {
      newState[item] = !newState[item];
    });
    setState(newState);
  }
  return [state, setStateValue] as const;
}
