import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Custom hook to update query strings.
 */
export const useUpdateQueryString = () => {
  const searchParams = useSearchParams();

  /**
   * Update the query string with the provided key and value.
   *
   * @param name - The query parameter name.
   * @param value - The query parameter value.
   * @returns The updated query string.
   */
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return { createQueryString };
};
