export const getBaseUrl = (): string => {
  if (typeof window !== "undefined") return window.location.origin;
  return "http://localhost:3001";
};
