import { trpcClient } from "@/utils/trpc";
import { globalErrorToast, globalSuccessToast } from "./toasts";

/**
 * Centralized logout function that:
 * 1. Revokes the refresh token on the server
 * 2. Clears local tokens
 * 3. Redirects to login page
 */
export async function logout() {
  try {
    try {
      // Call the logout endpoint to revoke the refresh token
      await trpcClient.auth.logout.mutate();
    } catch (error) {
      // Log error but continue with local logout
      console.error("Failed to revoke refresh token on server:", error);
    }

    // Show success message
    globalSuccessToast("Logged out successfully");

    // Redirect to login page
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout error:", error);
    globalErrorToast("Failed to log out. Please try again.");
  }
}
