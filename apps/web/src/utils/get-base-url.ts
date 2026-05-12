export const getBaseUrl = (): string => {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.APP_URL) return process.env.APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3001";
};
