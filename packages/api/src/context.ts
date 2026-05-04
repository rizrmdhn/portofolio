export async function createContext({ req }: { req: Request }) {
  return {
    auth: null,
    session: null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
