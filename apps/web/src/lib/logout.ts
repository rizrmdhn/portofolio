import { authClient } from "./auth-client";
import { globalErrorToast, globalSuccessToast } from "./toasts";

export async function logout() {
  const { error } = await authClient.signOut();

  if (error) {
    globalErrorToast("Failed to log out. Please try again.");
    return;
  }

  globalSuccessToast("Logged out successfully");
  window.location.href = "/login";
}
