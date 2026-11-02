export async function onRequest(context) {
  const { id } = context.params;
  if (!/^\w{16,64}$/.test(id)) return Response.json({ error: "Invalid capture ID" }, { status: 400 });
  const headers = new Headers();
  context.request.headers.forEach((value, key) => {
    if (!["host", "content-length", "connection", "transfer-encoding", "cookie", "authorization", "x-api-key"].includes(key.toLowerCase())) {
      if (key.length <= 100 && value.length <= 4096) headers.set(key, value);
    }
  });
  const upstream = await fetch(`https://tech-api.kluzar.com/capture/${id}`, {
    method: context.request.method,
    headers,
    body: ["GET", "HEAD", "OPTIONS"].includes(context.request.method) ? undefined : await context.request.arrayBuffer(),
    signal: AbortSignal.timeout(9000),
  });
  return new Response(await upstream.text(), { status: upstream.status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
}
