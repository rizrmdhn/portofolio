import { createTRPCContext } from "@portofolio/api";
import { createCaller } from "@portofolio/api/root";
import { getRequest } from "@tanstack/react-start/server";

export async function createServerCaller() {
  const request = getRequest()!;
  const ctx = await createTRPCContext(request);
  return createCaller(ctx);
}
