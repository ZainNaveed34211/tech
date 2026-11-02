export async function onRequest(context) {
  const url = new URL(context.request.url);
  const target = url.searchParams.get("target");
  const type = url.searchParams.get("type") || "A";
  if (!target) return Response.json({ error: "Target domain missing" }, { status: 400 });
  const upstream = await fetch(`https://tech-api.kluzar.com/dns?target=${encodeURIComponent(target)}&type=${encodeURIComponent(type)}`, { signal: AbortSignal.timeout(12000) });
  return new Response(await upstream.text(), { status: upstream.status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
}
