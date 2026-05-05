import { auth } from "@/utils/auth";
import { trpcClient } from "@/utils/trpc";
import { globalErrorToast, globalSuccessToast } from "./toasts";

export async function logout() {
  try {
    try {
      // Server revokes the refresh token and clears HttpOnly cookies via Set-Cookie
      await trpcClient.auth.logout.mutate();
    } catch (error) {
      console.error("Failed to revoke refresh token on server:", error);
    }

    // Clear the non-HttpOnly indicator immediately
    auth.clearIndicator();

    globalSuccessToast("Logged out successfully");
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout error:", error);
    globalErrorToast("Failed to log out. Please try again.");
  }
}
