export async function onRequest(context) {
  const { id } = context.params;
  if (!/^\w{16,64}$/.test(id)) return Response.json({ error: "Invalid capture ID" }, { status: 400 });
  const upstream = await fetch(`https://tech-api.kluzar.com/capture/${id}/history`, { signal: AbortSignal.timeout(9000) });
  return new Response(await upstream.text(), { status: upstream.status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
}
