export async function onRequest(context) {
  const target = new URL(context.request.url).searchParams.get("target");
  if (!target) return Response.json({ error: "Target URL missing" }, { status: 400 });
  const upstream = await fetch(`https://tech-api.kluzar.com/seo-check?target=${encodeURIComponent(target)}`, {
    headers: { "X-Kluzar-Api-Key": context.env.API_SHARED_SECRET },
    signal: AbortSignal.timeout(12000),
  });
  return new Response(await upstream.text(), { status: upstream.status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
}
