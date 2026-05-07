import React from "react";

/**
 * A custom React hook that debounces a value by delaying its update.
 *
 * This hook is useful for scenarios where you want to delay the processing of a rapidly
 * changing value, such as search input, to avoid excessive re-renders or API calls.
 *
 * @template T - The type of the value to be debounced
 * @param {T} value - The value to debounce
 * @param {number} [delay=300] - The delay in milliseconds before updating the debounced value
 * @returns {T} The debounced value that updates after the specified delay
 *
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounced(searchTerm, 500);
 *
 * useEffect(() => {
 *   // This will only run 500ms after the user stops typing
 *   if (debouncedSearchTerm) {
 *     fetchSearchResults(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 * ```
 */
export default function useDebounced<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  React.useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      window.clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
