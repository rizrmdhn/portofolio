/**
 * Authentication utility functions
 */

export const auth = {
  /**
   * Get the access token from localStorage
   */
  getAccessToken: (): string | null => {
    return localStorage.getItem("accessToken");
  },

  /**
   * Get the refresh token from localStorage
   */
  getRefreshToken: (): string | null => {
    return localStorage.getItem("refreshToken");
  },

  /**
   * Set both access and refresh tokens
   */
  setTokens: (accessToken: string, refreshToken: string): void => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  },

  /**
   * Clear all auth tokens (logout)
   */
  clearTokens: (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  /**
   * Check if user is authenticated (has tokens)
   */
  isAuthenticated: (): boolean => {
    return !!(auth.getAccessToken() && auth.getRefreshToken());
  },
};
