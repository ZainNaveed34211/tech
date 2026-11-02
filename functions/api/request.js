export async function onRequestPost(context) {
  const upstream = await fetch("https://tech-api.kluzar.com/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: await context.request.text(),
    signal: AbortSignal.timeout(9000),
  });
  const body = await upstream.text();
  return new Response(body, {
    status: upstream.status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}
