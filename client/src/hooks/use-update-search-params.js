import { useCallback } from "react";
import { useSearchParams } from "react-router";

export function useUpdateSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = useCallback(
    (params) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value) {
          newSearchParams.set(key, String(value));
        } else {
          newSearchParams.delete(key);
        }
      }

      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams],
  );

  return { searchParams, updateSearchParams };
}
