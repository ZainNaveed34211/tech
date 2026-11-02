export async function onRequest(context) {
  const upstream = await fetch("https://tech-api.kluzar.com/health", { signal: AbortSignal.timeout(5000) });
  const body = await upstream.text();
  return new Response(body, { status: upstream.status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
}
