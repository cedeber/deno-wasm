import { MiddlewareHandlerContext } from "$fresh/server.ts";

interface State {
  data: string;
}

export async function handler(
  _req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  ctx.state.data = "myData";
  const resp = await ctx.next();
  resp.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  resp.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  return resp;
}
