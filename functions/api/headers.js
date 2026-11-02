export async function onRequest(context) {
  const target = context.request.url ? new URL(context.request.url).searchParams.get("target") : null;
  if (!target) return Response.json({ error: "Target URL missing" }, { status: 400 });
  const upstream = await fetch(`https://tech-api.kluzar.com/?target=${encodeURIComponent(target)}`, {
    headers: { Accept: "application/json", "X-Kluzar-Api-Key": context.env.API_SHARED_SECRET },
    signal: AbortSignal.timeout(9000),
  });
  const body = await upstream.text();
  return new Response(body, {
    status: upstream.status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}
