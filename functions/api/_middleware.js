   export async function onRequest(context) {
     if (new URL(context.request.url).hostname !== "tech.kluzar.com") {
       return new Response("Not found", { status: 404 });
     }
     return context.next();
   }
