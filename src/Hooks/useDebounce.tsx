import { useCallback, useRef } from "react";

function useDebounce<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
): (...args: T) => void {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: T) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedCallback;
}

export default useDebounce;
