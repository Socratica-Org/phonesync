interface WSData {
  email: string;
}

const GLOBAL_TOPIC = "global";

const server = Bun.serve<WSData>({
  port: 8080,
  async fetch(req, server) {
    const url = new URL(req.url);
    // Basic router
    switch (url.pathname) {
      case "/":
        return new Response("Hello world");
      case "/ws":
        // Upgrade to a WebSocket connection
        const email = url.searchParams.get("email");
        if (!email) {
          return new Response("Email parameter required", { status: 400 });
        }
        server.upgrade(req, {
          data: { email },
        });
        return new Response("This is the ws endpoint.");
      case "/broadcast":
        if (req.method !== "POST") {
          return new Response("Method not allowed", { status: 405 });
        }
        const body = (await req.json()) as { send: string };
        if (!body.send || typeof body.send !== "string") {
          return new Response("Invalid body format", { status: 400 });
        }
        server.publish(GLOBAL_TOPIC, body.send);
        return new Response(JSON.stringify({ success: true }));
      default:
        return new Response("Not found", { status: 404 });
    }
  },
  websocket: {
    open(ws) {
      const msg = `${ws.data.email} has entered the chat`;
      ws.subscribe(GLOBAL_TOPIC);
      server.publish(GLOBAL_TOPIC, msg);
    },
    message(ws, message) {
      // the server re-broadcasts incoming messages to everyone
      server.publish(GLOBAL_TOPIC, `${ws.data.email}: ${message}`);
    },
    close(ws) {
      const msg = `${ws.data.email} has left the chat`;
      server.publish(GLOBAL_TOPIC, msg);
      ws.unsubscribe(GLOBAL_TOPIC);
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
